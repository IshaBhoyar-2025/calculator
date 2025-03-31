import { Home } from "./_component/Home"

export default function HomePage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Home />

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <p>.. Design by &copy; <a href="https://portfolio-isha-pi.vercel.app/" target="_blank" rel="noopener noreferrer">Isha Bhoyar 2025</a> ..</p>
      </footer>
    </div>
  );
}
