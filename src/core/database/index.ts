import { PrismaClient } from '@prisma/client'
import { enhance } from '@zenstackhq/runtime'
import { Authentication } from '../authentication'
import { Configuration } from '../configuration'

const createPrismaClient = () => {
  return new PrismaClient({
    log: Configuration.isDevelopment ? ['query', 'error', 'warn'] : ['error'],
  })
}

class Singleton {
  static prisma = createPrismaClient()
}

async function getPrismaWithContext() {
  const session = await Authentication.getSession()

  return enhance(Singleton.prisma, { user: session?.user as any })
}

export const Database = {
  getUnprotected: () => Singleton.prisma,
  get: getPrismaWithContext,
}
