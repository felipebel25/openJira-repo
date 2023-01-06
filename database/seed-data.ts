

interface SeedData {
    entries: SeedEntry[];
}


interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}




export const seedData: SeedData = {
    entries: [
        {
            description: "Pendiente: estoy",
            status: "pending",
            createdAt: Date.now() - 100
        },
        {
            description: "In-progess: loren",
            status: "in-progress",
            createdAt: Date.now() - 10000000000000
        },
        {
            description: "Terminadas: loren",
            status: "finished",
            createdAt: Date.now() - 1000000
        },
    ]
}