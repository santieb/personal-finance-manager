import { PrismaClient } from '@prisma/client'
import { encrypt } from '../src/auth/utils/bcrypt.js'
const prisma = new PrismaClient()

async function main () {
  await prisma.user.create({
    data: {
      name: 'test',
      email: 'testing@gmail.com',
      password: await encrypt('test'),
      isAdmin: true
    }
  })

  await prisma.category.createMany({
    data: [
      { categoryName: 'Deport', image: 'https://cdn-icons-png.flaticon.com/512/857/857455.png' },
      { categoryName: 'Food', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgNwM0CTT7gBjvtI3x_g1eHu5qKMzHTjoWNg&usqp=CAU' },
      { categoryName: 'Job', image: 'https://cdn.icon-icons.com/icons2/522/PNG/512/briefcase_icon-icons.com_52358.png' },
      { categoryName: 'Entertainment', image: 'https://cdn-icons-png.flaticon.com/512/2560/2560580.png' }
    ],
    skipDuplicates: true
  })
}

main()
  .then(async () => {
    console.log('data saved')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
