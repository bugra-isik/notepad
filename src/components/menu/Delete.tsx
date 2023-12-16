import { db } from "@/db";

export default function Delete() {
  const deleteTable = async () => await db.myData.clear();
  return (
    <button
      className={`h-20 w-40 bg-red-900`}
      onClick={() => {
        if (confirm("You are deleting all data. Do you want to proceed?")) {
          deleteTable();
          window.location.reload();
        }
      }}
    >
      Delete All Data
    </button>
  );
}
