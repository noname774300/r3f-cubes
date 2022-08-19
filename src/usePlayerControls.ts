import { useEffect, useState } from "react";

const keys = {
  KeyW: "moveForward",
  KeyS: "moveBackward",
  KeyA: "moveLeft",
  KeyD: "moveRight",
  Space: "jump",
};

function moveFieldByKey(key: keyof typeof keys): string {
  return keys[key];
}

export const usePlayerControls = () => {
  const [movement, setMovement] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
  });
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setMovement((m) => ({
        ...m,
        [moveFieldByKey(e.code as keyof typeof keys)]: true,
      }));
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      setMovement((m) => ({
        ...m,
        [moveFieldByKey(e.code as keyof typeof keys)]: false,
      }));
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  });
  return movement;
};
