import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message?: string;
  errorMessage?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isProcessing?: boolean;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({
  visible,
  title,
  message,
  errorMessage,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isProcessing = false,
  isDestructive = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onCancel}
  >
    <View className="flex-1 justify-center bg-black/40 px-6">
      <View className="rounded-3xl bg-white p-6">
        <Text className="text-xl font-psemibold text-gray-900">{title}</Text>
        {message ? (
          <Text className="mt-3 text-base text-gray-600">{message}</Text>
        ) : null}
        {errorMessage ? (
          <Text className="mt-3 text-sm font-psemibold text-red-500">{errorMessage}</Text>
        ) : null}

        <View className="mt-6 flex-row gap-3">
          <Pressable
            onPress={onCancel}
            disabled={isProcessing}
            className="flex-1 items-center rounded-2xl border border-gray-200 px-4 py-3"
          >
            <Text className="text-sm font-psemibold text-gray-700">
              {cancelLabel}
            </Text>
          </Pressable>
          <Pressable
            onPress={onConfirm}
            disabled={isProcessing}
            className={`flex-1 items-center rounded-2xl px-4 py-3 ${isDestructive ? "bg-red-500" : "bg-orange"}`}
          >
            {isProcessing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-sm font-psemibold text-white">
                {confirmLabel}
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
);

export default ConfirmDialog;
