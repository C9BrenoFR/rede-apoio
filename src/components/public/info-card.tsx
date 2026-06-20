import { IconType } from "react-icons";

interface InfoCardProps {
    Icon: IconType
    title: string
    text: string
}

export default function InfoCard({ Icon, title, text }: InfoCardProps) {
    return (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-xl" aria-hidden>{<Icon />}</div>
            <h3 className="mt-3 font-display text-base font-bold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{text}</p>
        </div>
    );
}