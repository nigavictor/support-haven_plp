const { Pool } = require('pg');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'support_haven',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

const sampleStories = [
  {
    content: `I never thought I would find myself in this situation. For years, I lived in fear, walking on eggshells in my own home. The emotional abuse started slowly - comments about my appearance, my friends, my family. Then it escalated to controlling where I went, who I talked to, and even what I wore.

The breaking point came when I realized my children were watching, learning that this was what a relationship should look like. I knew I had to leave, not just for me, but for them. It wasn't easy - I had no money, no support system, and I was terrified. But I did it.

Today, I'm in a safe place. I'm rebuilding my life, one day at a time. My children are thriving, and I'm learning what it means to be free. To anyone reading this who is still in that situation: you are stronger than you know. You deserve safety, peace, and happiness. There is a way out, and there are people who will help you.`,
    category: 'Domestic Violence',
    pseudonym: 'Survivor2024',
    status: 'approved'
  },
  {
    content: `I was harassed at work for months. My supervisor would make inappropriate comments, stand too close, and make me feel uncomfortable. When I tried to report it, I was told I was "overreacting" and that it was "just how he is." I felt trapped - I needed the job, but I couldn't continue working in that environment.

After months of anxiety and sleepless nights, I finally found the courage to file a formal complaint with HR. It was scary, and I worried about retaliation. But I knew I had to stand up for myself and for other women who might face the same situation.

The process wasn't easy, but eventually, action was taken. I learned that my voice matters, and that I have the right to work in an environment free from harassment. To anyone experiencing workplace harassment: document everything, reach out to support services, and know that you are not alone. Your safety and dignity matter.`,
    category: 'Workplace Harassment',
    pseudonym: 'BraveVoice',
    status: 'approved'
  },
  {
    content: `Online harassment is real, and it's terrifying. After I posted about my experience with gender-based violence on social media, I was bombarded with threats, hateful messages, and attempts to dox me. People I didn't know were trying to find my address, my workplace, my family.

I felt violated and scared. The internet, which had been a source of support, suddenly felt like a dangerous place. I had to delete my accounts, change my phone number, and be extra careful about my privacy.

But I also found support. Other survivors reached out, shared their own experiences, and reminded me that I wasn't alone. Support groups online helped me process what happened and gave me tools to protect myself.

If you're experiencing online harassment: block and report, document everything, reach out to support services, and remember that you don't deserve this. Your voice matters, and there are safe spaces where you can share your story.`,
    category: 'Online Harassment',
    pseudonym: 'DigitalWarrior',
    status: 'approved'
  }
];

async function populateStories() {
  try {
    console.log('Connecting to database...');
    
    // Test connection
    await pool.query('SELECT NOW()');
    console.log('✅ Connected to database');

    // Check if stories table exists, if not create it
    await pool.query(`
      CREATE TABLE IF NOT EXISTS stories (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        pseudonym VARCHAR(100),
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Stories table ready');

    // Insert sample stories
    console.log('\nInserting sample stories...');
    for (const story of sampleStories) {
      const result = await pool.query(
        `INSERT INTO stories (content, category, pseudonym, status, created_at) 
         VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) 
         RETURNING id`,
        [story.content, story.category, story.pseudonym, story.status]
      );
      console.log(`✅ Inserted story: ${story.category} by ${story.pseudonym} (ID: ${result.rows[0].id})`);
    }

    // Count total stories
    const countResult = await pool.query("SELECT COUNT(*) FROM stories WHERE status = 'approved'");
    console.log(`\n✅ Success! Total approved stories: ${countResult.rows[0].count}`);

    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === '3D000') {
      console.error('\n📝 Database does not exist. Please create it first:');
      console.error(`   createdb -U ${process.env.DB_USER || 'postgres'} ${process.env.DB_NAME || 'support_haven'}`);
    } else if (error.code === '28P01') {
      console.error('\n📝 Authentication failed. Please check your database credentials in backend/.env');
    }
    process.exit(1);
  }
}

populateStories();

