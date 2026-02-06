import { z } from "zod";

export const phaseSchema = z.enum([
  "extract",
  "interrogate",
  "ground",
  "plan",
  "build",
]);

export type Phase = z.infer<typeof phaseSchema>;

export const phaseStatusSchema = z.enum(["idle", "running", "blocked", "done"]);
export type PhaseStatus = z.infer<typeof phaseStatusSchema>;

export const ideaStatusSchema = z.enum(["draft", "active", "paused", "completed"]);
export type IdeaStatus = z.infer<typeof ideaStatusSchema>;

export const ideaSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200),
  summary: z.string().default(""),
  status: ideaStatusSchema.default("draft"),
  currentPhase: phaseSchema.default("extract"),
  ownerId: z.string().uuid(),
  metadata: z.record(z.string(), z.unknown()).default({}),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Idea = z.infer<typeof ideaSchema>;

export const createIdeaSchema = z.object({
  title: z.string().min(3).max(200),
  summary: z.string().max(1200).optional(),
});

export const patchIdeaSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  summary: z.string().max(1200).optional(),
  status: ideaStatusSchema.optional(),
  currentPhase: phaseSchema.optional(),
});

export const assumptionStatusSchema = z.enum([
  "open",
  "validated",
  "invalidated",
]);
export type AssumptionStatus = z.infer<typeof assumptionStatusSchema>;

export const assumptionSchema = z.object({
  id: z.string().uuid(),
  ideaId: z.string().uuid(),
  text: z.string().min(1),
  confidence: z.number().min(0).max(1),
  status: assumptionStatusSchema.default("open"),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const evidenceSchema = z.object({
  id: z.string().uuid(),
  ideaId: z.string().uuid(),
  sourceType: z.enum(["web", "pdf", "note", "link"]),
  claim: z.string(),
  citation: z.string().default(""),
  relevanceScore: z.number().min(0).max(1),
  createdAt: z.string(),
});

export const decisionSchema = z.object({
  id: z.string().uuid(),
  ideaId: z.string().uuid(),
  decision: z.string(),
  rationale: z.string().default(""),
  alternatives: z.array(z.string()).default([]),
  createdAt: z.string(),
});

export const phaseRunSchema = z.object({
  id: z.string().uuid(),
  ideaId: z.string().uuid(),
  phase: phaseSchema,
  status: phaseStatusSchema,
  startedAt: z.string().nullable(),
  completedAt: z.string().nullable(),
  error: z.string().nullable(),
  output: z.record(z.string(), z.unknown()).default({}),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const activityLaneSchema = z.enum([
  "search",
  "analyze",
  "organize",
  "decide",
  "output",
]);
export type ActivityLane = z.infer<typeof activityLaneSchema>;

export const activityItemSchema = z.object({
  id: z.string().uuid(),
  ideaId: z.string().uuid(),
  phaseRunId: z.string().uuid().nullable(),
  lane: activityLaneSchema,
  message: z.string(),
  payload: z.record(z.string(), z.unknown()).default({}),
  createdAt: z.string(),
});

export const runPhaseRequestSchema = z.object({
  contextDelta: z.record(z.string(), z.unknown()).optional(),
});

export const apiErrorSchema = z.object({
  error: z.string(),
  details: z.string().optional(),
});

export type ApiError = z.infer<typeof apiErrorSchema>;

