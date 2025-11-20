import { faker } from "@faker-js/faker";
import prisma from "@/prisma/prisma";
import { Prisma } from "@prisma/client"; // 👈 import Prisma types

async function main() {
  const designerId = "RA672048618";
  const totalProducts = 30;
  const batchSize = 10;

  for (let i = 0; i < totalProducts; i++) {
    console.log("inside for loop")
    const shopIndex = Math.floor(i / batchSize);
    const shopName = `dummy-shop-${shopIndex + 1}.myshopify.com`;

    const royaltyAmountINR = faker.number.float({ min: 100, max: 200});
    const usdAmount = royaltyAmountINR / 88;

   const product= await prisma.productRoyalty.create({
      data: {
        productId: faker.string.numeric(12),
        shopifyId: faker.string.numeric(12),
        title: faker.commerce.productName(),
        image: faker.image.urlLoremFlickr({ category: "product" }),
        status: faker.helpers.arrayElement(["active", "inactive"]),
        inArchive: false,
        designerId,
        royality: faker.number.int({ min: 5, max: 30 }),
        shop: shopName,
        totalSold: faker.number.int({ min: 1, max: 50 }),
        price: {
          amount: faker.number.float({ min: 5, max: 50}),
          currency: "USD",
          storeCurrency: "INR",
          storeAmount: faker.number.float({ min: 500, max: 5000 }),
        } as Prisma.JsonObject, // 👈 cast JSON
        totalRoyaltyEarned: {
          amount: royaltyAmountINR,
          currency: "INR",
          usdAmount: usdAmount,
        } as Prisma.JsonObject, // 👈 cast JSON
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    console.log("product:",product)
  }
  console.log(`${totalProducts} dummy products inserted for ${designerId}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
