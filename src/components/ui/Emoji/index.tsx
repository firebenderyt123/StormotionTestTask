import { Typography, TypographyProps } from "@mui/material";
import { styled } from "@mui/material/styles";

type EmojiProps = TypographyProps & {
  emoji: string;
  component?: React.ElementType;
};

function Emoji({ emoji, ...rest }: EmojiProps) {
  return <EmojiElem {...rest}>{emoji}</EmojiElem>;
}

const EmojiElem = styled(Typography)<TypographyProps>(() => ({
  fontFamily: "'Noto Color Emoji', sans-serif",
}));

export default Emoji;
