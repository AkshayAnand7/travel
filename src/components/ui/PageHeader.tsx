interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl lg:text-[32px] font-bold text-text-primary leading-tight">{title}</h1>
      <p className="text-sm text-text-secondary mt-1">{subtitle}</p>
    </div>
  );
}
