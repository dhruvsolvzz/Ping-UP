// inngestFunctions.js
import { Inngest } from "inngest";
import connectDB from "../configs/db.js";
import User from "../models/User.js";

// Create a single Inngest client
export const inngest = new Inngest({ id: "pingup-app" });

/**
 * Utility: ensure DB connection before running any queries
 */
async function ensureDB() {
  try {
    await connectDB();
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
}

/**
 * Clerk → MongoDB : Create or Update User
 */
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    
    const { id, first_name, last_name, image_url, email_addresses } = event.data || {};
    if (!id) throw new Error("Missing Clerk user ID");

    let username =email_addresses?.[0]?.email_address?.split("@")[0] || `user_${id.slice(0, 6)}`;

    // Ensure username is unique
    const user = await User.findOne({ username }).lean();
    if (user) {
      username = `${username}${Math.floor(Math.random() * 10000)}`;
    }

    const userData = {
      _id: id, // string Clerk ID, ensure your schema _id is type: String
      email: email_addresses?.[0]?.email_address || null,
      full_name: `${first_name || ""} ${last_name || ""}`.trim(),
      profile_picture: image_url || null,
      username,
    };

    await User.create(userData);
    console.log(`🆕 New user created: ${id}`);


    return { status: "User created/updated successfully" };
  }
);

/**
 * Clerk → MongoDB : Update User
 */
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
    console.log(`✏️ User updated: ${id}`);

  }
);

/**
 * Clerk → MongoDB : Delete User
 */
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    

    const { id } = event.data || {};
    if (!id) throw new Error("Missing Clerk user ID");
    await User.findByIdAndDelete(id);
    console.log(`🗑️ User deleted: ${id}`);
    

  }
);

export const functions = [syncUserCreation, syncUserUpdate, syncUserDeletion];
