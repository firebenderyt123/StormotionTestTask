import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

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
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Button onClick={playAgain}>Play again</Button>
      </Box>
    </Modal>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default WinnerModal;
