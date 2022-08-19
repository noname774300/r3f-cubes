import { useSphere } from "@react-three/cannon";
import { PointerLockControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { BufferGeometry, Mesh, Vector3 } from "three";
import { usePlayerControls } from "./usePlayerControls";

const Speed = 5;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Player = (props: any) => {
  const { camera } = useThree();
  const { moveForward, moveBackward, moveLeft, moveRight, jump } =
    usePlayerControls();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 10, 0],
    ...props,
  }));
  const velocity = useRef([0, 0, 0]);
  const position = useRef([0, 10, 0]);
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), []);
  useEffect(() => api.position.subscribe((p) => (position.current = p)), []);
  useFrame(() => {
    if (!ref.current) return;
    camera.position.copy(new Vector3(...position.current));
    const direction = new Vector3();
    const frontVector = new Vector3(
      0,
      0,
      Number(moveBackward) - Number(moveForward)
    );
    const sideVector = new Vector3(Number(moveLeft) - Number(moveRight), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(Speed)
      .applyEuler(camera.rotation);
    api.velocity.set(direction.x, velocity.current[1], direction.z);
    if (jump && Math.abs(velocity.current[1]) < 0.05) {
      api.velocity.set(velocity.current[0], 10, velocity.current[2]);
    }
  });
  return (
    <>
      <PointerLockControls />
      <mesh ref={ref as React.RefObject<Mesh<BufferGeometry>>}></mesh>
    </>
  );
};
