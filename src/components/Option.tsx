import { cn } from "../utils";

export default function Option({
  content,
  isCorrect,
}: {
  content: string;
  isCorrect?: boolean | undefined;
}) {
  if (isCorrect === undefined) {
    return <li className="p-2 border rounded w-full">{content}</li>;
  }
  return (
    <li
      className={cn(
        "p-2 border rounded w-full",
        isCorrect ? "bg-green-200" : "bg-red-200",
      )}
    >
      {content}
    </li>
  );
}
