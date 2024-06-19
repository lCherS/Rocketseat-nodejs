// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSessionIdExists(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = req.cookies.sessionId

  if (!sessionId) {
    return reply.status(401).send({
      error: 'Unauthorized access',
    })
  }
}
