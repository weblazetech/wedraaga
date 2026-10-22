'use client';

import React, { useState } from 'react';
import { Check, Download, Search, UserPlus, X } from 'lucide-react';
import {
  DietaryPreference,
  GuestRsvpRecord,
  RsvpStatus,
  WeddingEventName,
} from '@/lib/wedding-data';
import {
  filterGuests,
  RsvpSummaryMetrics,
  validateGuestRsvpInput,
} from '@/lib/wedding-logic';

const ALL_EVENTS: WeddingEventName[] = [
  'Haldi & Mehendi',
  'Sangeet Soirée',
  'Muhurtham Ceremony',
  'Grand Reception',
];

const TABLE_OPTIONS = [
  'Unassigned',
  'Table 01 · Family VIP',
  'Table 02 · Groom Family',
  'Table 03 · Mandap East',
  'Table 04 · Mandap West',
  'Table 05 · Courtyard',
  'Table 06 · Sangeet Lounge',
];

interface RsvpManagerProps {
  guests: GuestRsvpRecord[];
  metrics: RsvpSummaryMetrics;
  onAddGuest: (newGuest: GuestRsvpRecord) => void;
  onUpdateGuestStatus: (guestId: string, status: RsvpStatus) => void;
  onUpdateGuestTable: (guestId: string, tableNumber: string) => void;
}

