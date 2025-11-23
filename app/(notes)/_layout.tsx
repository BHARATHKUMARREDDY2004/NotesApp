import { Stack } from "expo-router";

const NotesLayout = () => (
  <Stack>
    <Stack.Screen name="notes/index" options={{ headerShown: false }} />
    <Stack.Screen name="notes/new" options={{ headerShown: false }} />
    <Stack.Screen name="notes/[noteId]" options={{ headerShown: false }} />
  </Stack>
);

export default NotesLayout;
