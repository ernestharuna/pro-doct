import { faker } from '@faker-js/faker';
import { writeFileSync } from 'node:fs';

const count = Number(process.argv[2] ?? 1000);
const categories = ['electronics', 'books', 'clothing', 'home', 'sports', 'toys'];
faker.seed(42); // same data on every run

const products = Array.from({ length: count }, (_, i) => {
  const id = String(i + 1);
  return {
    id,
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price({ min: 1, max: 2000 })),
    category: faker.helpers.arrayElement(categories),
    rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
    stock: faker.number.int({ min: 0, max: 200 }),
    imageUrl: `https://picsum.photos/seed/${id}/800/800`,
    thumbnailUrl: `https://picsum.photos/seed/${id}/300/300`,
  };
});

const users = [
  { id: '1', email: 'admin@prodoct.dev', password: 'admin123', role: 'admin', name: 'Admin' },
  { id: '2', email: 'user@prodoct.dev', password: 'user123', role: 'user', name: 'Test User' },
];

const db = { users, categories: categories.map((id) => ({ id, name: id })), products };
writeFileSync(new URL('./db.json', import.meta.url), JSON.stringify(db));
console.log(`Seeded ${count} products`);