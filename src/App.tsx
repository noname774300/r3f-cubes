import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Vector3 } from "three";
import { Physics } from "@react-three/cannon";
import { Ground } from "./Ground";
import { Player } from "./Player";
import { Cube, useCubeStore } from "./Cube";

function App() {
  const cubes = useCubeStore((state) => state.cubes);
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas shadows>
        <Sky sunPosition={new Vector3(0, 100, 0)} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <Physics gravity={[0, -30, 0]}>
          <Ground />
          <Player />
          <Cube position={[0, 0.5, -10]} />
          {cubes.map((cube) => cube)}
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
