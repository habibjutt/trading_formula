import TradingFormulaForm from "@/components/ui/TradingFormulaForm";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center py-16 px-4 sm:px-8 bg-white dark:bg-black">
        <div className="w-full">
          <h1 className="text-3xl font-semibold mb-8 text-center text-black dark:text-zinc-50">
            Trading Formula Calculator
          </h1>
          <TradingFormulaForm />
        </div>
      </main>
    </div>
  );
}
