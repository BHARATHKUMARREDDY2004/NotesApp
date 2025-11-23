import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Alert } from "react-native";

import { useAuth } from "@/context/AuthContext";
import {
  getNotesForUser,
  persistImage,
  removeImage,
  saveNotesForUser,
} from "@/utils/storage";

interface NotesContextValue {
  notes: StoredNote[];
  isLoadingNotes: boolean;
  refreshNotes: () => Promise<void>;
  createNote: (payload: NoteFormValues) => Promise<void>;
  updateNote: (id: string, payload: NoteFormValues) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  getNoteById: (id: string) => StoredNote | undefined;
}

const NotesContext = createContext<NotesContextValue | undefined>(undefined);

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth();
  const [notes, setNotes] = useState<StoredNote[]>([]);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);

  const refreshNotes = useCallback(async () => {
    if (!currentUser) {
      setNotes([]);
      return;
    }

    setIsLoadingNotes(true);
    try {
      const storedNotes = await getNotesForUser(currentUser.username);
      setNotes(storedNotes);
    } catch (error) {
      console.error("Failed to load notes", error);
      Alert.alert("Error", "Unable to load notes for this user.");
    } finally {
      setIsLoadingNotes(false);
    }
  }, [currentUser]);

  useEffect(() => {
    refreshNotes();
  }, [refreshNotes]);

  const createNote = useCallback(async (payload: NoteFormValues) => {
    if (!currentUser) {
      throw new Error("No active user");
    }

    const now = new Date().toISOString();
    const imageUri = payload.imageUri ? await persistImage(payload.imageUri) : undefined;
    const newNote: StoredNote = {
      id: generateId(),
      title: payload.title.trim(),
      body: payload.body.trim(),
      imageUri,
      createdAt: now,
      updatedAt: now,
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    await saveNotesForUser(currentUser.username, updatedNotes);
  }, [currentUser, notes]);

  const updateNote = useCallback(async (id: string, payload: NoteFormValues) => {
    if (!currentUser) {
      throw new Error("No active user");
    }

    const existingNote = notes.find((note) => note.id === id);
    if (!existingNote) {
      throw new Error("Note not found");
    }

    let imageUri = existingNote.imageUri;
    if (!payload.imageUri && existingNote.imageUri) {
      await removeImage(existingNote.imageUri);
      imageUri = undefined;
    } else if (payload.imageUri && payload.imageUri !== existingNote.imageUri) {
      imageUri = await persistImage(payload.imageUri);
      await removeImage(existingNote.imageUri);
    }

    const updatedNote: StoredNote = {
      ...existingNote,
      title: payload.title.trim(),
      body: payload.body.trim(),
      imageUri,
      updatedAt: new Date().toISOString(),
    };

    const updatedNotes = notes.map((note) => (note.id === id ? updatedNote : note));
    setNotes(updatedNotes);
    await saveNotesForUser(currentUser.username, updatedNotes);
  }, [currentUser, notes]);

  const deleteNote = useCallback(async (id: string) => {
    if (!currentUser) {
      throw new Error("No active user");
    }

    const noteToDelete = notes.find((note) => note.id === id);
    if (noteToDelete?.imageUri) {
      await removeImage(noteToDelete.imageUri);
    }

    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    await saveNotesForUser(currentUser.username, updatedNotes);
  }, [currentUser, notes]);

  const getNoteById = useCallback(
    (id: string) => notes.find((note) => note.id === id),
    [notes]
  );

  const value = useMemo(
    () => ({
      notes,
      isLoadingNotes,
      refreshNotes,
      createNote,
      updateNote,
      deleteNote,
      getNoteById,
    }),
    [notes, isLoadingNotes, refreshNotes, createNote, updateNote, deleteNote, getNoteById]
  );

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within NotesProvider");
  }
  return context;
};
