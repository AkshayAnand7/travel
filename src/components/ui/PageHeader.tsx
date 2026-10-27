interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary leading-tight">
        {title}
      </h1>
      <p className="text-xs sm:text-[13px] text-text-secondary mt-0.5 font-normal leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}
