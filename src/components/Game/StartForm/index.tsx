import React from "react";

type StartFormProps = {
  onSubmit(data: any): void;
};

function StartForm({ onSubmit }: StartFormProps): JSX.Element {
  const [nValue, setNValue] = React.useState<number>(12);
  const [mValue, setMValue] = React.useState<number>(3);

  const nOnChangeHanlder = (event: any) => {
    const val = +event.target.value;
    if (val >= 3 && val >= mValue && val <= 100) {
      setNValue(val);
    }
  };

  const mOnChangeHanlder = (event: any) => {
    const val = +event.target.value;
    if (val >= 2 && val <= 10) {
      setMValue(val);
    }
  };

  const onSubmitHadler = (event: any) => {
    event.preventDefault();
    const data = {
      n: nValue,
      m: mValue,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={onSubmitHadler}>
      <input
        type="number"
        name="n"
        placeholder="n"
        min="3"
        value={nValue}
        onChange={nOnChangeHanlder}
      />
      <input
        type="number"
        name="m"
        placeholder="m"
        min="2"
        value={mValue}
        onChange={mOnChangeHanlder}
      />
      <button type="submit">Play</button>
    </form>
  );
}

export default StartForm;
