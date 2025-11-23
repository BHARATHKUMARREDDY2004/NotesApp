import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";

import NoteEditor from "@/components/NoteEditor";
import { useNotes } from "@/context/NotesContext";

const EditNoteScreen = () => {
  const router = useRouter();
  const { noteId } = useLocalSearchParams<{ noteId: string }>();
  const { getNoteById, updateNote } = useNotes();

  if (!noteId || typeof noteId !== "string") {
    return (
      <View className="flex-1 items-center justify-center bg-white px-8">
        <Text className="text-lg font-psemibold text-gray-900">Invalid note.</Text>
        <Pressable onPress={() => router.replace("/(notes)/notes")} className="mt-4 rounded-2xl bg-orange px-4 py-3">
          <Text className="text-white">Back to notes</Text>
        </Pressable>
      </View>
    );
  }

  const note = getNoteById(noteId);

  if (!note) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#f97316" />
        <Text className="mt-4 text-base text-gray-500">Fetching note…</Text>
        <Pressable
          className="mt-6 rounded-2xl bg-orange px-4 py-3"
          onPress={() => router.replace("/(notes)/notes")}
        >
          <Text className="text-white">Back to notes</Text>
        </Pressable>
      </View>
    );
  }

  const handleSubmit = async (values: NoteFormValues) => {
    await updateNote(note.id, values);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <NoteEditor
        initialValues={{
          title: note.title,
          body: note.body,
          imageUri: note.imageUri,
        }}
        submitLabel="Update note"
        onSubmit={handleSubmit}
      />
    </SafeAreaView>
  );
};

export default EditNoteScreen;
