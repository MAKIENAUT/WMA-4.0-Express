import { PrismaClient } from '@prisma/client'

// Singleton pattern to ensure only one PrismaClient instance
class Database {
  private static instance: PrismaClient | null = null

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!Database.instance) {
      Database.instance = new PrismaClient({
        // Optional: Add logging or other configuration
        log: ['query', 'info', 'warn', 'error'],
      })
    }
    return Database.instance
  }

  public static async connect(): Promise<void> {
    const prisma = Database.getInstance()
    try {
      await prisma.$connect()
      console.log('Database connected successfully')
    } catch (error) {
      console.error('Failed to connect to database', error)
      process.exit(1)
    }
  }

  public static async disconnect(): Promise<void> {
    if (Database.instance) {
      await Database.instance.$disconnect()
      Database.instance = null
    }
  }
}

export default Database