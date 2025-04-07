// src/routes/shorten.ts
import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.post('/', async (req: Request, res: Response) => {
  try {
    const { originalUrl, customCode } = req.body
    // const shortCode = customCode || Math.random().toString(36).substr(2, 8)
    let shortCode = Math.random().toString(36).substring(2, 8)

    // ⚠️ Check uniqueness to avoid collision
    while (await prisma.url.findUnique({ where: { shortCode } })) {
      shortCode = Math.random().toString(36).substring(2, 8)
    }

    const newUrl = await prisma.url.create({
      data: {
        originalUrl,
        shortCode,
      },
    })

    return res.status(201).json(newUrl)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
})

export default router
