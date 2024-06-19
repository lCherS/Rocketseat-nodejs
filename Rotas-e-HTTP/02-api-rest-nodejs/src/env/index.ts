import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'teste', 'production'])
    .default('production'),
  DATABASE_URL: z.string(),
  PORT: z.union([z.string(), z.number()]).default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables: ', _env.error.format())
  throw new Error('Invalid environmet variables, print: ')
}

export const env = _env.data
