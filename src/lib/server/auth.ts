import { headers } from "next/headers";

// In production, replace with Supabase Auth JWT verification at the edge/BFF layer.
export async function getRequestUserId() {
  const h = await headers();
  const devUser = h.get("x-ideaos-user-id");
  if (devUser) {
    return devUser;
  }

  const fallback = process.env.IDEAOS_DEV_USER_ID;
  if (fallback) {
    return fallback;
  }

  throw new Error("Missing user identity. Set x-ideaos-user-id header or IDEAOS_DEV_USER_ID.");
}

