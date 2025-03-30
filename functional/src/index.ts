import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { authMiddleware } from './middleware/auth.js';
import { etag } from 'hono/etag'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { bodyLimit } from 'hono/body-limit'
import { secureHeaders } from 'hono/secure-headers'
import userRoutes from './controllers/user.js'
import apiRoutes from './controllers/api.js'

const app = new Hono()
app.use(etag(), logger(), secureHeaders())


app.use('/api/*', cors({
  origin: ['http://localhost:3000']
}))

app.use('/api/*', authMiddleware);

app.use('*', bodyLimit({
  maxSize: 50 * 1024, // 50kb
  onError: (c) => {
    return c.text('overflow :(', 413)
  },
}))

app.route('/', userRoutes)
app.route('/api/', apiRoutes)

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

/*serve({
  fetch: app.fetch,
  port
})*/

export default app;
