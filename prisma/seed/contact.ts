import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const numContacts = 1000;
  const userId = 1;
  const locations = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Vung Tau',
    'Ho Chi Minh',
    'Binh Dinh',
    'Iran',
    'Réunion',
    'Curaçao',
  ];
  const tools = ['Zalo', 'SMS', 'Email', 'Whats App'];
  const names = [
    'John Doe',
    'Jane Smith',
    'Robert Brown',
    'Emily White',
    'Michael Green',
  ];

  for (let i = 0; i < numContacts; i++) {
    const randomLocation =
      locations[Math.floor(Math.random() * locations.length)];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomTool = tools[Math.floor(Math.random() * tools.length)];
    const name = `${randomName} ${i + 1}`;
    const phone = `(${Math.floor(Math.random() * 900) + 100}) 555-${Math.floor(
      Math.random() * 9000,
    )
      .toString()
      .padStart(4, '0')}`;
    const email = `${name.toLowerCase().replace(/\s/g, '')}@example.com`;
    const status = Math.random() < 0.5 ? 'active' : 'inactive';

    await prisma.contact.create({
      data: {
        user_id: userId,
        name: name,
        tool: randomTool,
        phone: phone,
        email: email,
        location: randomLocation,
        first_time_contact: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
        last_time_contact: new Date(Date.now() - i * 12 * 60 * 60 * 1000),
        sales: (Math.floor(Math.random() * 1000) + 1).toString(),
        status,
        type: 'Lead',
        products: 'Product A, Product B',
        services: 'Service X',
        created_at: new Date(),
        updated_at: new Date(),
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
