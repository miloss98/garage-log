import { TYPES_REQUIRING_TITLE } from "@/lib/constants";
import type { ServiceRecord, ServiceType } from "@/types";

export type ServiceStatus = "overdue" | "due_soon" | "ok";

export type UpcomingService = {
  type: ServiceType;
  title: string | null;
  lastRecord: ServiceRecord;
  dueDate: string | null;
  dueMileage: number | null;
  daysLeft: number | null;
  kmLeft: number | null;
  status: ServiceStatus;
};

const DUE_SOON_DAYS = 30;
const DUE_SOON_KM = 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const STATUS_RANK: Record<ServiceStatus, number> = {
  overdue: 0,
  due_soon: 1,
  ok: 2,
};

// Today's calendar date as UTC midnight, the same format the API stores
// dates in, so "days left" doesn't depend on the time of day.
function todayUtc() {
  const now = new Date();
  return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
}

// Repairs/"other" are one-offs: two different repairs shouldn't hide each
// other, so they're grouped by title. Everything else is grouped by type.
function groupKey(record: ServiceRecord) {
  return TYPES_REQUIRING_TITLE.includes(record.type)
    ? `${record.type}:${record.title?.trim().toLowerCase() ?? ""}`
    : record.type;
}

function getStatus(daysLeft: number | null, kmLeft: number | null) {
  if ((daysLeft ?? 0) < 0 || (kmLeft ?? 0) < 0) return "overdue";
  if (
    (daysLeft !== null && daysLeft <= DUE_SOON_DAYS) ||
    (kmLeft !== null && kmLeft <= DUE_SOON_KM)
  ) {
    return "due_soon";
  }
  return "ok";
}

/**
 * What's coming up for one car. Only the LATEST record of each kind counts:
 * once you log a new oil change, the previous one's due date is history,
 * not an overdue service. Due "on a date or at a mileage, whichever first".
 */
export function getUpcomingServices(
  carMileage: number | null,
  records: ServiceRecord[],
): UpcomingService[] {
  const latest = new Map<string, ServiceRecord>();
  for (const record of records) {
    const current = latest.get(groupKey(record));
    if (!current || record.service_date > current.service_date) {
      latest.set(groupKey(record), record);
    }
  }

  const today = todayUtc();
  const upcoming: UpcomingService[] = [];

  for (const record of latest.values()) {
    const { next_service_date: dueDate, next_service_mileage: dueMileage } =
      record;
    // Latest record has no reminder: nothing is due for this kind
    if (!dueDate && dueMileage == null) continue;

    const daysLeft = dueDate
      ? Math.round((Date.parse(dueDate) - today) / DAY_MS)
      : null;
    const kmLeft =
      dueMileage != null && carMileage != null ? dueMileage - carMileage : null;

    upcoming.push({
      type: record.type,
      title: record.title,
      lastRecord: record,
      dueDate,
      dueMileage,
      daysLeft,
      kmLeft,
      status: getStatus(daysLeft, kmLeft),
    });
  }

  // Most urgent first
  return upcoming.sort(
    (a, b) =>
      STATUS_RANK[a.status] - STATUS_RANK[b.status] ||
      (a.daysLeft ?? Infinity) - (b.daysLeft ?? Infinity) ||
      (a.kmLeft ?? Infinity) - (b.kmLeft ?? Infinity),
  );
}

const plural = (n: number, word: string) =>
  `${n.toLocaleString("en-GB")} ${word}${n === 1 ? "" : "s"}`;

// "3 days overdue", "Due today", "In 12 days or 800 km"
export function describeDue({ daysLeft, kmLeft }: UpcomingService): string {
  const overdue: string[] = [];
  const remaining: string[] = [];

  if (daysLeft !== null) {
    if (daysLeft < 0) overdue.push(plural(-daysLeft, "day"));
    else if (daysLeft > 0) remaining.push(plural(daysLeft, "day"));
  }
  if (kmLeft !== null) {
    if (kmLeft < 0) overdue.push(`${(-kmLeft).toLocaleString("en-GB")} km`);
    else remaining.push(`${kmLeft.toLocaleString("en-GB")} km`);
  }

  if (overdue.length) return `${overdue.join(" / ")} overdue`;
  if (daysLeft === 0) return "Due today";
  return `In ${remaining.join(" or ")}`;
}
