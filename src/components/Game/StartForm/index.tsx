import React from "react";

function StartForm(): JSX.Element {
  const [nValue, setNValue] = React.useState(12);
  const [mValue, setMValue] = React.useState(3);

  return (
    <form>
      <input type="number" placeholder="n" min="3" />
      <input type="number" placeholder="m" min="2" />
      <button type="submit">Play</button>
    </form>
  );
}

export default StartForm;
