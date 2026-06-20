import { CATEGORY_META, type CommunityEvent, type EmergencyContact } from "@/lib/mock-data";
import { FaPhoneAlt } from "react-icons/fa";

interface AboutCardProps {
    title: string
    tag: string
    body: string
}

export function AboutCard({ title, tag, body }: AboutCardProps) {
    return (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold">{title}</h3>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{tag}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{body}</p>
        </div>
    );
}

interface EventCardProps {
    event: CommunityEvent
}

export function EventCard({ event }: EventCardProps) {
    const meta = CATEGORY_META[event.category];

    const tokenBg: Record<string, string> = {
        food: "bg-food",
        shelter: "bg-shelter",
        health: "bg-health",
        clothing: "bg-clothing",
    };

    return (
        <li
            key={event.id}
            className="grid gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm sm:grid-cols-[120px_1fr_auto] sm:items-center"
        >
            <div className="flex items-center gap-3 sm:flex-col sm:items-start">
                <span className={`grid h-12 w-12 place-items-center rounded-xl text-white ${tokenBg[event.category]}`} aria-hidden>
                    <span className="text-xl">{meta.icon}</span>
                </span>
                <div>
                    <div className="font-display text-base font-bold">{event.date}</div>
                    <div className="text-xs text-muted-foreground">{event.time}</div>
                </div>
            </div>
            <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{meta.label}</div>
                <h2 className="font-display text-lg font-bold leading-tight">{event.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                    📍 {event.place} · Organização: {event.organizer}
                </p>
            </div>
            <button className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-semibold hover:bg-secondary">
                Adicionar à agenda
            </button>
        </li>
    );
}

interface ContactCardProps {
    contact: EmergencyContact
}

export function ContactCard({ contact }: ContactCardProps) {
    const toneClass: Record<string, string> = {
        primary: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        accent: "bg-accent text-accent-foreground",
    };

    return (
        <a
            key={contact.name}
            href={`tel:${contact.number.replace(/\D/g, "")}`}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
            <span className={`grid h-14 w-14 place-items-center rounded-xl text-2xl shadow-sm ${toneClass[contact.tone]}`} aria-hidden>
                <FaPhoneAlt />
            </span>
            <div className="flex-1">
                <div className="font-display text-lg font-bold leading-tight">{contact.name}</div>
                <div className="text-sm text-muted-foreground">{contact.description}</div>
            </div>
            <div className="text-right">
                <div className="font-display text-xl font-extrabold tracking-tight">{contact.number}</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
                    Ligar →
                </div>
            </div>
        </a>
    )
}