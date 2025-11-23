import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const createDefaultValues = (): NoteFormValues => ({
  title: "",
  body: "",
  imageUri: undefined,
});

interface NoteEditorProps {
  initialValues?: NoteFormValues;
  submitLabel: string;
  onSubmit: (values: NoteFormValues) => Promise<void>;
}

const NoteEditor = ({ initialValues, submitLabel, onSubmit }: NoteEditorProps) => {
  const [values, setValues] = useState<NoteFormValues>(initialValues ?? createDefaultValues());
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setValues(initialValues ?? createDefaultValues());
  }, [initialValues]);

  const requestPermission = async (type: "camera" | "media") => {
    const request =
      type === "camera"
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (request.status !== "granted") {
      setError(`We need access to your ${type} to continue.`);
      return false;
    }
    return true;
  };

  const handlePickImage = async () => {
    const allowed = await requestPermission("media");
    if (!allowed) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setValues((prev) => ({ ...prev, imageUri: result.assets[0].uri }));
    }
  };

  const handleCaptureImage = async () => {
    const allowed = await requestPermission("camera");
    if (!allowed) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setValues((prev) => ({ ...prev, imageUri: result.assets[0].uri }));
    }
  };

  const handleSubmit = async () => {
    if (!values.title.trim()) {
      setError("Give your note a title first.");
      return;
    }

    setError("");
    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to save note";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ padding: 24, paddingBottom: 64 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="gap-6">
        <View>
          <Text className="text-sm font-psemibold text-gray-600">Title</Text>
          <TextInput
            value={values.title}
            onChangeText={(text) => setValues((prev) => ({ ...prev, title: text }))}
            placeholder="Grocery list, trip ideas, ..."
            className="mt-2 rounded-2xl border border-gray-200 px-4 py-3 text-base text-gray-900"
          />
        </View>

        <View>
          <Text className="text-sm font-psemibold text-gray-600">Body</Text>
          <TextInput
            value={values.body}
            onChangeText={(text) => setValues((prev) => ({ ...prev, body: text }))}
            placeholder="Write anything..."
            multiline
            textAlignVertical="top"
            numberOfLines={8}
            style={{ minHeight: 180 }}
            className="mt-2 rounded-2xl border border-gray-200 px-4 py-3 text-base text-gray-900"
          />
        </View>

        <View>
          <Text className="text-sm font-psemibold text-gray-600">Image (optional)</Text>
          {values.imageUri ? (
            <View className="mt-3 rounded-3xl border border-gray-100 bg-gray-50 p-3">
              <Image
                source={{ uri: values.imageUri }}
                className="h-48 w-full rounded-2xl"
                resizeMode="cover"
              />
              <Pressable
                className="mt-3 items-center rounded-2xl border border-red-200 px-4 py-3"
                onPress={() => setValues((prev) => ({ ...prev, imageUri: undefined }))}
              >
                <Text className="text-sm font-psemibold text-red-500">Remove image</Text>
              </Pressable>
            </View>
          ) : (
            <View className="mt-3 rounded-3xl border border-dashed border-gray-300 p-6">
              <Text className="text-base text-center text-gray-500">
                Attach a photo to make the note more memorable.
              </Text>
            </View>
          )}

          <View className="mt-4 flex-row gap-3">
            <Pressable
              className="flex-1 items-center rounded-2xl border border-gray-200 px-4 py-3"
              onPress={handlePickImage}
            >
              <Text className="text-sm font-psemibold text-gray-700">From gallery</Text>
            </Pressable>
            <Pressable
              className="flex-1 items-center rounded-2xl border border-gray-200 px-4 py-3"
              onPress={handleCaptureImage}
            >
              <Text className="text-sm font-psemibold text-gray-700">Use camera</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {error ? (
        <Text className="mt-6 text-sm text-red-500">{error}</Text>
      ) : null}

      <Pressable
        className="mt-6 items-center rounded-2xl bg-orange px-4 py-4"
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-base font-psemibold text-white">{submitLabel}</Text>
        )}
      </Pressable>
    </ScrollView>
  );
};

export default NoteEditor;
