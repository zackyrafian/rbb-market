// import { PrismaClient } from "@prisma/client";

// declare global{ 
//     var prisma: PrismaClient | undefined
// }

// const prisma = global.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== 'production') { 
//     global.prisma = prisma
// }

// export default prisma;

import { PrismaClient } from "@prisma/client";
import 'server-only';

declare global { 
    var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") { 
    prisma = new PrismaClient();
}  else { 
    if (!global.cachedPrisma) { 
        global.cachedPrisma = new PrismaClient();
    }
    prisma = global.cachedPrisma;
}

export const db = prisma;
