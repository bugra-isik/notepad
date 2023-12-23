import Explorer from "./Explorer";
import Frame from "./Frame";

export default function Container() {
  return (
    <div className={`z-10 flex w-full overflow-hidden`}>
      <Explorer />
      <Frame />
    </div>
  );
}
