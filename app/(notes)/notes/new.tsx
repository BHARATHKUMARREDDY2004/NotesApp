import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import NoteEditor from "@/components/NoteEditor";
import { useNotes } from "@/context/NotesContext";

const NewNoteScreen = () => {
  const router = useRouter();
  const { createNote } = useNotes();

  const handleSubmit = async (values: NoteFormValues) => {
    await createNote(values);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <NoteEditor submitLabel="Save note" onSubmit={handleSubmit} />
    </SafeAreaView>
  );
};

export default NewNoteScreen;
