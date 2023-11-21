interface FooterProps {}

export function Footer({}: FooterProps): JSX.Element {
  return (
    <div className="flex h-10 items-center justify-between px-6 py-2">
      <span className="">Todo List</span>
    </div>
  );
}
