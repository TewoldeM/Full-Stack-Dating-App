import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface ActionCardProps {
  icon: ReactNode;
  title: string;
  onClick?: () => void;
  href?: string;
}

const ActionCard = ({ icon, title, onClick, href }: ActionCardProps) => {
  const content = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white shadow-glow">
          {icon}
        </div>
        <span className="font-medium">{title}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
    </div>
  );

  const className =
    "w-full bg-[#262626] text-white p-4 rounded-xl hover:border-red-500  transition-all duration-300 group";

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${className} flex`}>
      {content}
    </button>
  );
};

export default ActionCard;
