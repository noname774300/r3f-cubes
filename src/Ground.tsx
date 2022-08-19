import { usePlane } from "@react-three/cannon";
import { BufferGeometry, Mesh, RepeatWrapping, TextureLoader } from "three";
import grass from "./grass.png";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export const Ground = (props: any) => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));
  const texture = new TextureLoader().load(grass);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(240, 240);
  return (
    <mesh ref={ref as React.RefObject<Mesh<BufferGeometry>>} receiveShadow>
      <planeBufferGeometry args={[1000, 1000]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};
