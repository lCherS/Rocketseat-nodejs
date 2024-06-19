// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = fastify()

app.register(transactionsRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('http server running')
  })
