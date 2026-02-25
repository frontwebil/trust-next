-- CreateTable
CREATE TABLE "IpGeo" (
    "id" SERIAL NOT NULL,
    "ip" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IpGeo_pkey" PRIMARY KEY ("id")
);
