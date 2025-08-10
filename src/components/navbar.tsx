import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
  return (
    <section className="py-5 px-4 sm:px-0">
      <nav className="justify-between flex">
        <div className="flex items-center gap-6">
          <h1 className="text-3xl font-extrabold font-display">SiGTECH</h1>
          <div className="flex items-center"></div>
        </div>
        <div className="flex gap-2">
          <ModeToggle />
        </div>
      </nav>
    </section>
  );
}
