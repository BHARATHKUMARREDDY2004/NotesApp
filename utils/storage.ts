import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

const USERS_KEY = "offline-notes-users";
const ACTIVE_USER_KEY = "offline-notes-active-user";
const NOTES_KEY_PREFIX = "offline-notes-notes-";
const NOTE_IMAGES_DIR = `${FileSystem.documentDirectory ?? ""}notes-images`;

const parseJSON = <T,>(value: string | null): T | null => {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.warn("Failed to parse JSON from storage", error);
    return null;
  }
};

const ensureImageDir = async () => {
  if (!FileSystem.documentDirectory) {
    return;
  }

  const dirInfo = await FileSystem.getInfoAsync(NOTE_IMAGES_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(NOTE_IMAGES_DIR, { intermediates: true });
  }
};

export const storageKeys = {
  users: USERS_KEY,
  activeUser: ACTIVE_USER_KEY,
  notesPrefix: NOTES_KEY_PREFIX,
};

export const getStoredUsers = async (): Promise<StoredUser[]> => {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  return parseJSON<StoredUser[]>(raw) ?? [];
};

export const saveUsers = async (users: StoredUser[]) => {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getActiveUsername = async (): Promise<string | null> => {
  return AsyncStorage.getItem(ACTIVE_USER_KEY);
};

export const setActiveUsername = async (username: string | null) => {
  if (!username) {
    await AsyncStorage.removeItem(ACTIVE_USER_KEY);
    return;
  }
  await AsyncStorage.setItem(ACTIVE_USER_KEY, username);
};

export const getNotesForUser = async (username: string): Promise<StoredNote[]> => {
  const raw = await AsyncStorage.getItem(`${NOTES_KEY_PREFIX}${username}`);
  return parseJSON<StoredNote[]>(raw) ?? [];
};

export const saveNotesForUser = async (username: string, notes: StoredNote[]) => {
  await AsyncStorage.setItem(`${NOTES_KEY_PREFIX}${username}`, JSON.stringify(notes));
};

const getFileExtension = (uri: string) => {
  const sanitized = uri.split("?")[0];
  const segments = sanitized.split(".");
  if (segments.length === 1) return "jpg";
  return segments.pop() ?? "jpg";
};

export const persistImage = async (uri?: string | null) => {
  if (!uri || !FileSystem.documentDirectory) return undefined;

  await ensureImageDir();
  const extension = getFileExtension(uri);
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;
  const destination = `${NOTE_IMAGES_DIR}/${filename}`;

  await FileSystem.copyAsync({ from: uri, to: destination });
  return destination;
};

export const removeImage = async (uri?: string | null) => {
  if (!uri || !FileSystem.documentDirectory) return;
  if (!uri.startsWith(FileSystem.documentDirectory)) return;

  const info = await FileSystem.getInfoAsync(uri);
  if (info.exists) {
    await FileSystem.deleteAsync(uri, { idempotent: true });
  }
};
