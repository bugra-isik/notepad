import Explorer from "./explorer/explorer";
import Frame from "./frame/frame";

export default function Container() {
  return (
    <div className={`z-10 flex w-full overflow-hidden`}>
      <Explorer />
      <Frame />
    </div>
  );
}
