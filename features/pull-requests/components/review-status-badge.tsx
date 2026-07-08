import { Badge } from "@/components/ui/badge";

type Props = {
  status: string;
};

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  reviewed: "bg-green-100 text-green-700",
  rate_limited: "bg-red-100 text-red-700",
};

export function ReviewStatusBadge({ status }: Props) {
  return (
    <Badge className={statusStyles[status] ?? "bg-gray-100 text-gray-700"}>
      {status.replace("_", " ")}
    </Badge>
  );
}
