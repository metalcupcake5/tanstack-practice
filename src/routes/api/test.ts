// routes/hello.ts
import { createFileRoute } from '@tanstack/react-router'
import { env } from 'cloudflare:workers'

export const Route = createFileRoute('/api/test')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { results } = await env.d1_test
          .prepare('SELECT * FROM Users')
          .run()

        return Response.json(results)
      },
    },
  },
})
