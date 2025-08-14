import { Inngest } from "inngest";
import User from "../models/user.js";

export const inngest = new Inngest({ id: "pingup" });

// Create user in DB
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, image_url, email_addresses } = event.data;

    let username = email_addresses?.[0]?.email_address?.split("@")[0] || null;

    // Ensure username uniqueness
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      username = `${username}${Math.floor(Math.random() * 10000)}`;
    }

    const userData = {
      _id: id,
      email: email_addresses?.[0]?.email_address || null,
      full_name: `${first_name || ""} ${last_name || ""}`.trim(),
      profile_picture: image_url,
      username,
    };

    await User.create(userData);
    return { status: "User created successfully" };
  }
);

// Update user in DB
const syncUserUpdate = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, image_url, email_addresses } = event.data;

    const updateUserData = {
      email: email_addresses?.[0]?.email_address || null,
      full_name: `${first_name || ""} ${last_name || ""}`.trim(),
      profile_picture: image_url,
    };

    await User.findByIdAndUpdate(id, updateUserData);
    return { status: "User updated successfully" };
  }
);

// Delete user from DB
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" }, // ✅ Correct event name
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
    return { status: "User deleted successfully" };
  }
);

export const functions = [
  syncUserCreation,
  syncUserUpdate,
  syncUserDeletion
];
