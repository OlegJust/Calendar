import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient, Prisma } from '@prisma/client' // добавили prisma

const prisma = new PrismaClient() // создаем призму

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    await prisma.savedDate.delete({
      where: { id: 'savedDate' },
    })
    const saveSavdDate = await prisma.savedDate.create({
      data: req.body,
    })

    res.status(200).json(saveSavdDate)
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' })
  }
}
