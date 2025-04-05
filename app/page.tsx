import Columns from "./components/Columns";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-future-bg text-future-foreground p-4 md:p-8">
      <Columns />
    </div>
  );
}