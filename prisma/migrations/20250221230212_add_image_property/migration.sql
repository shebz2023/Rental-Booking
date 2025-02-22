-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "image" TEXT,
ALTER COLUMN "pricePerNight" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL;
