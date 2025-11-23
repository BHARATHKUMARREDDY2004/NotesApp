import { ComponentProps } from "react";
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

interface InputFieldProps extends TextInputProps {
  label?: string;
  icon?: IoniconName;
  secureTextEntry?: boolean;
  containerStyle?: string;
  inputStyle?: string;
  labelStyle?: string;
}

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  labelStyle,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-3 w-full">
          {label && (
            <Text className={`text-base font-pmedium mb-2 ml-2 ${labelStyle}`}>
              {label}
            </Text>
          )}
          <View
            className={`flex flex-row items-center bg-neutral-100 rounded-2xl border border-neutral-300 px-3 ${containerStyle}`}
          >
            {icon && <Ionicons name={icon} size={20} className="text-gray-400 mr-3" />}
            <TextInput
              className={`flex-1 py-3 text-base rounded-lg font-psemibold ${inputStyle}`}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
