import { Badge, type BadgeTone } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type TableCellValue =
  | string
  | number
  | {
      label: string;
      tone?: BadgeTone;
    };

export type DataTableColumn = {
  key: string;
  label: string;
  align?: 'left' | 'right';
};

export type DataTableRow = Record<string, TableCellValue>;

export type DataTableConfig = {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  emptyMessage?: string;
};

function renderCell(value: TableCellValue): React.ReactNode {
  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }

  return <Badge tone={value.tone}>{value.label}</Badge>;
}

export function DataTable({
  columns,
  rows,
  emptyMessage = 'No placeholder rows were configured for this skeleton view.'
}: DataTableConfig): React.ReactElement {
  if (rows.length === 0) {
    return <div className="rounded-2xl border border-dashed border-border px-4 py-8 text-sm text-slate-500">{emptyMessage}</div>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="min-w-full border-collapse">
        <thead className="bg-panel-muted">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  'px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500',
                  column.align === 'right' && 'text-right'
                )}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {rows.map((row, index) => (
            <tr key={index} className="border-t border-border">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    'px-4 py-4 text-sm text-slate-700',
                    column.align === 'right' && 'text-right'
                  )}
                >
                  {renderCell(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
