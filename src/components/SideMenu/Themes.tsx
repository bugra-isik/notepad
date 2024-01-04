import { useCallback, useEffect } from "react";
import themes from "./themes.json";

export default function Theme() {
  const setTheme = useCallback(
    (e: { "--C1": string; "--C2": string; "--C3": string; "--C4": string }) => {
      document.body.style.setProperty("--C1", e["--C1"]);
      document.body.style.setProperty("--C2", e["--C2"]);
      document.body.style.setProperty("--C3", e["--C3"]);
      document.body.style.setProperty("--C4", e["--C4"]);
    },
    [],
  );

  useEffect(() => {
    const local = localStorage.getItem("theme");
    if (local) {
      setTheme(themes[Number(local)].color);
    }
  });

  return (
    <div className={`h1 flex w-4/5 flex-col items-center gap-y-4`}>
      <h1 className={` h1`}>Main theme</h1>
      <div className="grid w-full grid-cols-4 place-items-center justify-between gap-y-16 text-base">
        {themes.map((item, index) => (
          <button
            key={index}
            className={`size-8`}
            onClick={() => {
              localStorage.setItem("theme", String(index));
              setTheme(item.color);
            }}
            style={{ backgroundColor: item.switch }}
          />
        ))}
      </div>
    </div>
  );
}
