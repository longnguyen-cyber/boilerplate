import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const rowSeed = 1000;
  const userId: number = 1;

  const names = [
    'John Doe',
    'Jane Smith',
    'Robert Brown',
    'Emily White',
    'Michael Green',
  ];

  const messages = [
    'Hello, how are you?',
    'I am interested in your product',
    'Please call me back',
    'Can you send me more information?',
    'I want to know more about your service',
  ];

  for (let i = 0; i < rowSeed; i++) {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const name = `${randomName} ${i + 1}`;

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const type = Math.random() < 0.5 ? 'public' : 'draft';
    const isDeleted = Math.random() < 0.5 ? true : false;

    await prisma.message.create({
      data: {
        name: name,
        message: randomMessage,
        user_id: userId,
        type: type,
        deleted_at: isDeleted ? new Date() : null,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
