import { pgTable, text, serial, integer, boolean, timestamp, uuid, jsonb, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Waitlist schema for storing waitlist registrations
export const waitlistEntries = pgTable("waitlist_entries", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  referralCode: text("referral_code").notNull().unique(),
  referredBy: text("referred_by"),
  referralCount: integer("referral_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertWaitlistEntrySchema = createInsertSchema(waitlistEntries)
  .pick({
    fullName: true,
    email: true,
    referredBy: true,
  })
  .extend({
    referredBy: z.string().optional(),
  });

export type InsertWaitlistEntry = z.infer<typeof insertWaitlistEntrySchema>;
export type WaitlistEntry = typeof waitlistEntries.$inferSelect;

// Daily waitlist analytics
export const dailyWaitlistStats = pgTable("daily_waitlist_stats", {
  id: serial("id").primaryKey(),
  date: date("date").notNull().unique(),
  signupCount: integer("signup_count").notNull().default(0),
  totalReferrals: integer("total_referrals").notNull().default(0),
  conversionRate: integer("conversion_rate").notNull().default(0), // Stored as percentage (0-100)
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertDailyWaitlistStatsSchema = createInsertSchema(dailyWaitlistStats)
  .pick({
    date: true,
    signupCount: true,
    totalReferrals: true,
    conversionRate: true,
    metadata: true,
  })
  .extend({
    metadata: z.any().optional(),
  });

export type InsertDailyWaitlistStats = z.infer<typeof insertDailyWaitlistStatsSchema>;
export type DailyWaitlistStats = typeof dailyWaitlistStats.$inferSelect;

// Geographic distribution
export const geographicStats = pgTable("geographic_stats", {
  id: serial("id").primaryKey(),
  region: text("region").notNull().unique(),
  userCount: integer("user_count").notNull().default(0),
  engagementScore: integer("engagement_score").notNull().default(0), // 0-100
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertGeographicStatsSchema = createInsertSchema(geographicStats)
  .pick({
    region: true,
    userCount: true,
    engagementScore: true,
  });

export type InsertGeographicStats = z.infer<typeof insertGeographicStatsSchema>;
export type GeographicStats = typeof geographicStats.$inferSelect;

// Referral channel analytics
export const referralChannels = pgTable("referral_channels", {
  id: serial("id").primaryKey(),
  channelName: text("channel_name").notNull().unique(),
  referralCount: integer("referral_count").notNull().default(0),
  conversionRate: integer("conversion_rate").notNull().default(0), // Stored as percentage (0-100)
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertReferralChannelSchema = createInsertSchema(referralChannels)
  .pick({
    channelName: true,
    referralCount: true,
    conversionRate: true,
  });

export type InsertReferralChannel = z.infer<typeof insertReferralChannelSchema>;
export type ReferralChannel = typeof referralChannels.$inferSelect;
