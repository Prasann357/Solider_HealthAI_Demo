import 'dotenv/config';
import { db } from './server/db.ts';
import { soldiers, medicalRecords, medicalAppointments, diagnosisHistory } from './shared/schema.ts';

async function seedSampleData() {
  try {
    console.log('🌱 Seeding sample soldiers and medical data...');
    
    // Create sample soldiers
    const sampleSoldiers = [
      {
        serviceNumber: 'S001',
        fullName: 'Sergeant John Smith',
        rank: 'Sergeant',
        company: 'Alpha Company',
        age: 28,
        weight: 75,
        medicalHistory: 'No significant medical history',
        strengthScore: 85,
        hearingScore: 90,
        appendagesScore: 95,
        psychologicalScore: 88,
        eyesightScore: 92,
        medicalStatus: 'Active',
        activeMedStatus: true,
        isJuniorCommissioner: false,
      },
      {
        serviceNumber: 'S002',
        fullName: 'Lieutenant Sarah Wilson',
        rank: 'Lieutenant',
        company: 'Bravo Company',
        age: 25,
        weight: 62,
        medicalHistory: 'Minor allergies to pollen',
        strengthScore: 80,
        hearingScore: 95,
        appendagesScore: 90,
        psychologicalScore: 92,
        eyesightScore: 88,
        medicalStatus: 'Active',
        activeMedStatus: true,
        isJuniorCommissioner: true,
      },
    ];

    const insertedSoldiers = await db.insert(soldiers).values(sampleSoldiers).returning();
    console.log(`✅ Created ${insertedSoldiers.length} sample soldiers`);

    // Create sample medical appointments
    const sampleAppointments = [
      {
        soldierId: insertedSoldiers[0].id,
        serialNumber: 1,
        medicalCategory: 'Fit',
        entryType: 'Check-up',
        place: 'Military Hospital',
        appointmentDate: new Date('2024-01-15'),
        visitType: 'Initial',
        purpose: 'Annual medical examination',
        isPME: true,
        reMedCat: false,
      },
    ];

    const insertedAppointments = await db.insert(medicalAppointments).values(sampleAppointments).returning();
    console.log(`✅ Created ${insertedAppointments.length} sample appointments`);

    console.log('🎉 Sample data seeding completed!');
    
  } catch (error) {
    console.error('❌ Seeding sample data failed:', error);
  } finally {
    process.exit(0);
  }
}

seedSampleData();
