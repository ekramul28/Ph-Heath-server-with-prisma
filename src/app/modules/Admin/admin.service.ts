import { Prisma, PrismaClient } from "@prisma/client";
import { adminSearchAbleFields } from "./admin.constant";

const prisma = new PrismaClient();

const getAdminFromDB = async (params: any) => {
  const { searchTerm, ...filterData } = params;
  if (Object.keys(filterData).length > 0) {
    AND: Object.keys(filterData).map((key) => ({
      [key]: {
        equals: (filterData as any)[key],
      },
    }));
  }

  console.log(params);
  const andCondition: Prisma.AdminWhereInput[] = [];
  if (params.searchTerm) {
    andCondition.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  const whereConditions: Prisma.AdminWhereInput = { AND: andCondition };
  const result = await prisma.admin.findMany({
    where: whereConditions,
  });
  return result;
};

export const AdminService = {
  getAdminFromDB,
};
