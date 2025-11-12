import { ReactNode } from "react";

interface ProfileSectionProps {
  title: string;
  children: ReactNode;
}

const ProfileSection = ({ title, children }: ProfileSectionProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-card rounded-3xl" />
      <div className="relative bg-card rounded-3xl p-6 shadow-[0_0_10px_rgba(255,49,99,0.3)] hover:shadow-pink-400 transition-all duration-300">
        <h3 className="text-xl font-semibold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          {title}y
        </h3>
        {children}
      </div>
    </div>
  );
};

export default ProfileSection;
