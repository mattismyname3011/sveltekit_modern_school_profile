import { and, desc, eq, gte, sql } from "drizzle-orm";
import { db } from "$lib/db";
import { pageVisits, programs } from "$lib/db/schema";

export type OverviewAnalytics = {
  visitors: {
    week: number;
    month: number;
  };
  views: {
    week: number;
    month: number;
  };
  topPosts: {
    id: number;
    title: string;
    tag: string;
    image: string;
    views: number;
    visitors: number;
    lastViewedAt: string | null;
  }[];
};

export type RecordVisitInput = {
  visitorId: string;
  resource: string;
  resourceId?: number | null;
  path: string;
  ip?: string | null;
  userAgent?: string | null;
};

function startOfDaysAgo(daysAgo: number): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - daysAgo);
  return date;
}

export const analyticsRepo = {
  async recordVisit(input: RecordVisitInput) {
    await db.insert(pageVisits).values({
      visitorId: input.visitorId,
      resource: input.resource,
      resourceId: input.resourceId ?? null,
      path: input.path,
      ip: input.ip ?? null,
      userAgent: input.userAgent ?? null,
    });
  },

  async getOverview(): Promise<OverviewAnalytics> {
    const weekStart = startOfDaysAgo(7);
    const monthStart = startOfDaysAgo(30);

    const [
      [weekVisitors],
      [monthVisitors],
      [weekViews],
      [monthViews],
      topPosts,
    ] = await Promise.all([
      db
        .select({
          count: sql<number>`count(distinct ${pageVisits.visitorId})::int`,
        })
        .from(pageVisits)
        .where(gte(pageVisits.createdAt, weekStart)),
      db
        .select({
          count: sql<number>`count(distinct ${pageVisits.visitorId})::int`,
        })
        .from(pageVisits)
        .where(gte(pageVisits.createdAt, monthStart)),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(pageVisits)
        .where(gte(pageVisits.createdAt, weekStart)),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(pageVisits)
        .where(gte(pageVisits.createdAt, monthStart)),
      db
        .select({
          id: programs.id,
          title: programs.title,
          tag: programs.tag,
          image: programs.image,
          views: sql<number>`count(${pageVisits.id})::int`,
          visitors: sql<number>`count(distinct ${pageVisits.visitorId})::int`,
          lastViewedAt: sql<string | null>`max(${pageVisits.createdAt})`,
        })
        .from(pageVisits)
        .innerJoin(programs, eq(pageVisits.resourceId, programs.id))
        .where(eq(pageVisits.resource, "programs"))
        .groupBy(programs.id)
        .orderBy(desc(sql`count(${pageVisits.id})`))
        .limit(5),
    ]);

    return {
      visitors: { week: weekVisitors.count, month: monthVisitors.count },
      views: { week: weekViews.count, month: monthViews.count },
      topPosts: topPosts.map((row) => ({
        ...row,
        lastViewedAt: row.lastViewedAt
          ? new Date(row.lastViewedAt).toISOString()
          : null,
      })),
    };
  },
};