export default function RsvpManager({
  guests,
  metrics,
  onAddGuest,
  onUpdateGuestStatus,
  onUpdateGuestTable,
}: RsvpManagerProps) {
  // Roster filter states
  const [statusFilter, setStatusFilter] = useState<'all' | RsvpStatus>('all');
  const [eventFilter, setEventFilter] = useState<'all' | WeddingEventName>('all');
  const [sideFilter, setSideFilter] = useState<'all' | GuestRsvpRecord['side']>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // New Guest RSVP Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [side, setSide] = useState<GuestRsvpRecord['side']>('Bride Family');
  const [status, setStatus] = useState<RsvpStatus>('attending');
  const [partySize, setPartySize] = useState<number>(2);
  const [selectedEvents, setSelectedEvents] = useState<WeddingEventName[]>([
    'Muhurtham Ceremony',
    'Grand Reception',
  ]);
  const [dietary, setDietary] = useState<DietaryPreference>('South Indian Traditional');
  const [tableNumber, setTableNumber] = useState<string>('Table 04 · Mandap West');
  const [songRequest, setSongRequest] = useState('');
  const [notes, setNotes] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);

  const filteredGuests = filterGuests(guests, {
    status: statusFilter,
    event: eventFilter,
    side: sideFilter,
    searchQuery,
  });

  const handleToggleEventSelection = (eventName: WeddingEventName) => {
    setSelectedEvents((prev) =>
      prev.includes(eventName)
        ? prev.filter((ev) => ev !== eventName)
        : [...prev, eventName]
    );
    if (formErrors.events) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next.events;
        return next;
      });
    }
  };

  const handleSubmitRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionSuccess(null);

    const validation = validateGuestRsvpInput({
      fullName,
      email,
      phone,
      side,
      status,
      partySize,
      events: status === 'declined' ? [] : selectedEvents,
      dietary,
      tableNumber,
      songRequest,
      notes,
    });

    if (!validation.valid) {
      setFormErrors(validation.errors);
      return;
    }

    const newRecord: GuestRsvpRecord = {
      id: `g-${Date.now()}`,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      side,
      status,
      partySize: Number(partySize),
      events: status === 'declined' ? [] : selectedEvents,
      dietary,
      tableNumber: status === 'declined' ? 'Unassigned' : tableNumber,
      songRequest: songRequest.trim() || undefined,
      notes: notes.trim() || undefined,
      updatedAt: 'Just now',
    };

    onAddGuest(newRecord);
    setFormErrors({});
    setSubmissionSuccess(
      `RSVP recorded for ${newRecord.fullName} (Party of ${newRecord.partySize}). Live headcounts updated.`
    );

    // Reset text fields for next entry
    setFullName('');
    setEmail('');
    setPhone('');
    setPartySize(2);
    setSongRequest('');
    setNotes('');
  };

  const handleExportCsv = () => {
    const headers = [
      'Guest Name',
      'Side',
      'Status',
      'Party Size',
      'Events Attending',
      'Dietary Preference',
      'Table Assignment',
      'Phone',
      'Email',
    ];
    const rows = filteredGuests.map((g) => [
      `"${g.fullName.replace(/"/g, '""')}"`,
      `"${g.side}"`,
      `"${g.status}"`,
      String(g.partySize),
      `"${g.events.join('; ')}"`,
      `"${g.dietary}"`,
      `"${g.tableNumber}"`,
      `"${g.phone}"`,
      `"${g.email}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wedraaga-guest-rsvp-registry.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="rsvp-studio"
      className="py-16 lg:py-24 border-b border-[#E7E2DA] bg-[#F3EFEA]/50"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#E7E2DA]">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-medium text-[#8C2D38]">
              04. Integrated Guest RSVP & Seating Registry
            </div>
            <h2
              className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#1C1917] tracking-tight leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              Multi-event guest tracking, dietary counts, and VIP table assignment.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#1C1917] bg-white border border-[#E7E2DA] rounded-lg hover:bg-[#FAF8F5] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-[#8C2D38]" />
              <span>Download CSV ({filteredGuests.length})</span>
            </button>
          </div>
        </div>

        {/* Quantitative RSVP Summary Bar */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl border border-[#E7E2DA] p-5">
            <div className="text-xs text-[#57534E]">Confirmed Attendance</div>
            <div
              data-testid="rsvp-confirmed-headcount"
              className="mt-1 font-[family-name:var(--font-mono)] tabular-nums text-2xl sm:text-3xl font-semibold text-[#8C2D38]"
            >
              {metrics.confirmedHeadcount} Guests
            </div>
            <div className="mt-1 text-xs text-[#57534E] font-[family-name:var(--font-mono)] tabular-nums">
              {metrics.attendanceRatePercent}% response rate · {metrics.totalInvitedHeadcount}{' '}
              invited
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E7E2DA] p-5">
            <div className="text-xs text-[#57534E]">Awaiting Response / Declined</div>
            <div
              data-testid="rsvp-pending-headcount"
              className="mt-1 font-[family-name:var(--font-mono)] tabular-nums text-2xl sm:text-3xl font-semibold text-[#1C1917]"
            >
              {metrics.pendingHeadcount} Pending
            </div>
            <div className="mt-1 text-xs text-[#57534E] font-[family-name:var(--font-mono)] tabular-nums">
              {metrics.declinedHeadcount} declined · {metrics.assignedTablesCount} active VIP tables
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E7E2DA] p-5">
            <div className="text-xs text-[#57534E]">Ceremony Headcounts</div>
            <div className="mt-2 space-y-1 text-xs font-[family-name:var(--font-mono)] tabular-nums">
              <div className="flex justify-between">
                <span className="font-sans text-[#57534E]">Muhurtham:</span>
                <span className="font-medium text-[#1C1917]">
                  {metrics.eventHeadcounts['Muhurtham Ceremony']}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-[#57534E]">Grand Reception:</span>
                <span className="font-medium text-[#1C1917]">
                  {metrics.eventHeadcounts['Grand Reception']}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-[#57534E]">Sangeet / Haldi:</span>
                <span className="font-medium text-[#1C1917]">
                  {metrics.eventHeadcounts['Sangeet Soirée']} /{' '}
                  {metrics.eventHeadcounts['Haldi & Mehendi']}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E7E2DA] p-5">
            <div className="text-xs text-[#57534E]">Catering Dietary Split</div>
            <div className="mt-2 space-y-1 text-xs font-[family-name:var(--font-mono)] tabular-nums">
              <div className="flex justify-between">
                <span className="font-sans text-[#57534E]">South Indian Leaf:</span>
                <span className="font-medium text-[#1C1917]">
                  {metrics.dietaryHeadcounts['South Indian Traditional']}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-[#57534E]">Pure Veg / Jain:</span>
                <span className="font-medium text-[#1C1917]">
                  {metrics.dietaryHeadcounts['Pure Vegetarian']} /{' '}
                  {metrics.dietaryHeadcounts['Jain Vegetarian']}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-[#57534E]">Continental Fusion:</span>
                <span className="font-medium text-[#1C1917]">
                  {metrics.dietaryHeadcounts['Continental & Fusion']}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main 2-Column RSVP Layout: Guest Roster (Left 7 cols) + Register RSVP Form (Right 5 cols) */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Live Filterable Guest Roster */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E7E2DA] overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-[#E7E2DA] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1C1917]">
                  Guest Household Roster ({filteredGuests.length})
                </h3>
                <span className="text-xs text-[#57534E]">
                  Update status or table assignment inline
                </span>
              </div>

              {/* Filter Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="relative sm:col-span-1">
                  <Search className="w-3.5 h-3.5 text-[#57534E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="search"
                    aria-label="Search guests by name, phone, or table"
                    placeholder="Search guest or table..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-7 py-2 text-xs bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-[#1C1917] placeholder:text-[#57534E]/70 focus:outline-none focus:border-[#8C2D38]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      aria-label="Clear guest search"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[#57534E]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <select
                  aria-label="Filter guests by RSVP status"
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as 'all' | RsvpStatus)
                  }
                  className="px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#8C2D38]"
                >
                  <option value="all">All Statuses</option>
                  <option value="attending">Attending Only</option>
                  <option value="pending">Awaiting Response</option>
                  <option value="declined">Declined</option>
                </select>

                <select
                  aria-label="Filter guests by ceremony event"
                  value={eventFilter}
                  onChange={(e) =>
                    setEventFilter(e.target.value as 'all' | WeddingEventName)
                  }
                  className="px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#8C2D38]"
                >
                  <option value="all">All Ceremonies</option>
                  {ALL_EVENTS.map((ev) => (
                    <option key={ev} value={ev}>
                      {ev}
                    </option>
                  ))}
                </select>
              </div>

              {/* Side Filter Segmented Bar */}
              <div className="flex items-center gap-1 overflow-x-auto">
                {(['all', 'Bride Family', 'Groom Family', 'Mutual Friends'] as const).map(
                  (s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSideFilter(s)}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        sideFilter === s
                          ? 'bg-[#1C1917] text-white'
                          : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      {s === 'all' ? 'All Sides' : s}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Guest Rows */}
            <div className="divide-y divide-[#E7E2DA] max-h-[680px] overflow-y-auto">
              {filteredGuests.length === 0 ? (
                <div className="p-10 text-center space-y-2">
                  <p className="text-sm font-medium text-[#1C1917]">
                    No guest records match these filter criteria.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatusFilter('all');
                      setEventFilter('all');
                      setSideFilter('all');
                      setSearchQuery('');
                    }}
                    className="text-xs font-medium text-[#8C2D38] underline cursor-pointer"
                  >
                    Reset guest filters
                  </button>
                </div>
              ) : (
                filteredGuests.map((guest) => (
                  <div
                    key={guest.id}
                    className="p-4 sm:p-5 hover:bg-[#FAF8F5]/60 transition-colors space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-semibold text-[#1C1917]">
                          {guest.fullName}
                        </h4>
                        {/* Unboxed metadata line */}
                        <div className="text-xs text-[#57534E] mt-0.5">
                          <span>{guest.side}</span>
                          <span className="mx-1.5" aria-hidden="true">
                            ·
                          </span>
                          <span className="font-[family-name:var(--font-mono)] tabular-nums font-medium text-[#1C1917]">
                            Party of {guest.partySize}
                          </span>
                          <span className="mx-1.5" aria-hidden="true">
                            ·
                          </span>
                          <span>{guest.dietary}</span>
                          <span className="mx-1.5" aria-hidden="true">
                            ·
                          </span>
                          <span>{guest.phone}</span>
                        </div>
                      </div>

                      {/* Interactive Status Switcher */}
                      <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-lg border border-[#E7E2DA] self-start shrink-0">
                        {(['attending', 'pending', 'declined'] as RsvpStatus[]).map(
                          (st) => {
                            const active = guest.status === st;
                            return (
                              <button
                                key={st}
                                type="button"
                                onClick={() => onUpdateGuestStatus(guest.id, st)}
                                className={`px-2.5 py-1 text-[11px] font-medium rounded-md capitalize transition-colors cursor-pointer ${
                                  active
                                    ? st === 'attending'
                                      ? 'bg-[#8C2D38] text-white'
                                      : st === 'pending'
                                      ? 'bg-[#1C1917] text-white'
                                      : 'bg-[#57534E] text-white'
                                    : 'text-[#57534E] hover:text-[#1C1917]'
                                }`}
                              >
                                {st}
                              </button>
                            );
                          }
                        )}
                      </div>
                    </div>

                    {/* Ceremonies & Table Assignment Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs">
                      <div className="text-[#57534E]">
                        <span className="font-medium text-[#1C1917]">Ceremonies: </span>
                        {guest.events.length > 0
                          ? guest.events.join(' · ')
                          : 'Not attending ceremonies'}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <label
                          htmlFor={`table-select-${guest.id}`}
                          className="text-[11px] text-[#57534E]"
                        >
                          Seating:
                        </label>
                        <select
                          id={`table-select-${guest.id}`}
                          value={guest.tableNumber}
                          onChange={(e) =>
                            onUpdateGuestTable(guest.id, e.target.value)
                          }
                          className="px-2.5 py-1 text-xs bg-white border border-[#E7E2DA] rounded-md text-[#1C1917] focus:outline-none focus:border-[#8C2D38]"
                        >
                          {TABLE_OPTIONS.map((tb) => (
                            <option key={tb} value={tb}>
                              {tb}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {(guest.notes || guest.songRequest) && (
                      <div className="text-[11px] text-[#57534E] pt-0.5">
                        {guest.notes && <span>Note: {guest.notes}</span>}
                        {guest.notes && guest.songRequest && (
                          <span className="mx-1.5" aria-hidden="true">
                            ·
                          </span>
                        )}
                        {guest.songRequest && (
                          <span>Sangeet Song: “{guest.songRequest}”</span>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right 5 Columns: Register New Guest RSVP Form */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E7E2DA] p-6 sm:p-8">
            <div className="pb-4 border-b border-[#E7E2DA] space-y-1">
              <div className="text-xs font-medium text-[#8C2D38]">
                Digital Invitation Response
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1C1917]">
                Register Guest RSVP
              </h3>
              <p className="text-xs text-[#57534E]">
                Add a family or guest response to immediately update banquet & seating counts
              </p>
            </div>

            {submissionSuccess && (
              <div
                role="status"
                data-testid="rsvp-success-banner"
                className="mt-4 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#8C2D38] text-xs text-[#1C1917] flex items-start gap-2.5"
              >
                <Check className="w-4 h-4 text-[#8C2D38] shrink-0 mt-0.5" />
                <span>{submissionSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSubmitRsvp} noValidate className="mt-5 space-y-4">
              {/* Guest / Family Full Name */}
              <div>
                <label
                  htmlFor="rsvp-full-name"
                  className="block text-xs font-medium text-[#1C1917] mb-1"
                >
                  Guest or Family Name *
                </label>
                <input
                  id="rsvp-full-name"
                  type="text"
                  required
                  placeholder="e.g., Dr. Venkat & Padma Rao"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (formErrors.fullName) {
                      setFormErrors((prev) => ({ ...prev, fullName: '' }));
                    }
                  }}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#8C2D38]"
                />
                {formErrors.fullName && (
                  <p role="alert" className="text-xs text-[#B91C1C] mt-1">
                    {formErrors.fullName}
                  </p>
                )}
              </div>

              {/* Email & Phone in 2-col row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="rsvp-email"
                    className="block text-xs font-medium text-[#1C1917] mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    id="rsvp-email"
                    type="email"
                    required
                    placeholder="guest@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (formErrors.email) {
                        setFormErrors((prev) => ({ ...prev, email: '' }));
                      }
                    }}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#8C2D38]"
                  />
                  {formErrors.email && (
                    <p role="alert" className="text-xs text-[#B91C1C] mt-1">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="rsvp-phone"
                    className="block text-xs font-medium text-[#1C1917] mb-1"
                  >
                    WhatsApp / Phone *
                  </label>
                  <input
                    id="rsvp-phone"
                    type="tel"
                    required
                    placeholder="+91 98480 12345"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (formErrors.phone) {
                        setFormErrors((prev) => ({ ...prev, phone: '' }));
                      }
                    }}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#8C2D38]"
                  />
                  {formErrors.phone && (
                    <p role="alert" className="text-xs text-[#B91C1C] mt-1">
                      {formErrors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Side, RSVP Status & Party Size */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label
                    htmlFor="rsvp-side"
                    className="block text-xs font-medium text-[#1C1917] mb-1"
                  >
                    Family Side
                  </label>
                  <select
                    id="rsvp-side"
                    value={side}
                    onChange={(e) =>
                      setSide(e.target.value as GuestRsvpRecord['side'])
                    }
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-[#1C1917]"
                  >
                    <option value="Bride Family">Bride Family</option>
                    <option value="Groom Family">Groom Family</option>
                    <option value="Mutual Friends">Mutual Friends</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="rsvp-status"
                    className="block text-xs font-medium text-[#1C1917] mb-1"
                  >
                    Response
                  </label>
                  <select
                    id="rsvp-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as RsvpStatus)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-[#1C1917]"
                  >
                    <option value="attending">Attending</option>
                    <option value="pending">Pending Reply</option>
                    <option value="declined">Declining</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="rsvp-party-size"
                    className="block text-xs font-medium text-[#1C1917] mb-1"
                  >
                    Party Headcount
                  </label>
                  <input
                    id="rsvp-party-size"
                    type="number"
                    min={1}
                    max={15}
                    value={partySize}
                    onChange={(e) => setPartySize(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-[family-name:var(--font-mono)] tabular-nums bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-[#1C1917]"
                  />
                </div>
              </div>

              {/* Ceremonies Attending Checkboxes */}
              {status !== 'declined' && (
                <div>
                  <span className="block text-xs font-medium text-[#1C1917] mb-1.5">
                    Ceremonies Attending *
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {ALL_EVENTS.map((ev) => {
                      const checked = selectedEvents.includes(ev);
                      return (
                        <label
                          key={ev}
                          className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                            checked
                              ? 'bg-[#FAF8F5] border-[#8C2D38] text-[#1C1917] font-medium'
                              : 'bg-white border-[#E7E2DA] text-[#57534E]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleToggleEventSelection(ev)}
                            className="accent-[#8C2D38]"
                          />
                          <span className="truncate">{ev}</span>
                        </label>
                      );
                    })}
                  </div>
                  {formErrors.events && (
                    <p role="alert" className="text-xs text-[#B91C1C] mt-1">
                      {formErrors.events}
                    </p>
                  )}
                </div>
              )}

              {/* Dietary Preference & Table Assignment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="rsvp-dietary"
                    className="block text-xs font-medium text-[#1C1917] mb-1"
                  >
                    Dietary Preference
                  </label>
                  <select
                    id="rsvp-dietary"
                    value={dietary}
                    onChange={(e) =>
                      setDietary(e.target.value as DietaryPreference)
                    }
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-[#1C1917]"
                  >
                    <option value="South Indian Traditional">
                      South Indian Traditional
                    </option>
                    <option value="Pure Vegetarian">Pure Vegetarian</option>
                    <option value="Jain Vegetarian">Jain Vegetarian</option>
                    <option value="Continental & Fusion">
                      Continental & Fusion
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="rsvp-table"
                    className="block text-xs font-medium text-[#1C1917] mb-1"
                  >
                    Table Assignment
                  </label>
                  <select
                    id="rsvp-table"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-[#1C1917]"
                  >
                    {TABLE_OPTIONS.map((tb) => (
                      <option key={tb} value={tb}>
                        {tb}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Optional Hospitality / Song Request */}
              <div>
                <label
                  htmlFor="rsvp-notes"
                  className="block text-xs font-medium text-[#1C1917] mb-1"
                >
                  Hospitality Notes or Sangeet Song Request (Optional)
                </label>
                <input
                  id="rsvp-notes"
                  type="text"
                  placeholder="e.g., Arriving Friday 8 AM; requests classical flute welcome"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#8C2D38]"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium text-white bg-[#8C2D38] rounded-lg hover:bg-[#73222C] transition-colors cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Confirm & Add Guest RSVP</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
