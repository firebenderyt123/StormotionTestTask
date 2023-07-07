import React from "react";
import StartForm from "../../components/Game/StartForm";

function GameContainer(): JSX.Element {
  const onPlayClick = React.useCallback((data: any) => {
    console.log(data);
  }, []);

  return <StartForm onSubmit={onPlayClick} />;
}

export default GameContainer;
