-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cohort" TEXT,
    "courses" JSONB NOT NULL,
    "dateJoined" TIMESTAMP(3),
    "lastLogin" TIMESTAMP(3),
    "status" TEXT,
    "academicYear" TEXT,
    "category" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);
