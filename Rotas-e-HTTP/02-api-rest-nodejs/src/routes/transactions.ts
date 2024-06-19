// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { FastifyInstance, fastify } from 'fastify'
import { z } from 'zod'
import crypto from 'node:crypto'
import { knex } from '../database'

export async function transactionsRoutes(app: FastifyInstance) {
  // Lista todas as transações
  app.get('/', async () => {
    const transactions = await knex('transactions').select('*')

    return { transactions }
  })
  // Soma os valores das transações
  app.get('/summary', async () => {
    const summary = await knex('transactions').sum('amount', { as: 'amount' })
      .first

    return { summary }
  })

  // Procura uma transação unica
  app.get('/:id', async (req: fastify.request) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionParamsSchema.parse(req.params)

    const transaction = await knex('transactions').where('id', id).first()

    return { transaction }
  })

  // Cria uma nova transação
  app.post('/', async (req: fastify.request, reply: fastify.reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(req.body)

    let sessionId = req.cookies.sessionId

    if (!sessionId) {
      sessionId = crypto.randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 dias
      })
    }

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
