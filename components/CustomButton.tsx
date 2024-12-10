import { TouchableOpacity, Text } from "react-native";
import { ButtonProps } from "@/types/type";

const CustomButton = ({
  onPress,
  title,
  textStyle,
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-full py-3 px-4 flex flex-row justify-center items-center shadow-md shadow-black/30 ${className}`}
      {...props}
    >
      {IconLeft && <IconLeft className="mr-2" />}
      <Text
        className={`text-lg font-psemibold ${textStyle}`}
      >
        {title}
      </Text>
      {IconRight && <IconRight className="ml-2" />}
    </TouchableOpacity>
  );
};

export default CustomButton;
