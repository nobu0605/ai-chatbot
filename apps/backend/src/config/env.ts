import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT ?? '3001',
  openaiApiKey: process.env.OPENAI_API_KEY ?? '',
  databaseUrl: process.env.DATABASE_URL ?? '',
  neo4jUri: process.env.NEO4J_URI ?? '',
  neo4jUsername: process.env.NEO4J_USERNAME ?? '',
  neo4jPassword: process.env.NEO4J_PASSWORD ?? ''
};
