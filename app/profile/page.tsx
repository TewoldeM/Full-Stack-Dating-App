"use client";

import { getCurrentUserProfile } from "@/lib/actions/profile";
import { useEffect, useState } from "react";
import { calculateAge } from "@/lib/helpers/calculate-age";

import { Edit, Heart, MapPin, Calendar } from "lucide-react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSection from "@/components/profile/ProfileSection";
import InfoCard from "@/components/betterui/InfoCard";
import ActionCard from "@/components/betterui/ActionCard";

export interface UserProfile {
  id: string;
  full_name: string;
  username: string;
  email: string;
  gender: "male" | "female" | "other";
  birthdate: string;
  bio: string;
  avatar_url: string;
  preferences: UserPreferences;
  location_lat?: number;
  location_lng?: number;
  last_active: string;
  is_verified: boolean;
  is_online: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  age_range: { min: number; max: number };
  distance: number;
  gender_preference: ("male" | "female" | "other")[];
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const profileData = await getCurrentUserProfile();
        console.log(profileData);
        if (profileData) {
          setProfile(profileData);
        } else {
          setError("Failed to load profile");
        }
      } catch (err) {
        console.error("Error loading profile: ", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 bg-destructive rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl text-white">❌</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">Profile not found</h2>
          <p className="text-muted-foreground mb-6">
            {error || "Unable to load your profile. Please try again."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-full hover:bg-primary/90 transition-all duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* <ProfileNavigation /> */}

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your profile and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Profile Section */}
            <div className="lg:col-span-2 space-y-6">
              <ProfileHeader
                name={profile.full_name}
                age={calculateAge(profile.birthdate)}
                username={`@${profile.username}`}
                memberSince={new Date(profile.created_at).toLocaleDateString()}
                avatarUrl={profile.avatar_url}
                isActive={profile.is_online}
              />

              <ProfileSection title="About Me">
                <p className="text-foreground leading-relaxed">
                  {profile.bio || "No bio added yet."}
                </p>
              </ProfileSection>

              <ProfileSection title="Basic Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard
                    label="Gender"
                    value={
                      profile.gender.charAt(0).toUpperCase() +
                      profile.gender.slice(1)
                    }
                  />
                  <InfoCard
                    label="Birthday"
                    value={new Date(profile.birthdate).toLocaleDateString()}
                  />
                </div>
              </ProfileSection>

              <ProfileSection title="Dating Preferences">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard
                    label="Age Range"
                    value={`${profile.preferences.age_range.min} - ${profile.preferences.age_range.max} years`}
                  />
                  <InfoCard
                    label="Distance"
                    value={`Up to ${profile.preferences.distance} km`}
                  />
                </div>
              </ProfileSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ProfileSection title="Quick Actions">
                <div className="space-y-3">
                  <ActionCard
                    icon={<Edit className="w-5 h-5" />}
                    title="Edit Profile"
                    href="/profile/edit"
                  />
                  <ActionCard
                    icon={<Heart className="w-5 h-5" />}
                    title="/profile/MyLikes"
                  />
                  <ActionCard
                    icon={<MapPin className="w-5 h-5" />}
                    title="/profile/LocationSettings"
                  />
                  <ActionCard
                    icon={<Calendar className="w-5 h-5" />}
                    title="/profile/Availability"
                  />
                </div>
              </ProfileSection>

              <ProfileSection title="Account">
                <div className="space-y-4">
                  <div className="bg-[#262626] text-white p-4 rounded-xl hover:border-red-500 ">
                    <p className="text-sm text-muted-foreground mb-1">
                      Username
                    </p>
                    <p className="text-foreground font-medium">
                      @{profile.username}
                    </p>
                  </div>
                  <div className="bg-[#262626] text-white p-4 rounded-xl hover:border-red-500 ">
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="text-foreground font-medium">
                      {profile.email}
                    </p>
                  </div>
                </div>
              </ProfileSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
