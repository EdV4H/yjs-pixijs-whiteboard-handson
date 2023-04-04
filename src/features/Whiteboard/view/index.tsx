import { Sprite, Stage } from "@pixi/react";

export const Template: React.FC = () => {
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      options={{
        backgroundAlpha: 0,
      }}
    >
      <Sprite
        image="https://pixijs.io/pixi-react/img/bunny.png"
        pointerdown={() => console.log("pointerdown")}
        pointerup={() => console.log("pointerup")}
        pointerupoutside={() => console.log("pointerupoutside")}
        pointermove={() => console.log("pointermove")}
        anchor={0.5}
        position={{
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        }}
      />
    </Stage>
  );
};
