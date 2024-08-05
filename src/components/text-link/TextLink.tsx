import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from "react-native";

import { Typography, TypographyProps } from "../typography/Typography";

export type TextLinkProps = {
  label: string;
  fontSize?: number;
  color?: TypographyProps["color"];
} & TouchableWithoutFeedbackProps;
export function TextLink(props: TextLinkProps) {
  const { label, fontSize = 12, color = "main", ...rest } = props;

  return (
    <TouchableWithoutFeedback {...rest}>
      <Typography
        fontFamily="OpenSans-Regular"
        fontSize={fontSize}
        color={color}
      >
        {label}
      </Typography>
    </TouchableWithoutFeedback>
  );
}
