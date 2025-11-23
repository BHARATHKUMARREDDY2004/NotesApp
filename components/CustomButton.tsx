import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  textStyle?: string;
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

const CustomButton = ({
  onPress,
  title,
  textStyle,
  IconLeft,
  IconRight,
  className,
  ...props
}: CustomButtonProps) => {
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
