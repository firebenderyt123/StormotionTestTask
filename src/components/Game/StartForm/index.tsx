import React from "react";
import { Button, Stack, Switch, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInputs } from "./types";

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
      <TextField
        type="text"
        label="name"
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
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Bot</Typography>
        <Switch defaultChecked {...register("isUserFirst")} />
        <Typography>User</Typography>
      </Stack>
      <Button type="submit">Play</Button>
    </form>
  );
}

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
