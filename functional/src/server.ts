import { serve } from '@hono/node-server'
import App from './index.js'

serve({
  fetch: App.fetch,
  port: 3000
})

