import { useRef } from "react";
import Container from "../components/Container";
import MovingGradient from "../components/MovingGradient";
import RippleMosaic from "../components/RippleMosaic";
export default function History() {
  const container = useRef<HTMLDivElement | null>(null);
  return (
    <Container>
      <div ref={container} className="w-full h-screen pt-20">
        {/* <MovingGradient
          width={container.current?.clientWidth || 0}
          height={container.current?.clientHeight || 0}
        /> */}
      </div>
    </Container>
  );
}
