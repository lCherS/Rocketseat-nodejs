import fastfy from 'fastify';

const app = fastfy();

app.get('/hello', () => {
  return 'Hello World'
})

app.listen({
  port: 3333
}).then(() => {
  console.log('http server running')
})