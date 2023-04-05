import { Graphics, Stage } from "@pixi/react";
import * as PIXI from "pixi.js";
import { useCallback, useMemo, useState } from "react";

PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST;

export const Template: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 190, y: 80 });
  const offset = useMemo(() => new PIXI.Point(), []);

  const handleDragStart = useCallback((e: PIXI.FederatedPointerEvent) => {
    const dragTarget = e.target as PIXI.Graphics;
    dragTarget.toLocal(e.global, undefined, offset);
    console.log("drag start", e.global, offset);
    offset.x *= dragTarget.scale.x;
    offset.y *= dragTarget.scale.y;
    console.log("drag start end", e.global, offset);
    setIsDragging(true);
  }, []);

  const handleMove = useCallback(
    (e: PIXI.FederatedPointerEvent) => {
      if (isDragging) {
        setPosition({ x: e.global.x - offset.x, y: e.global.y - offset.y });
      }
    },
    [isDragging]
  );

  const handleDragEnd = useCallback((e: PIXI.FederatedPointerEvent) => {
    console.log("drag end", e.global, offset);
    setIsDragging(false);
  }, []);

  const drawRect = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(0x000000);
      g.drawRect(position.x, position.y, 150, 150);
      g.endFill();
    },
    [position]
  );

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      options={{
        backgroundAlpha: 0,
        eventMode: "static",
      }}
    >
      <Graphics
        draw={drawRect}
        eventMode="static"
        pointerdown={handleDragStart}
        pointerup={handleDragEnd}
        pointerupoutside={handleDragEnd}
        pointermove={handleMove}
        anchor={0.5}
      />
    </Stage>
  );
};
