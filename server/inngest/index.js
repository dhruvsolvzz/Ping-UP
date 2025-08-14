import { Inngest } from "inngest";
import User from "../models/user.js";

export const inngest = new Inngest({ id: "pingup" });

// Create or update user in DB
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, image_url, email_addresses } = event.data || {};

    if (!id) throw new Error("Missing Clerk user ID");

    let username = email_addresses?.[0]?.email_address?.split("@")[0] || `user_${id.slice(0, 6)}`;

    // Ensure username uniqueness
    const existingUser = await User.findOne({ username }).lean();
    if (existingUser) {
      username = `${username}${Math.floor(Math.random() * 10000)}`;
    }

    const userData = {
      _id: id,
      email: email_addresses?.[0]?.email_address || null,
      full_name: `${first_name || ""} ${last_name || ""}`.trim(),
      profile_picture: image_url || null,
      username,
    };

    // Use upsert to prevent duplicate key errors
    await User.findByIdAndUpdate(id, userData, { upsert: true, new: true });
    console.log(`✅ User synced: ${id}`);

    return { status: "User created/updated successfully" };
  }
);

// Update user in DB
const syncUserUpdate = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, image_url, email_addresses } = event.data || {};

    if (!id) throw new Error("Missing Clerk user ID");

    const updateUserData = {
      email: email_addresses?.[0]?.email_address || null,
      full_name: `${first_name || ""} ${last_name || ""}`.trim(),
      profile_picture: image_url || null,
    };

    await User.findByIdAndUpdate(id, updateUserData);
    console.log(`🔄 User updated: ${id}`);

    return { status: "User updated successfully" };
  }
);

// Delete user from DB
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data || {};
    if (!id) throw new Error("Missing Clerk user ID");

    await User.findByIdAndDelete(id);
    console.log(`🗑️ User deleted: ${id}`);

    return { status: "User deleted successfully" };
  }
);

export const functions = [
  syncUserCreation,
  syncUserUpdate,
  syncUserDeletion
];
