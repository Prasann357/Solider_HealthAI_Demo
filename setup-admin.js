import 'dotenv/config';
import { storage } from "./server/storage";

async function createDefaultAdmin() {
  try {
    // Check if admin already exists
    const existing = await storage.getAdminByAdminId("admin");
    if (existing) {
      console.log("Default admin already exists");
      return;
    }

    // Create default admin
    await storage.createAdmin({
      adminId: "admin",
      password: "admin123",
      email: "admin@military.health",
      role: "admin"
    });

    console.log("Default admin created successfully");
    console.log("Login: admin / admin123");
  } catch (error) {
    console.error("Error creating admin:", error);
  }
  process.exit(0);
}

createDefaultAdmin();