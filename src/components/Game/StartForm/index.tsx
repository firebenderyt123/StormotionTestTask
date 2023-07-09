import React from "react";
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Stack,
  Switch,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInputs } from "./types";
import Emoji from "../../ui/Emoji";

type StartFormProps = {
  onSubmit(data: FormInputs): void;
};

function StartForm({ onSubmit }: StartFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormInputs>({
    defaultValues: {
      name: "Player",
      n: 12,
      m: 3,
      isUserFirst: true,
    },
  });
  const onSubmitHandler: SubmitHandler<FormInputs> = (data) => onSubmit(data);

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <FormContainer>
        <TextFieldStyled
          type="text"
          label="🧒 name"
          {...register("name", nameValidate)}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          type="number"
          label="n"
          {...register("n", {
            ...nValidate,
            validate: (value: number) =>
              value > getValues().m || "'n' must be > 'm'",
          })}
          error={!!errors.n}
          helperText={errors.n?.message}
        />
        <TextField
          type="number"
          label="m"
          {...register("m", mValidate)}
          error={!!errors.m}
          helperText={errors.m?.message}
        />
        <ToggleContainer>
          <Typography variant="h5">First move</Typography>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center">
            <Typography>
              <Emoji emoji="🤖" component="span" /> Bot
            </Typography>
            <Switch defaultChecked {...register("isUserFirst")} />
            <Typography>
              User <Emoji emoji="😬" component="span" />
            </Typography>
          </Stack>
        </ToggleContainer>
        <ButtonStyled type="submit" variant="contained">
          Play
          <Emoji emoji="🚀" component="span" />
        </ButtonStyled>
      </FormContainer>
    </form>
  );
}

const FormContainer = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
}));

const TextFieldStyled = styled(TextField)<TextFieldProps>(() => ({
  "& .MuiFormLabel-root": {
    fontFamily: "'Noto Color Emoji', sans-serif",
  },
  "& .MuiInputBase-root legend": {
    padding: "0 5px",
  },
}));

const ToggleContainer = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "1rem 0",
}));

const ButtonStyled = styled(Button)<ButtonProps>(() => ({
  gap: "5px",
}));

const nameValidate = {
  required: "'name' is required",
  minLength: { value: 2, message: "Min length is 2" },
  maxLength: { value: 16, message: "Max length is 16" },
  pattern: {
    value: /^[a-z]+(?:[0-9_]*)$/i,
    message: "Invalid 'name'",
  },
};

const nValidate = {
  required: "'n' is required",
  valueAsNumber: true,
  min: { value: 3, message: "Min value is 3" },
  max: { value: 100, message: "Max value is 100" },
};

const mValidate = {
  required: "'m' is required",
  valueAsNumber: true,
  min: { value: 2, message: "Min value is 2" },
  max: { value: 10, message: "Max value is 10" },
};

export default StartForm;
