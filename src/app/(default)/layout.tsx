export default function DefaultLayout({
  children,
  titles,
}: {
  children: React.ReactNode;
  titles: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-5 h-full">
      <div className="col-span-2 border-r h-full overflow-auto sticky top-0">
        {children}
      </div>
      <div className="col-span-3 h-flow overflow-auto">{titles}</div>
    </div>
  );
}
