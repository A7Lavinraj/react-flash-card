import { cn } from "../utils";

export default function CategoryCard({
  title,
  color,
  className,
  callback,
}: {
  title: string;
  color?: string;
  className?: string;
  callback: (param: string) => void;
}) {
  const backgroundColor = `bg-${color}-400`;

  return (
    <button
      onClick={() => {
        callback(title);
      }}
      className={cn(
        "size-60 rounded flex items-center justify-center hover:brightness-95 border",
        backgroundColor,
        className,
      )}
    >
      <h2>{title}</h2>
    </button>
  );
}
