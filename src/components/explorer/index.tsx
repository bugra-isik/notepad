import Items from "./Items";
import Search from "./Search";

export default function Explorer() {

  return (
    <section
      className={`bg-c1 text-c3 relative flex w-1/5 flex-col justify-between gap-8 px-4 py-8`}
    >
      <Items />
      <Search />
    </section>
  );
}
