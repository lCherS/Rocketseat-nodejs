// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './database'

const app = fastify()

app.get('/hello', async () => {
  const transaction = await knex('transactions').insert({
    id: crypto.randomUUID(),
    title: 'Transação de teste',
    amount: 55,
  })

  return transaction
})

app.get('/transaction', async () => {
  const transactions = await knex('transactions').select('*')

  return transactions
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('http server running')
  })
