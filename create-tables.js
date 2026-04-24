import 'dotenv/config';
import { db } from './server/db.ts';
import { sql } from 'drizzle-orm';

async function createTables() {
  try {
    console.log('🏗️  Creating tables in Supabase...');

    // Create admins table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS admins (
        id VARCHAR DEFAULT gen_random_uuid() PRIMARY KEY,
        admin_id TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT NOT NULL,
        role TEXT DEFAULT 'admin' NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Created admins table');

    // Create soldiers table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS soldiers (
        id VARCHAR DEFAULT gen_random_uuid() PRIMARY KEY,
        service_number TEXT NOT NULL UNIQUE,
        full_name TEXT NOT NULL,
        rank TEXT NOT NULL,
        company TEXT NOT NULL,
        age INTEGER NOT NULL,
        weight INTEGER NOT NULL,
        medical_history TEXT,
        strength_score INTEGER NOT NULL,
        hearing_score INTEGER NOT NULL,
        appendages_score INTEGER NOT NULL,
        psychological_score INTEGER NOT NULL,
        eyesight_score INTEGER NOT NULL,
        medical_status TEXT DEFAULT 'Active' NOT NULL,
        active_med_status BOOLEAN DEFAULT true NOT NULL,
        reference_diagnosis_date TIMESTAMP,
        date_of_joining TIMESTAMP DEFAULT NOW() NOT NULL,
        enlistment_date TIMESTAMP DEFAULT NOW(),
        last_medical_checkup TIMESTAMP,
        next_medical_checkup TIMESTAMP,
        is_junior_commissioner BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Created soldiers table');

    // Create medical_records table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS medical_records (
        id VARCHAR DEFAULT gen_random_uuid() PRIMARY KEY,
        soldier_id VARCHAR NOT NULL REFERENCES soldiers(id) ON DELETE CASCADE,
        record_type TEXT NOT NULL,
        exam_date TIMESTAMP NOT NULL,
        findings TEXT NOT NULL,
        recommendations TEXT,
        doctor_name TEXT NOT NULL,
        status TEXT DEFAULT 'Completed' NOT NULL,
        next_checkup_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Created medical_records table');

    // Create medical_appointments table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS medical_appointments (
        id VARCHAR DEFAULT gen_random_uuid() PRIMARY KEY,
        soldier_id VARCHAR NOT NULL REFERENCES soldiers(id) ON DELETE CASCADE,
        serial_number INTEGER NOT NULL,
        medical_category TEXT NOT NULL,
        entry_type TEXT NOT NULL,
        place TEXT NOT NULL,
        appointment_date TIMESTAMP NOT NULL,
        visit_type TEXT NOT NULL,
        purpose TEXT NOT NULL,
        appointment_duty TEXT,
        duty_officer TEXT,
        remarks TEXT,
        glasses_contact TEXT,
        is_pme BOOLEAN DEFAULT false,
        admission_day INTEGER,
        re_med_cat BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Created medical_appointments table');

    // Create diagnosis_history table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS diagnosis_history (
        id VARCHAR DEFAULT gen_random_uuid() PRIMARY KEY,
        soldier_id VARCHAR NOT NULL REFERENCES soldiers(id) ON DELETE CASCADE,
        serial_number INTEGER NOT NULL,
        diagnosis_date TIMESTAMP NOT NULL,
        age_at_diagnosis INTEGER NOT NULL,
        service_type TEXT NOT NULL,
        diagnosis TEXT NOT NULL,
        remarks TEXT,
        medical_action TEXT,
        final_medical_board TEXT,
        is_pme BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Created diagnosis_history table');

    // Create notifications table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS notifications (
        id VARCHAR DEFAULT gen_random_uuid() PRIMARY KEY,
        soldier_id VARCHAR REFERENCES soldiers(id) ON DELETE CASCADE,
        admin_id VARCHAR REFERENCES admins(id) ON DELETE CASCADE,
        type TEXT NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Created notifications table');

    console.log('🎉 All tables created successfully!');
    
  } catch (error) {
    console.error('❌ Error creating tables:', error);
  } finally {
    process.exit(0);
  }
}

createTables();
