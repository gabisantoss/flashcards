import Sidebar from "@/components/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <div className="w-3/4 flex flex-col justify-center p-6">{children}</div>
    </div>
  );
}
