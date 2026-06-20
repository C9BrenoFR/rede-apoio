import { MapPin } from "@/lib/mock-data";
import { Badge } from "./badges";

interface StatusBadgeProps {
    status: MapPin["status"]
    source: MapPin["source"]
}

export default function StatusBadge({ status, source }: StatusBadgeProps) {
    if (source === "official") return <Badge tone="ok">Oficial</Badge>;
    if (status === "verified") return <Badge tone="ok">✓ Validado</Badge>;
    if (status === "rejected") return <Badge tone="danger">Rejeitado</Badge>;
    return <Badge tone="warn">Pendente</Badge>;
}