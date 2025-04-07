// src/routes/redirect.ts
import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.get('/:shortcode', async (req: Request, res: Response) => {
  const { shortcode } = req.params
  console.log('Received shortcode:', shortcode) // 🐞 Add this

  try {
    const found = await prisma.url.findUnique({
      where: { shortCode: shortcode },
    })

    if (!found) {
      return res.status(404).json({ error: 'Short URL not found' })
    }

    // For real redirect:
    return res.redirect(found.originalUrl)

    // For test/demo purposes:
    return res.status(200).json(found)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
})

export default router
