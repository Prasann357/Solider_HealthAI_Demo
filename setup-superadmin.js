import 'dotenv/config';
import { storage } from "./server/storage";

async function createSuperAdmin() {
  try {
    // Check if super admin already exists
    const existing = await storage.getAdminByAdminId("superadmin");
    if (existing) {
      console.log("Super admin already exists");
      return;
    }

    // Create super admin
    await storage.createAdmin({
      adminId: "superadmin",
      password: "super123",
      email: "superadmin@military.health",
      role: "superadmin"
    });

    console.log("Super admin created successfully");
    console.log("Login: superadmin / super123");
  } catch (error) {
    console.error("Error creating super admin:", error);
  }
  process.exit(0);
}

createSuperAdmin();
