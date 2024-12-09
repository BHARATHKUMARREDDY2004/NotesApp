import { TouchableOpacity, Text } from "react-native";
import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-[#ffc93c]"; // second
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-[#385170] border-[1px]"; // third
    default:
      return "bg-[#ff6f3c]"; // first
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-white"; // Default for primary buttons
    case "secondary":
      return "text-black";
    case "danger":
      return "text-white";
    case "success":
      return "text-white";
    default:
      return "text-white"; // Default for unspecified variants
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-full py-3 px-4 flex flex-row justify-center items-center shadow-md shadow-black/30 ${getBgVariantStyle(bgVariant)} ${className}`}
      {...props}
    >
      {IconLeft && <IconLeft className="mr-2" />}
      <Text
        className={`text-lg font-psemibold ${getTextVariantStyle(textVariant)}`}
      >
        {title}
      </Text>
      {IconRight && <IconRight className="ml-2" />}
    </TouchableOpacity>
  );
};

export default CustomButton;
