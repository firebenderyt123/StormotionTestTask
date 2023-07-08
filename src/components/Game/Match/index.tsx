import React from "react";
import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";

type MatchProps = {
  isSelected: boolean;
  onClick(): void;
};

function Match({ isSelected, onClick }: MatchProps): JSX.Element {
  const onClickHandler = React.useCallback(() => {
    onClick();
  }, [onClick]);

  const containerStyles = {
    cursor: "pointer",
    marginTop: isSelected ? "-20px" : "0",
    transition: "margin-top .2s ease-in-out",
  };

  return (
    <Box onClick={onClickHandler} sx={containerStyles}>
      <Head />
      <Stick />
    </Box>
  );
}

const Head = styled(Box)<BoxProps>(() => ({
  width: 5,
  height: 5,
  backgroundColor: "#000",
  borderRadius: "100% 100% 0 0",
}));

const Stick = styled(Box)<BoxProps>(() => ({
  width: 5,
  height: 50,
  backgroundColor: "#cb913c",
}));

export default React.memo(Match);
