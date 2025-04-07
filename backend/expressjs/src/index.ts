// src/index.ts
import express from 'express'
import shortenRouter from './routes/shorten'
import redirectRouter from './routes/redirect'

const app = express()

app.use(express.json())


app.use('/api/shorten', shortenRouter) // ✅ No () here
app.use('/', redirectRouter) // Route for http://localhost:3000/:shortcode

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000')
})
