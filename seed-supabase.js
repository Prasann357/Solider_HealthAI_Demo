import 'dotenv/config';
import { db } from './server/db.ts';
import { admins } from './shared/schema.ts';
import bcrypt from 'bcrypt';

async function seedSupabase() {
  try {
    console.log('🌱 Seeding users to Supabase...');
    
    // Check if users already exist
    const existingAdmins = await db.select().from(admins);
    const existingAdminIds = existingAdmins.map(admin => admin.adminId);
    
    console.log('📧 Existing admins:', existingAdminIds);
    
    // Check if admin exists, create if not
    if (!existingAdminIds.includes('admin')) {
      console.log('🔄 Creating admin user...');
      const adminHashedPassword = await bcrypt.hash('admin123', 10);
      
      await db.insert(admins).values({
        adminId: 'admin',
        password: adminHashedPassword,
        email: 'admin@armyhealth.mil',
        role: 'admin',
      });
      console.log('✅ Admin user created');
    } else {
      console.log('✅ Admin user already exists');
    }

    // Check if superadmin exists, create if not
    if (!existingAdminIds.includes('superadmin')) {
      console.log('� Creating superadmin user...');
      const superadminHashedPassword = await bcrypt.hash('super123', 10);
      
      await db.insert(admins).values({
        adminId: 'superadmin',
        password: superadminHashedPassword,
        email: 'superadmin@military.health',
        role: 'superadmin',
      });
      console.log('✅ Superadmin user created');
    } else {
      console.log('✅ Superadmin user already exists');
    }

    console.log('✅ Seeding process completed!');
    console.log('📧 Login credentials:');
    console.log('   Admin - Username: admin, Password: admin123');
    console.log('   Superadmin - Username: superadmin, Password: super123');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seedSupabase();
