
import { Edit, Heart, MapPin, Calendar } from "lucide-react";
import ProfileNavigation from "./ProfileNavigation";
import ProfileHeader from "./ProfileHeader";
import InfoCard from "../betterui/InfoCard";
import ProfileSection from "./ProfileSection";
import ActionCard from "../betterui/ActionCard";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <ProfileNavigation />

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
                name="tewolde"
                age={24}
                username="@marie"
                memberSince="11/11/2025"
                avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=marie"
              />

              <ProfileSection title="About Me">
                <p className="text-foreground leading-relaxed">i am fine</p>
              </ProfileSection>

              <ProfileSection title="Basic Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard label="Gender" value="Male" />
                  <InfoCard label="Birthday" value="1/11/2001" />
                </div>
              </ProfileSection>

              <ProfileSection title="Dating Preferences">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard label="Age Range" value="18 - 50 years" />
                  <InfoCard label="Distance" value="Up to 25 km" />
                </div>
              </ProfileSection>

              <ProfileSection title="Interests">
                <div className="flex flex-wrap gap-2">
                  {[
                    "Music",
                    "Movies",
                    "Travel",
                    "Fitness",
                    "Gaming",
                    "Food",
                  ].map((interest) => (
                    <span
                      key={interest}
                      className="px-4 py-2 bg-gradient-primary rounded-full text-white text-sm font-medium shadow-glow"
                    >
                      {interest}
                    </span>
                  ))}
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
                  />
                  <ActionCard
                    icon={<Heart className="w-5 h-5" />}
                    title="My Likes"
                  />
                  <ActionCard
                    icon={<MapPin className="w-5 h-5" />}
                    title="Location Settings"
                  />
                  <ActionCard
                    icon={<Calendar className="w-5 h-5" />}
                    title="Availability"
                  />
                </div>
              </ProfileSection>

              <ProfileSection title="Account">
                <div className="space-y-4">
                  <div className="bg-secondary/50 rounded-xl p-4 border border-border/50">
                    <p className="text-sm text-muted-foreground mb-1">
                      Username
                    </p>
                    <p className="text-foreground font-medium">@marie</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4 border border-border/50">
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="text-foreground font-medium">
                      marie@example.com
                    </p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4 border border-border/50">
                    <p className="text-sm text-muted-foreground mb-1">Plan</p>
                    <p className="text-foreground font-medium">Premium</p>
                  </div>
                </div>
              </ProfileSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
