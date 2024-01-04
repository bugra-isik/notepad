import Navigation from "./Navigation";
import Body from "./Body";
import { RefObject, useRef } from "react";

export default function Frame() {
  const mdRef: RefObject<HTMLElement> = useRef(null);

  return (
    <section
      className={`bg-c2 text-c4 relative flex w-4/5 flex-col items-center`}
    >
      <Navigation mdRef={mdRef} />
      <Body mdRef={mdRef} />
    </section>
  );
}
