import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Edit } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  age: number;
  username: string;
  memberSince: string;
  avatarUrl?: string;
  isActive?: boolean;
}

const ProfileHeader = ({
  name,
  age,
  username,
  memberSince,
  avatarUrl,
  isActive = false,
}: ProfileHeaderProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-card rounded-3xl" />
      <div
        className="relative bg-card rounded-3xl p-8 shadow-[0_0_10px_rgba(255,49,99,0.3)] hover:shadow-pink-400 transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative group">
            <Avatar className="w-32 h-32 border-4 border-primary shadow-glow">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback className="text-3xl bg-gradient-primary">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <Edit className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
              <h2 className="text-4xl font-bold ">
                {name}, {age}
              </h2>
              {isActive && (
                <Badge
                  variant="secondary"
                  className="bg-red-400/5 text-red-800 border-red-900 font-bold text-md"
                >
                  Active
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mb-1">{username}</p>
            <p className="text-sm text-muted-foreground">
              Member since {memberSince}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
