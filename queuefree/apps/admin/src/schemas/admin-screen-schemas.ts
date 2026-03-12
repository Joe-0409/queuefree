import { z } from 'zod';

const badgeTones = ['slate', 'brand', 'accent', 'warning', 'danger'] as const;
const tableAlignments = ['left', 'right'] as const;
const nonEmptyStringSchema = z.string().min(1);

export const badgeToneSchema = z.enum(badgeTones);

export const tableCellValueSchema = z.union([
 z.string(),
 z.number(),
 z.object({
 label: nonEmptyStringSchema,
 tone: badgeToneSchema.optional()
 })
]);

export const dataTableColumnSchema = z.object({
 key: nonEmptyStringSchema,
 label: nonEmptyStringSchema,
 align: z.enum(tableAlignments).optional()
});

export const dataTableConfigSchema = z.object({
 columns: z.array(dataTableColumnSchema),
 rows: z.array(z.record(tableCellValueSchema)),
 emptyMessage: z.string().optional()
});

export const metricSchema = z.object({
 title: nonEmptyStringSchema,
 value: nonEmptyStringSchema,
 description: nonEmptyStringSchema,
 tone: badgeToneSchema.optional()
});

export const listPageConfigSchema = z.object({
 eyebrow: nonEmptyStringSchema,
 title: nonEmptyStringSchema,
 description: nonEmptyStringSchema,
 meta: z.array(nonEmptyStringSchema),
 metrics: z.array(metricSchema),
 tableTitle: nonEmptyStringSchema,
 tableDescription: nonEmptyStringSchema,
 table: dataTableConfigSchema,
 secondaryTable: dataTableConfigSchema
 .extend({
 title: nonEmptyStringSchema,
 description: nonEmptyStringSchema
 })
 .optional(),
 notes: z.array(nonEmptyStringSchema)
});

export const detailSectionSchema = z.object({
 title: nonEmptyStringSchema,
 description: nonEmptyStringSchema,
 rows: z.array(
 z.object({
 label: nonEmptyStringSchema,
 value: nonEmptyStringSchema
 })
 )
});

export const detailPageConfigSchema = z.object({
 eyebrow: nonEmptyStringSchema,
 title: nonEmptyStringSchema,
 description: nonEmptyStringSchema,
 meta: z.array(nonEmptyStringSchema),
 badgeLabel: nonEmptyStringSchema,
 badgeTone: badgeToneSchema,
 backHref: nonEmptyStringSchema,
 metrics: z.array(metricSchema),
 sections: z.array(detailSectionSchema),
 actions: z.array(nonEmptyStringSchema),
 notes: z.array(nonEmptyStringSchema),
 relatedLinks: z.array(
 z.object({
 href: nonEmptyStringSchema,
 label: nonEmptyStringSchema
 })
 )
});

export const adminDashboardDataSchema = z.object({
 metrics: z.array(metricSchema),
 queueTable: dataTableConfigSchema,
 walletTable: dataTableConfigSchema,
 backlogTable: dataTableConfigSchema,
 riskNotes: z.array(nonEmptyStringSchema)
});
