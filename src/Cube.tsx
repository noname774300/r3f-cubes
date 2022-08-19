import { useBox } from "@react-three/cannon";
import { nanoid } from "nanoid";
import { useState } from "react";
import { BufferGeometry, Mesh, TextureLoader } from "three";
import create from "zustand";
import dirt from "./dirt.png";

type CubeStore = {
  cubes: JSX.Element[];
  addCube: (x: number, y: number, z: number) => void;
};

export const useCubeStore = create<CubeStore>((set) => ({
  cubes: [],
  addCube: (x: number, y: number, z: number) =>
    set((state) => ({
      cubes: [...state.cubes, <Cube key={nanoid()} position={[x, y, z]} />],
    })),
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Cube = (props: any) => {
  const addCube = useCubeStore((state) => state.addCube);
  const [hover, set] = useState<number | null>(null);
  const texture = new TextureLoader().load(dirt);
  const [ref] = useBox(() => ({
    type: "Static",
    ...props,
  }));
  return (
    <mesh
      castShadow
      receiveShadow
      ref={ref as React.RefObject<Mesh<BufferGeometry>>}
      onPointerMove={(e) => {
        e.stopPropagation();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        set(Math.floor(e.faceIndex! / 2));
      }}
      onPointerOut={() => {
        set(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!ref.current) return;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const faceIndex = Math.floor(e.faceIndex! / 2);
        const { x, y, z } = ref.current.position;
        switch (faceIndex) {
          case 4: {
            addCube(x, y, z + 1);
            return;
          }
          case 2: {
            addCube(x, y + 1, z);
            return;
          }
          case 1: {
            addCube(x - 1, y, z);
            return;
          }
          case 5: {
            addCube(x, y, z - 1);
            return;
          }
          case 3: {
            addCube(x, y - 1, z);
            return;
          }
          // 0
          default: {
            addCube(x + 1, y, z);
            return;
          }
        }
      }}
    >
      {[...Array(6)].map((_, index) => (
        <meshStandardMaterial
          attach={`material-${index}`}
          map={texture}
          key={index}
          color={index === hover ? "grey" : "white"}
        />
      ))}
      <boxBufferGeometry attach={"geometry"} />
    </mesh>
  );
};
