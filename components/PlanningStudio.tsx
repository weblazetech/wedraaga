'use client';

import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus } from 'lucide-react';
import {
  INITIAL_PLANNING_TASKS,
  PlanningTask,
  WEDRAAGA_VENUES,
} from '@/lib/wedding-data';
import {
  BudgetEstimateInput,
  calculateChecklistProgress,
  calculateWeddingBudgetEstimate,
  formatInr,
} from '@/lib/wedding-logic';

interface PlanningStudioProps {
  selectedVenueId: string;
  onSelectVenueId: (id: string) => void;
}

const PHASES: Array<'All Phases' | PlanningTask['phase']> = [
  'All Phases',
  '12–9 Months Out',
  '8–4 Months Out',
  '3–1 Months Out',
  'Wedding Week',
];

export default function PlanningStudio({
  selectedVenueId,
  onSelectVenueId,
}: PlanningStudioProps) {
  // Checklist state
  const [tasks, setTasks] = useState<PlanningTask[]>(INITIAL_PLANNING_TASKS);
  const [activePhase, setActivePhase] = useState<'All Phases' | PlanningTask['phase']>(
    'All Phases'
  );
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] =
    useState<PlanningTask['category']>('Venue & Catering');
  const [newTaskBudget, setNewTaskBudget] = useState('50000');
  const [taskError, setTaskError] = useState('');

  // Budget Estimator state
  const [guestCount, setGuestCount] = useState<number>(650);
  const [eventsCount, setEventsCount] = useState<number>(3);
  const [decorTier, setDecorTier] =
    useState<BudgetEstimateInput['decorTier']>('Royal Heritage Mandap');
  const [photographyTier, setPhotographyTier] =
    useState<BudgetEstimateInput['photographyTier']>('Editorial + Cinema');

  const selectedVenue =
    WEDRAAGA_VENUES.find((v) => v.id === selectedVenueId) ?? WEDRAAGA_VENUES[0];

  const budgetEstimate = calculateWeddingBudgetEstimate({
    venue: selectedVenue,
    guestCount,
    eventsCount,
    decorTier,
    photographyTier,
  });

  const checklistProgress = calculateChecklistProgress(tasks);

  const visibleTasks =
    activePhase === 'All Phases'
      ? tasks
      : tasks.filter((t) => t.phase === activePhase);

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle || newTaskTitle.trim().length < 3) {
      setTaskError('Please enter a milestone task description (at least 3 characters).');
      return;
    }
    const parsedBudget = Number(newTaskBudget) || 0;
    const newTask: PlanningTask = {
      id: `t-custom-${Date.now()}`,
      phase: activePhase === 'All Phases' ? '3–1 Months Out' : activePhase,
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      completed: false,
      dueLabel: 'Added Today',
      estimatedBudgetInr: Math.max(0, parsedBudget),
    };
    setTasks((prev) => [newTask, ...prev]);
    setNewTaskTitle('');
    setTaskError('');
  };

  return (
    <section
      id="planning-studio"
      className="py-16 lg:py-24 border-b border-[#E7E2DA] bg-[#FAF8F5]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E7E2DA]">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-medium text-[#8C2D38]">
              03. Interactive Wedding Planning & Investment Studio
            </div>
            <h2
              className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#1C1917] tracking-tight leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              Milestone roadmap and real-time Hyderabad venue investment calculator.
            </h2>
          </div>
          <p className="text-sm sm:text-[15px] text-[#57534E] max-w-md leading-relaxed">
            Inspired by structured planning workflows from Planning.Wedding, Zola, and The Knot,
            tailored specifically for Indian multi-event celebrations.
          </p>
        </div>

        {/* 2-Column Studio Workspace */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column (7 cols): Interactive Wedding Checklist */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E7E2DA] p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E7E2DA]">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1C1917]">
                  Wedding Production Checklist
                </h3>
                <p className="text-xs text-[#57534E] mt-0.5">
                  Track every ritual milestone from Muhurtham booking to return hampers
                </p>
              </div>
              <div className="text-right">
                <div
                  data-testid="checklist-progress-label"
                  className="font-[family-name:var(--font-mono)] tabular-nums text-lg font-semibold text-[#8C2D38]"
                >
                  {checklistProgress.completedCount} / {checklistProgress.totalCount} Completed (
                  {checklistProgress.percentComplete}%)
                </div>
                <div className="text-[11px] text-[#57534E] font-[family-name:var(--font-mono)] tabular-nums">
                  {formatInr(checklistProgress.completedBudgetInr)} of{' '}
                  {formatInr(checklistProgress.allocatedBudgetInr)} locked
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-[#F3EFEA] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#8C2D38] transition-all duration-300"
                style={{ width: `${checklistProgress.percentComplete}%` }}
              />
            </div>

            {/* Phase Filter Tabs */}
            <div
              role="tablist"
              aria-label="Planning Checklist Phases"
              className="flex items-center gap-1 overflow-x-auto pb-1"
            >
              {PHASES.map((phase) => {
                const isActive = activePhase === phase;
                return (
                  <button
                    key={phase}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => setActivePhase(phase)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#1C1917] text-white'
                        : 'bg-[#FAF8F5] text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    {phase}
                  </button>
                );
              })}
            </div>

            {/* Add Custom Milestone Form */}
            <form onSubmit={handleAddTask} className="space-y-2 pt-1">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  aria-label="New wedding milestone task title"
                  placeholder="Add a custom planning task (e.g., Book Sangeet Dhol Artists)..."
                  value={newTaskTitle}
                  onChange={(e) => {
                    setNewTaskTitle(e.target.value);
                    if (taskError) setTaskError('');
                  }}
                  className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-[#1C1917] placeholder:text-[#57534E]/70 focus:outline-none focus:border-[#8C2D38]"
                />
                <select
                  aria-label="Task category"
                  value={newTaskCategory}
                  onChange={(e) =>
                    setNewTaskCategory(e.target.value as PlanningTask['category'])
                  }
                  className="px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#8C2D38]"
                >
                  <option value="Venue & Catering">Venue & Catering</option>
                  <option value="Photography & Decor">Photography & Decor</option>
                  <option value="Attire & Beauty">Attire & Beauty</option>
                  <option value="Guest & Rituals">Guest & Rituals</option>
                </select>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#8C2D38] rounded-lg hover:bg-[#73222C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Task</span>
                </button>
              </div>
              {taskError && (
                <p role="alert" className="text-xs text-[#B91C1C]">
                  {taskError}
                </p>
              )}
            </form>

            {/* Task List */}
            <div className="divide-y divide-[#E7E2DA]">
              {visibleTasks.map((task) => (
                <div
                  key={task.id}
                  className="py-3.5 flex items-start justify-between gap-4 group"
                >
                  <button
                    type="button"
                    onClick={() => handleToggleTask(task.id)}
                    aria-label={`Mark "${task.title}" as ${
                      task.completed ? 'incomplete' : 'completed'
                    }`}
                    className="flex items-start gap-3 text-left cursor-pointer flex-1"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-[#8C2D38] shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#57534E] group-hover:text-[#1C1917] shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <p
                        className={`text-sm font-medium transition-colors ${
                          task.completed
                            ? 'line-through text-[#57534E]'
                            : 'text-[#1C1917]'
                        }`}
                      >
                        {task.title}
                      </p>
                      <div className="text-xs text-[#57534E]">
                        <span>{task.phase}</span>
                        <span className="mx-1.5" aria-hidden="true">
                          ·
                        </span>
                        <span>{task.category}</span>
                        <span className="mx-1.5" aria-hidden="true">
                          ·
                        </span>
                        <span>{task.dueLabel}</span>
                      </div>
                    </div>
                  </button>

                  <div className="font-[family-name:var(--font-mono)] tabular-nums text-xs font-medium text-[#57534E] shrink-0 pt-0.5">
                    {formatInr(task.estimatedBudgetInr)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Interactive Venue & Celebration Budget Estimator */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E7E2DA] p-6 sm:p-8 space-y-6">
            <div className="pb-4 border-b border-[#E7E2DA]">
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1C1917]">
                Celebration Investment Estimator
              </h3>
              <p className="text-xs text-[#57534E] mt-0.5">
                Configure your preferred WedRaaga convention, guest count, and production tiers
              </p>
            </div>

            <div className="space-y-4">
              {/* Venue Selector */}
              <div>
                <label
                  htmlFor="estimator-venue-select"
                  className="block text-xs font-medium text-[#1C1917] mb-1.5"
                >
                  Selected WedRaaga Venue
                </label>
                <select
                  id="estimator-venue-select"
                  value={selectedVenue.id}
                  onChange={(e) => onSelectVenueId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#8C2D38]"
                >
                  {WEDRAAGA_VENUES.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.area}) — {formatInr(v.perPlateInr)}/plate
                    </option>
                  ))}
                </select>
              </div>

              {/* Guest Count Range Slider & Number Display */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <label htmlFor="estimator-guest-range" className="font-medium text-[#1C1917]">
                    Estimated Guest Headcount
                  </label>
                  <span className="font-[family-name:var(--font-mono)] tabular-nums font-semibold text-[#8C2D38]">
                    {guestCount} Guests
                  </span>
                </div>
                <input
                  id="estimator-guest-range"
                  type="range"
                  min={150}
                  max={2500}
                  step={50}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-[#8C2D38] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#57534E] font-[family-name:var(--font-mono)] tabular-nums mt-1">
                  <span>150 Guests</span>
                  <span>1,200 Guests</span>
                  <span>2,500 Guests</span>
                </div>
              </div>

              {/* Number of Celebration Events */}
              <div>
                <span className="block text-xs font-medium text-[#1C1917] mb-1.5">
                  Number of Celebration Functions
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setEventsCount(num)}
                      className={`py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer font-[family-name:var(--font-mono)] tabular-nums ${
                        eventsCount === num
                          ? 'bg-[#8C2D38] text-white border-[#8C2D38]'
                          : 'bg-[#FAF8F5] text-[#1C1917] border-[#E7E2DA] hover:bg-[#F3EFEA]'
                      }`}
                    >
                      {num} {num === 1 ? 'Event' : 'Events'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Floral & Mandap Architecture Tier */}
              <div>
                <label
                  htmlFor="estimator-decor-tier"
                  className="block text-xs font-medium text-[#1C1917] mb-1.5"
                >
                  Mandap & Floral Decor Tier
                </label>
                <select
                  id="estimator-decor-tier"
                  value={decorTier}
                  onChange={(e) =>
                    setDecorTier(e.target.value as BudgetEstimateInput['decorTier'])
                  }
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#8C2D38]"
                >
                  <option value="Minimalist Floral">Minimalist Floral (₹2,20,000)</option>
                  <option value="Royal Heritage Mandap">
                    Royal Heritage Mandap (₹4,20,000)
                  </option>
                  <option value="Bespoke Architectural">
                    Bespoke Architectural Production (₹7,50,000)
                  </option>
                </select>
              </div>

              {/* Photography & Cinema Tier */}
              <div>
                <label
                  htmlFor="estimator-photo-tier"
                  className="block text-xs font-medium text-[#1C1917] mb-1.5"
                >
                  Photography & Cinematography Tier
                </label>
                <select
                  id="estimator-photo-tier"
                  value={photographyTier}
                  onChange={(e) =>
                    setPhotographyTier(
                      e.target.value as BudgetEstimateInput['photographyTier']
                    )
                  }
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#8C2D38]"
                >
                  <option value="Candid Essential">Candid Essential (₹1,60,000)</option>
                  <option value="Editorial + Cinema">Editorial + Cinema (₹2,90,000)</option>
                  <option value="Multi-Day Luxury">Multi-Day Luxury Crew (₹4,60,000)</option>
                </select>
              </div>
            </div>

            {/* Itemized Breakdown Output */}
            <div className="pt-4 border-t border-[#E7E2DA] space-y-2.5 text-xs">
              <div className="flex justify-between text-[#57534E]">
                <span>Venue Hall & Lawn Rental ({eventsCount} events)</span>
                <span className="font-[family-name:var(--font-mono)] tabular-nums text-[#1C1917]">
                  {formatInr(budgetEstimate.venueRentalInr)}
                </span>
              </div>
              <div className="flex justify-between text-[#57534E]">
                <span>Multi-Event Culinary & Banquet Catering</span>
                <span className="font-[family-name:var(--font-mono)] tabular-nums text-[#1C1917]">
                  {formatInr(budgetEstimate.cateringTotalInr)}
                </span>
              </div>
              <div className="flex justify-between text-[#57534E]">
                <span>Mandap & Floral Decor ({decorTier})</span>
                <span className="font-[family-name:var(--font-mono)] tabular-nums text-[#1C1917]">
                  {formatInr(budgetEstimate.decorTotalInr)}
                </span>
              </div>
              <div className="flex justify-between text-[#57534E]">
                <span>Photography & Cinema ({photographyTier})</span>
                <span className="font-[family-name:var(--font-mono)] tabular-nums text-[#1C1917]">
                  {formatInr(budgetEstimate.photographyTotalInr)}
                </span>
              </div>
              <div className="flex justify-between text-[#57534E]">
                <span>Hospitality, Valet & Logistics (8%)</span>
                <span className="font-[family-name:var(--font-mono)] tabular-nums text-[#1C1917]">
                  {formatInr(budgetEstimate.hospitalityReserveInr)}
                </span>
              </div>

              <div className="pt-3 border-t border-[#E7E2DA] flex items-baseline justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#1C1917]">
                    Estimated Total Investment
                  </div>
                  <div className="text-[11px] text-[#57534E] font-[family-name:var(--font-mono)] tabular-nums">
                    Approx. {formatInr(budgetEstimate.perGuestInr)} per guest
                  </div>
                </div>
                <div
                  data-testid="budget-grand-total"
                  className="font-[family-name:var(--font-mono)] tabular-nums text-xl sm:text-2xl font-semibold text-[#8C2D38]"
                >
                  {formatInr(budgetEstimate.grandTotalInr)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
