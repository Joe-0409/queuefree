type SectionTitleProps = {
  title: string;
  description: string;
};

export function SectionTitle({ title, description }: SectionTitleProps): React.ReactElement {
  return (
    <div className="space-y-1">
      <h2 className="text-lg font-bold tracking-tight text-slate-950">{title}</h2>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}
