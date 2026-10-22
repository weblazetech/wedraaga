import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_GUEST_RSVPS,
  INITIAL_PLANNING_TASKS,
  WEDRAAGA_GALLERY_ITEMS,
  WEDRAAGA_VENUES,
} from './wedding-data';
import {
  calculateChecklistProgress,
  calculateRsvpMetrics,
  calculateWeddingBudgetEstimate,
  filterGalleryItems,
  filterGuests,
  validateGuestRsvpInput,
} from './wedding-logic';

test('filterGalleryItems filters by category, search query, and shortlist state', () => {
  const venuesOnly = filterGalleryItems(
    WEDRAAGA_GALLERY_ITEMS,
    { category: 'Venues & Architecture', searchQuery: '', onlyShortlisted: false },
    []
  );
  assert.ok(venuesOnly.length >= 3);
  assert.ok(venuesOnly.every((item) => item.category === 'Venues & Architecture'));

  const searchNaren = filterGalleryItems(
    WEDRAAGA_GALLERY_ITEMS,
    { category: 'All', searchQuery: 'Naren Gardens', onlyShortlisted: false },
    []
  );
  assert.equal(searchNaren.length, 1);
  assert.equal(searchNaren[0].id, 'gal-3');

  const shortlisted = filterGalleryItems(
    WEDRAAGA_GALLERY_ITEMS,
    { category: 'All', searchQuery: '', onlyShortlisted: true },
    ['gal-1', 'gal-4']
  );
  assert.equal(shortlisted.length, 2);
});

test('calculateRsvpMetrics accurately computes headcounts and attendance rate', () => {
  const metrics = calculateRsvpMetrics(INITIAL_GUEST_RSVPS);
  assert.equal(metrics.totalParties, INITIAL_GUEST_RSVPS.length);
  assert.equal(metrics.confirmedHeadcount, 20);
  assert.equal(metrics.pendingHeadcount, 4);
  assert.equal(metrics.declinedHeadcount, 2);
  assert.equal(metrics.totalInvitedHeadcount, 26);
  // 20 confirmed out of 22 responded = 91%
  assert.equal(metrics.attendanceRatePercent, 91);
  assert.ok(metrics.assignedTablesCount >= 4);
});

test('validateGuestRsvpInput enforces required fields and valid formats', () => {
  const invalid = validateGuestRsvpInput({
    fullName: 'A',
    email: 'not-an-email',
    phone: '123',
    side: 'Bride Family',
    status: 'attending',
    partySize: 2,
    events: [],
    dietary: 'Pure Vegetarian',
    tableNumber: 'Table 01 · Family VIP',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.events);

  const valid = validateGuestRsvpInput({
    fullName: 'Aditi & Rohith Sharma',
    email: 'aditi.sharma@example.com',
    phone: '+91 98480 11223',
    side: 'Bride Family',
    status: 'attending',
    partySize: 3,
    events: ['Muhurtham Ceremony', 'Grand Reception'],
    dietary: 'South Indian Traditional',
    tableNumber: 'Table 04 · Mandap West',
  });
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('filterGuests filters by status, event, side, and search query', () => {
  const pendingGuests = filterGuests(INITIAL_GUEST_RSVPS, {
    status: 'pending',
    event: 'all',
    side: 'all',
    searchQuery: '',
  });
  assert.equal(pendingGuests.length, 2);

  const jainSearch = filterGuests(INITIAL_GUEST_RSVPS, {
    status: 'all',
    event: 'Muhurtham Ceremony',
    side: 'Groom Family',
    searchQuery: 'Jain',
  });
  assert.equal(jainSearch.length, 1);
  assert.equal(jainSearch[0].id, 'g-104');
});

test('calculateWeddingBudgetEstimate and calculateChecklistProgress return deterministic totals', () => {
  const estimate = calculateWeddingBudgetEstimate({
    venue: WEDRAAGA_VENUES[0],
    guestCount: 600,
    eventsCount: 3,
    decorTier: 'Royal Heritage Mandap',
    photographyTier: 'Editorial + Cinema',
  });
  assert.ok(estimate.grandTotalInr > estimate.venueRentalInr);
  assert.equal(estimate.perGuestInr, Math.round(estimate.grandTotalInr / 600));

  const progress = calculateChecklistProgress(INITIAL_PLANNING_TASKS);
  assert.equal(progress.completedCount, 4);
  assert.equal(progress.totalCount, 8);
  assert.equal(progress.percentComplete, 50);
});
