import { pgTable, serial, text, timestamp, integer, jsonb, date, varchar, boolean, uuid, pgEnum } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

// Enums
export const groupTypeEnum = pgEnum("group_type", ["college", "private"])

// Users table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  username: text("username").unique(),
  bio: text("bio"),
  year: integer("year"),
  collegeId: uuid("college_id").references(() => colleges.id),
  avatarUrl: text("avatar_url"),
  profileLinks: jsonb("profile_links").$type<{
    github?: string
    leetcode?: string
    codeforces?: string
    twitter?: string
  }>(),
  currentStreak: integer("current_streak").default(0),
  longestStreak: integer("longest_streak").default(0),
  totalXp: integer("total_xp").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Colleges table
export const colleges = pgTable("colleges", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  logoUrl: text("logo_url"),
  domain: text("domain"),
  createdAt: timestamp("created_at").defaultNow(),
})

// Groups table
export const groups = pgTable("groups", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  type: groupTypeEnum("type").notNull(),
  description: text("description"),
  inviteCode: text("invite_code").unique(),
  createdByUserId: uuid("created_by_user_id").references(() => users.id),
  collegeId: uuid("college_id").references(() => colleges.id),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow(),
})

// Group members table
export const groupMembers = pgTable("group_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  groupId: uuid("group_id").references(() => groups.id).notNull(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  joinedAt: timestamp("joined_at").defaultNow(),
})

// Daily activity logs table
export const dailyActivityLogs = pgTable("daily_activity_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  date: date("date").notNull(),
  githubCommits: integer("github_commits").default(0),
  leetcodeSolved: integer("leetcode_solved").default(0),
  codeforcesRating: integer("codeforces_rating").default(0),
  codeforcesParticipation: integer("codeforces_participation").default(0),
  twitterPosts: integer("twitter_posts").default(0),
  customTaskScore: integer("custom_task_score").default(0),
  totalXp: integer("total_xp").default(0),
  createdAt: timestamp("created_at").defaultNow(),
})

// Goals table
export const goals = pgTable("goals", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  targetDate: date("target_date"),
  targetXp: integer("target_xp"),
  isCompleted: boolean("is_completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Custom tasks table
export const customTasks = pgTable("custom_tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  xpValue: integer("xp_value").notNull(),
  isCompleted: boolean("is_completed").default(false),
  date: date("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

// Platform sync status table
export const platformSyncStatus = pgTable("platform_sync_status", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  platform: text("platform").notNull(), // github, leetcode, codeforces, twitter
  lastSyncedAt: timestamp("last_synced_at"),
  syncData: jsonb("sync_data"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
})

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  college: one(colleges, {
    fields: [users.collegeId],
    references: [colleges.id],
  }),
  dailyActivityLogs: many(dailyActivityLogs),
  goals: many(goals),
  customTasks: many(customTasks),
  groupMemberships: many(groupMembers),
  createdGroups: many(groups),
  platformSyncStatus: many(platformSyncStatus),
}))

export const collegesRelations = relations(colleges, ({ many }) => ({
  users: many(users),
  groups: many(groups),
}))

export const groupsRelations = relations(groups, ({ one, many }) => ({
  creator: one(users, {
    fields: [groups.createdByUserId],
    references: [users.id],
  }),
  college: one(colleges, {
    fields: [groups.collegeId],
    references: [colleges.id],
  }),
  members: many(groupMembers),
}))

export const groupMembersRelations = relations(groupMembers, ({ one }) => ({
  group: one(groups, {
    fields: [groupMembers.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [groupMembers.userId],
    references: [users.id],
  }),
}))

export const dailyActivityLogsRelations = relations(dailyActivityLogs, ({ one }) => ({
  user: one(users, {
    fields: [dailyActivityLogs.userId],
    references: [users.id],
  }),
}))

export const goalsRelations = relations(goals, ({ one }) => ({
  user: one(users, {
    fields: [goals.userId],
    references: [users.id],
  }),
}))

export const customTasksRelations = relations(customTasks, ({ one }) => ({
  user: one(users, {
    fields: [customTasks.userId],
    references: [users.id],
  }),
}))

export const platformSyncStatusRelations = relations(platformSyncStatus, ({ one }) => ({
  user: one(users, {
    fields: [platformSyncStatus.userId],
    references: [users.id],
  }),
}))

