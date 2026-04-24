import 'dotenv/config';
import { db } from './server/db.ts';
import { admins } from './shared/schema.ts';

async function checkAdmins() {
  try {
    console.log('📋 Checking all admin users in Supabase...');
    
    const allAdmins = await db.select({
      adminId: admins.adminId,
      email: admins.email,
      role: admins.role
    }).from(admins);
    
    console.log('👥 Admin users found:');
    allAdmins.forEach(admin => {
      console.log(`   - ${admin.adminId} (${admin.role}) - ${admin.email}`);
    });
    
  } catch (error) {
    console.error('❌ Error checking admins:', error);
  } finally {
    process.exit(0);
  }
}

checkAdmins();
