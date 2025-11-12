interface InfoCardProps {
  label: string;
  value: string;
}

const InfoCard = ({ label, value }: InfoCardProps) => {
  return (
    <div className="bg-[#262626] text-white p-4 rounded-xl hover:border-red-500/60 transition-all duration-300">
      <p className="text-lg text-muted-foreground mb-1">{label}</p>
      <p className="text-foreground font-medium">{value}</p>
    </div>
  );
};

export default InfoCard;
