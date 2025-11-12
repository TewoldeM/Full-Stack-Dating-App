"use server";

import { UserProfile, UserPreferences } from "@/app/profile/page";
import { createClient } from "../supabase/server";

export async function getPotentialMatches(): Promise<UserProfile[]> {
  const supabase = await createClient();

  // 1️⃣ Check user authentication
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  console.log("🔹 Authenticated user:", user);
  if (userError) console.error("❌ getUser error:", userError);
  if (!user) throw new Error("Not authenticated.");

  // 2️⃣ Fetch all other users
  const { data: potentialMatches, error } = await supabase
    .from("users")
    .select("*")
    .neq("id", user.id)
    .limit(50);

  console.log("🔹 Potential matches from DB:", potentialMatches?.length);
  if (error) {
    console.error("❌ Failed to fetch potential matches:", error);
    throw new Error("failed to fetch potential matches");
  }

  // 3️⃣ Fetch current user preferences
  const { data: userPrefs, error: prefsError } = await supabase
    .from("users")
    .select("preferences")
    .eq("id", user.id)
    .single();

  console.log("🔹 User preferences:", userPrefs);
  if (prefsError) {
    console.error("❌ Failed to get user preferences:", prefsError);
    throw new Error("Failed to get user preferences");
  }

  // 4️⃣ Filter matches
  const currentUserPrefs = userPrefs.preferences as UserPreferences;
  const genderPreference = currentUserPrefs?.gender_preference || [];
  console.log("🔹 Gender preference:", genderPreference);

  const filteredMatches =
    potentialMatches?.filter((match) => {
      if (!genderPreference || genderPreference.length === 0) return true;
      return genderPreference.includes(match.gender);
    }) ?? [];

  console.log("🔹 Filtered matches count:", filteredMatches.length);

  // 5️⃣ Map and return
  const finalMatches = filteredMatches.map((match) => ({
    id: match.id,
    full_name: match.full_name,
    username: match.username,
    email: "",
    gender: match.gender,
    birthdate: match.birthdate,
    bio: match.bio,
    avatar_url: match.avatar_url,
    preferences: match.preferences,
    location_lat: undefined,
    location_lng: undefined,
    last_active: new Date().toISOString(),
    is_verified: true,
    is_online: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));

  console.log("✅ Returning matches:", finalMatches.length);
  return finalMatches;
}

export async function likeUser(toUserId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  const { error: likeError } = await supabase.from("likes").insert({
    from_user_id: user.id,
    to_user_id: toUserId,
  });

  if (likeError) {
    throw new Error("Failed to create like");
  }

  const { data: existingLike, error: checkError } = await supabase
    .from("likes")
    .select("*")
    .eq("from_user_id", toUserId)
    .eq("to_user_id", user.id)
    .single();

  if (checkError && checkError.code !== "PGRST116") {
    throw new Error("Failed to check for match");
  }

  if (existingLike) {
    const { data: matchedUser, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", toUserId)
      .single();

    if (userError) {
      throw new Error("Failed to fetch matched user");
    }

    return {
      success: true,
      isMatch: true,
      matchedUser: matchedUser as UserProfile,
    };
  }

  return { success: true, isMatch: false };
}

export async function getUserMatches() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated.");
  }

  const { data: matches, error } = await supabase
    .from("matches")
    .select("*")
    .or(`user1_id.eq.${user.id}, user2_id.eq.${user.id}`)
    .eq("is_active", true);

  if (error) {
    throw new Error("Failed to fetch matches");
  }

  const matchedUsers: UserProfile[] = [];
  for (const match of matches || []) {
    const otherUserId =
      match.user1_id === user.id ? match.user2_id : match.user1_id;

    const { data: otherUser, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", otherUserId)
      .single();

    if (userError) {
      continue;
    }

    matchedUsers.push({
      id: otherUser.id,
      full_name: otherUser.full_name,
      username: otherUser.username,
      email: otherUser.email,
      gender: otherUser.gender,
      birthdate: otherUser.birthdate,
      bio: otherUser.bio,
      avatar_url: otherUser.avatar_url,
      preferences: otherUser.preferences,
      location_lat: undefined,
      location_lng: undefined,
      last_active: new Date().toISOString(),
      is_verified: true,
      is_online: false,
      created_at: match.created_at,
      updated_at: match.created_at,
    });
  }

  return matchedUsers;
}
