//src/supabase/functions/server/index.tsx
import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize demo users
async function initializeDemoUsers() {
  const adminExists = await kv.get("user:admin@alumni.edu");
  if (!adminExists) {
    await kv.set("user:admin@alumni.edu", {
      id: "admin-1",
      email: "admin@alumni.edu",
      password: "admin123", // In production, use hashed passwords
      name: "Admin User",
      role: "admin",
      class: "2010",
      major: "Computer Science",
    });
  }

  const userExists = await kv.get("user:user@alumni.edu");
  if (!userExists) {
    await kv.set("user:user@alumni.edu", {
      id: "user-1",
      email: "user@alumni.edu",
      password: "user123",
      name: "Regular User",
      role: "user",
      class: "2018",
      major: "Business",
    });
  }
}

// Initialize on startup
initializeDemoUsers();

// Middleware to check authentication
async function requireAuth(c: any, next: any) {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const token = authHeader.substring(7);
  const session = await kv.get(`session:${token}`);
  
  if (!session) {
    return c.json({ message: "Invalid or expired session" }, 401);
  }

  c.set("user", session);
  await next();
}

// Middleware to check moderator/admin role
async function requireModerator(c: any, next: any) {
  const user = c.get("user");
  if (!user || (user.role !== "admin" && user.role !== "moderator")) {
    return c.json({ message: "Forbidden - Moderator access required" }, 403);
  }
  await next();
}

// Health check endpoint
app.get("/make-server-d96042de/health", (c) => {
  return c.json({ status: "ok" });
});

// Auth routes
app.post("/make-server-d96042de/auth/login", async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    const user = await kv.get(`user:${email}`);
    if (!user || user.password !== password) {
      return c.json({ message: "Invalid credentials" }, 401);
    }

    // Create session token
    const token = crypto.randomUUID();
    await kv.set(`session:${token}`, {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      class: user.class,
      major: user.major,
      company: user.company,
      position: user.position,
      location: user.location,
      industries: user.industries,
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    return c.json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ message: "Login failed" }, 500);
  }
});

app.post("/make-server-d96042de/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    const existingUser = await kv.get(`user:${email}`);
    if (existingUser) {
      return c.json({ message: "User already exists" }, 400);
    }

    const newUser = {
      id: crypto.randomUUID(),
      email,
      password,
      name,
      role: "user",
    };

    await kv.set(`user:${email}`, newUser);

    // Create session token
    const token = crypto.randomUUID();
    await kv.set(`session:${token}`, {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return c.json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error("Signup error:", error);
    return c.json({ message: "Signup failed" }, 500);
  }
});

app.get("/make-server-d96042de/auth/verify", requireAuth, async (c) => {
  const user = c.get("user");
  return c.json({ user });
});

app.put("/make-server-d96042de/auth/profile", requireAuth, async (c) => {
  try {
    const user = c.get("user");
    const updates = await c.req.json();
    
    const existingUser = await kv.get(`user:${user.email}`);
    if (!existingUser) {
      return c.json({ message: "User not found" }, 404);
    }

    const updatedUser = {
      ...existingUser,
      ...updates,
      email: existingUser.email, // Don't allow email changes
      role: existingUser.role, // Don't allow role changes
      password: existingUser.password, // Don't allow password changes via this endpoint
    };

    await kv.set(`user:${user.email}`, updatedUser);

    // Update session
    const authHeader = c.req.header("Authorization");
    const token = authHeader.substring(7);
    const { password: _, ...userWithoutPassword } = updatedUser;
    await kv.set(`session:${token}`, userWithoutPassword);

    return c.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Profile update error:", error);
    return c.json({ message: "Update failed" }, 500);
  }
});

// Admin routes
app.get("/make-server-d96042de/admin/data", requireAuth, requireModerator, async (c) => {
  try {
    // Get all data from KV store
    const eventsData = await kv.getByPrefix("event:");
    const jobsData = await kv.getByPrefix("job:");
    const newsData = await kv.getByPrefix("news:");
    const usersData = await kv.getByPrefix("user:");

    const users = usersData.map((u: any) => {
      const { password: _, ...userWithoutPassword } = u;
      return userWithoutPassword;
    });

    return c.json({
      events: eventsData || [],
      jobs: jobsData || [],
      news: newsData || [],
      users: users || [],
    });
  } catch (error) {
    console.error("Admin data fetch error:", error);
    return c.json({ message: "Failed to fetch data" }, 500);
  }
});

app.delete("/make-server-d96042de/admin/:type/:id", requireAuth, requireModerator, async (c) => {
  try {
    const type = c.req.param("type");
    const id = c.req.param("id");
    
    // Remove the 's' to get singular form for key prefix
    const prefix = type.slice(0, -1);
    await kv.del(`${prefix}:${id}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return c.json({ message: "Delete failed" }, 500);
  }
});

Deno.serve(app.fetch);