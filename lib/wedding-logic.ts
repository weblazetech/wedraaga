import {
  CuratedVenue,
  DietaryPreference,
  GalleryCategory,
  GalleryItem,
  GuestRsvpRecord,
  PlanningTask,
  RsvpStatus,
  WeddingEventName,
} from './wedding-data';

export interface GalleryFilterOptions {
  category: GalleryCategory;
  searchQuery: string;
  onlyShortlisted: boolean;
}

export function filterGalleryItems(
  items: GalleryItem[],
  options: GalleryFilterOptions,
  shortlistedIds: string[]
): GalleryItem[] {
  const query = options.searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    if (options.category !== 'All' && item.category !== options.category) {
      return false;
    }
    if (options.onlyShortlisted && !shortlistedIds.includes(item.id)) {
      return false;
    }
    if (query.length > 0) {
      const searchable = [
        item.title,
        item.coupleOrVenue,
        item.category,
        item.location,
        item.description,
        item.photographerOrVendor,
      ]
        .join(' ')
        .toLowerCase();
      if (!searchable.includes(query)) {
        return false;
      }
    }
    return true;
  });
}

export interface RsvpSummaryMetrics {
  totalParties: number;
  totalInvitedHeadcount: number;
  confirmedHeadcount: number;
  pendingHeadcount: number;
  declinedHeadcount: number;
  attendanceRatePercent: number;
  assignedTablesCount: number;
  eventHeadcounts: Record<WeddingEventName, number>;
  dietaryHeadcounts: Record<DietaryPreference, number>;
}

export function calculateRsvpMetrics(guests: GuestRsvpRecord[]): RsvpSummaryMetrics {
  let totalInvitedHeadcount = 0;
  let confirmedHeadcount = 0;
  let pendingHeadcount = 0;
  let declinedHeadcount = 0;
  const assignedTables = new Set<string>();

  const eventHeadcounts: Record<WeddingEventName, number> = {
    'Haldi & Mehendi': 0,
    'Sangeet Soirée': 0,
    'Muhurtham Ceremony': 0,
    'Grand Reception': 0,
  };

  const dietaryHeadcounts: Record<DietaryPreference, number> = {
    'Pure Vegetarian': 0,
    'Jain Vegetarian': 0,
    'South Indian Traditional': 0,
    'Continental & Fusion': 0,
  };

  for (const guest of guests) {
    const size = Math.max(1, guest.partySize);
    totalInvitedHeadcount += size;

    if (guest.status === 'attending') {
      confirmedHeadcount += size;
      dietaryHeadcounts[guest.dietary] = (dietaryHeadcounts[guest.dietary] || 0) + size;
      for (const ev of guest.events) {
        if (ev in eventHeadcounts) {
          eventHeadcounts[ev] += size;
        }
      }
      if (guest.tableNumber && guest.tableNumber !== 'Unassigned') {
        assignedTables.add(guest.tableNumber);
      }
    } else if (guest.status === 'pending') {
      pendingHeadcount += size;
    } else if (guest.status === 'declined') {
      declinedHeadcount += size;
    }
  }

  const respondedHeadcount = confirmedHeadcount + declinedHeadcount;
  const attendanceRatePercent =
    respondedHeadcount > 0 ? Math.round((confirmedHeadcount / respondedHeadcount) * 100) : 0;

  return {
    totalParties: guests.length,
    totalInvitedHeadcount,
    confirmedHeadcount,
    pendingHeadcount,
    declinedHeadcount,
    attendanceRatePercent,
    assignedTablesCount: assignedTables.size,
    eventHeadcounts,
    dietaryHeadcounts,
  };
}

export interface GuestFilterOptions {
  status: 'all' | RsvpStatus;
  event: 'all' | WeddingEventName;
  side: 'all' | GuestRsvpRecord['side'];
  searchQuery: string;
}

export function filterGuests(
  guests: GuestRsvpRecord[],
  options: GuestFilterOptions
): GuestRsvpRecord[] {
  const query = options.searchQuery.trim().toLowerCase();

  return guests.filter((g) => {
    if (options.status !== 'all' && g.status !== options.status) {
      return false;
    }
    if (options.side !== 'all' && g.side !== options.side) {
      return false;
    }
    if (options.event !== 'all' && !g.events.includes(options.event)) {
      return false;
    }
    if (query.length > 0) {
      const hay = `${g.fullName} ${g.email} ${g.phone} ${g.tableNumber} ${g.notes ?? ''}`.toLowerCase();
      if (!hay.includes(query)) {
        return false;
      }
    }
    return true;
  });
}

