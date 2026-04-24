import pg from 'pg';

const connectionString = "postgresql://postgres.saejlqiacegmmimiqauw:g80olUXcaQqJ8n46@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres";

async function testPooledConnection() {
  const pool = new pg.Pool({
    connectionString,
    ssl: false // Pooler handles SSL termination
  });

  try {
    console.log('Testing pooled connection to Supabase...');
    const client = await pool.connect();
    console.log('✓ Successfully connected to pooler!');
    
    const result = await client.query('SELECT NOW() as current_time, version() as pg_version');
    console.log('✓ Database query successful:');
    console.log('Time:', result.rows[0].current_time);
    console.log('PostgreSQL Version:', result.rows[0].pg_version);
    
    // Test our tables exist
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);
    
    console.log('\n✓ Available tables:');
    tablesResult.rows.forEach(row => {
      console.log(`  - ${row.table_name}`);
    });
    
    client.release();
    console.log('\n✓ Pooled connection test completed successfully!');
  } catch (error) {
    console.error('✗ Pooled connection test failed:');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
  } finally {
    await pool.end();
  }
}

testPooledConnection();
