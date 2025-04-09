import Header from "@/components/Header";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex w-full h-[80vh] m-auto justify-center items-center">
        {children}
      </main>
    </>
  );
}