export interface NewGuestRsvpInput {
  fullName: string;
  email: string;
  phone: string;
  side: GuestRsvpRecord['side'];
  status: RsvpStatus;
  partySize: number;
  events: WeddingEventName[];
  dietary: DietaryPreference;
  tableNumber: string;
  songRequest?: string;
  notes?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateGuestRsvpInput(input: NewGuestRsvpInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter the guest or family name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = 'Please enter a valid email address for digital invitation tracking.';
  }

  const cleanPhone = (input.phone || '').replace(/[\s\-()]/g, '');
  if (!cleanPhone || cleanPhone.length < 8 || !/^\+?[0-9]+$/.test(cleanPhone)) {
    errors.phone = 'Please enter a valid contact phone number (at least 8 digits).';
  }

  if (!Number.isFinite(input.partySize) || input.partySize < 1 || input.partySize > 15) {
    errors.partySize = 'Party size must be between 1 and 15 guests.';
  }

  if (input.status !== 'declined' && (!input.events || input.events.length === 0)) {
    errors.events = 'Please select at least one wedding celebration event.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface BudgetEstimateInput {
  venue: CuratedVenue;
  guestCount: number;
  eventsCount: number;
  decorTier: 'Minimalist Floral' | 'Royal Heritage Mandap' | 'Bespoke Architectural';
  photographyTier: 'Candid Essential' | 'Editorial + Cinema' | 'Multi-Day Luxury';
}

export interface BudgetEstimateOutput {
  venueRentalInr: number;
  cateringTotalInr: number;
  decorTotalInr: number;
  photographyTotalInr: number;
  hospitalityReserveInr: number;
  grandTotalInr: number;
  perGuestInr: number;
}

export function calculateWeddingBudgetEstimate(input: BudgetEstimateInput): BudgetEstimateOutput {
  const clampedGuests = Math.max(50, Math.min(3000, input.guestCount));
  const clampedEvents = Math.max(1, Math.min(5, input.eventsCount));

  // Multi-event venue scaling (base covers primary day, additional events add 35% each)
  const venueRentalInr = Math.round(
    input.venue.basePackageInr * (1 + (clampedEvents - 1) * 0.35)
  );

  // Catering scales with guests and events (weighted 0.65 per additional event since not all guests attend all minor rituals)
  const effectiveMealMultiplier = 1 + (clampedEvents - 1) * 0.65;
  const cateringTotalInr = Math.round(
    clampedGuests * input.venue.perPlateInr * effectiveMealMultiplier
  );

  const decorMap: Record<BudgetEstimateInput['decorTier'], number> = {
    'Minimalist Floral': 220000,
    'Royal Heritage Mandap': 420000,
    'Bespoke Architectural': 750000,
  };
  const decorTotalInr = decorMap[input.decorTier];

  const photoMap: Record<BudgetEstimateInput['photographyTier'], number> = {
    'Candid Essential': 160000,
    'Editorial + Cinema': 290000,
    'Multi-Day Luxury': 460000,
  };
  const photographyTotalInr = photoMap[input.photographyTier];

  const hospitalityReserveInr = Math.round((venueRentalInr + cateringTotalInr) * 0.08);

  const grandTotalInr =
    venueRentalInr +
    cateringTotalInr +
    decorTotalInr +
    photographyTotalInr +
    hospitalityReserveInr;

  const perGuestInr = Math.round(grandTotalInr / clampedGuests);

  return {
    venueRentalInr,
    cateringTotalInr,
    decorTotalInr,
    photographyTotalInr,
    hospitalityReserveInr,
    grandTotalInr,
    perGuestInr,
  };
}

export interface ChecklistProgress {
  completedCount: number;
  totalCount: number;
  percentComplete: number;
  allocatedBudgetInr: number;
  completedBudgetInr: number;
}

export function calculateChecklistProgress(tasks: PlanningTask[]): ChecklistProgress {
  const totalCount = tasks.length;
  let completedCount = 0;
  let allocatedBudgetInr = 0;
  let completedBudgetInr = 0;

  for (const t of tasks) {
    allocatedBudgetInr += t.estimatedBudgetInr;
    if (t.completed) {
      completedCount += 1;
      completedBudgetInr += t.estimatedBudgetInr;
    }
  }

  const percentComplete = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return {
    completedCount,
    totalCount,
    percentComplete,
    allocatedBudgetInr,
    completedBudgetInr,
  };
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
