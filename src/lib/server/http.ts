import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

export function fail(error: string, status = 400, details?: string) {
  return NextResponse.json({ error, details }, { status });
}

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return fail("Validation error", 422, error.issues.map((i) => i.message).join(", "));
  }
  if (error instanceof Error) {
    return fail("Server error", 500, error.message);
  }
  return fail("Unexpected error", 500);
}

