import React from "react";
import { Box, BoxProps, Button, Modal, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Emoji from "../../ui/Emoji";

type WinnerModalProps = {
  title: string;
  open: boolean;
  playAgain(): void;
};

function WinnerModal({
  title,
  open,
  playAgain,
}: WinnerModalProps): JSX.Element {
  return (
    <Modal open={open}>
      <ModalContainer>
        <Typography variant="h6" component="h2" textAlign="center" pb="1rem">
          <Emoji emoji="🎉" component="span" /> {title}{" "}
          <Emoji emoji="🎉" component="span" />
        </Typography>
        <ButtonContainer>
          <Button onClick={playAgain}>
            Play again <Emoji emoji="👾" component="span" ml="5px" />
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  );
}

const ModalContainer = styled(Box)<BoxProps>(() => ({
  width: 400,
  maxWidth: "calc(100% - 68px)",
  backgroundColor: "#fff",
  border: "2px solid #000",
  padding: "32px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: "24px",
}));

const ButtonContainer = styled(Box)<BoxProps>(() => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
}));

export default WinnerModal;
