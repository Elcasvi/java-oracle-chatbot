export const UserModel = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        password: "secure_password",
        role: "Developer",
        tasks: [
            {
                id: 1,
                name: "Buy milk",
                description: "Don't forget to buy milk from the store",
                lastUpdated: "2024-04-15T08:06:00.000Z",
                priority: "LOW",
                state: "TODO",
                userId: 1
            },
            {
                id: 2,
                name: "Buy Bread",
                description: "Don't forget to buy bread from the store",
                lastUpdated: "2024-05-15T08:06:00.000Z",
                priority: "HIGH",
                state: "DONE",
                userId: 1
            }
        ]
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        password: "another_secure_password",
        role: "Designer",
        tasks: [
            {
                id: 3,
                name: "Design homepage",
                description: "Create a new design for the homepage",
                lastUpdated: "2024-04-20T08:06:00.000Z",
                priority: "HIGH",
                state: "IN PROGRESS",
                userId: 2
            },
            {
                id: 4,
                name: "Design logo",
                description: "Create a new logo for the company",
                lastUpdated: "2024-04-25T08:06:00.000Z",
                priority: "MEDIUM",
                state: "TODO",
                userId: 2
            },
            {
                id: 5,
                name: "Design banner",
                description: "Create a new banner for the website",
                lastUpdated: "2024-04-25T08:06:00.000Z",
                priority: "MEDIUM",
                state: "TODO",
                userId: 2
            }
        ]
    },
    {
        id: 3,
        name: "Javier Perez",
        email: "javier.per@example.com",
        password: "another_secure_password",
        role: "Designer",
        tasks: [
            {
                id: 6,
                name: "Design homepage",
                description: "Create a new design for the homepage",
                lastUpdated: "2024-04-20T08:06:00.000Z",
                priority: "HIGH",
                state: "IN PROGRESS",
                userId: 3
            },
            {
                id: 7,
                name: "Design logo",
                description: "Create a new logo for the company",
                lastUpdated: "2024-04-25T08:06:00.000Z",
                priority: "MEDIUM",
                state: "TODO",
                userId: 3
            },
            {
                id: 8,
                name: "Design business card",
                description: "Create a new business card design",
                lastUpdated: "2024-04-25T08:06:00.000Z",
                priority: "LOW",
                state: "DONE",
                userId: 3
            }
        ]
    },
    {
        id: 4,
        name: "Emilio Tejeda",
        email: "emi.tejeda@example.com",
        password: "another_secure_password",
        role: "Aguador",
        tasks: [
            {
                id: 9,
                name: "Deliver packages",
                description: "Deliver packages to customers",
                lastUpdated: "2024-04-20T08:06:00.000Z",
                priority: "HIGH",
                state: "IN PROGRESS",
                userId: 4
            },
            {
                id: 10,
                name: "Pick up orders",
                description: "Pick up orders from the warehouse",
                lastUpdated: "2024-04-25T08:06:00.000Z",
                priority: "MEDIUM",
                state: "TODO",
                userId: 4
            },
            {
                id: 11,
                name: "Water delivery",
                description: "Deliver water to the specified locations",
                lastUpdated: "2024-04-25T08:06:00.000Z",
                priority: "LOW",
                state: "DONE",
                userId: 4
            }
        ]
    },
    {
        id: 5,
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        password: "password123",
        role: "Project Manager",
        tasks: [
            {
                id: 12,
                name: "Schedule team meeting",
                description: "Schedule a team meeting to discuss the project timeline",
                lastUpdated: "2024-05-01T08:06:00.000Z",
                priority: "HIGH",
                state: "TODO",
                userId: 5
            },
            {
                id: 13,
                name: "Review project requirements",
                description: "Review the project requirements and ensure they are up-to-date",
                lastUpdated: "2024-05-02T08:06:00.000Z",
                priority: "MEDIUM",
                state: "IN PROGRESS",
                userId: 5
            },
            {
                id: 14,
                name: "Create project report",
                description: "Create a report on the project progress and share it with stakeholders",
                lastUpdated: "2024-05-05T08:06:00.000Z",
                priority: "LOW",
                state: "TODO",
                userId: 5
            }
        ]
    },
    {
        id: 6,
        name: "Michael Brown",
        email: "michael.brown@example.com",
        password: "securepassword",
        role: "Sales Representative",
        tasks: [
            {
                id: 15,
                name: "Follow up with leads",
                description: "Follow up with potential leads and schedule meetings",
                lastUpdated: "2024-05-03T08:06:00.000Z",
                priority: "HIGH",
                state: "IN PROGRESS",
                userId: 6
            },
            {
                id: 16,
                name: "Prepare sales presentation",
                description: "Prepare a sales presentation for a potential client",
                lastUpdated: "2024-05-04T08:06:00.000Z",
                priority: "MEDIUM",
                state: "TODO",
                userId: 6
            },
            {
                id: 17,
                name: "Attend networking event",
                description: "Attend a networking event to meet potential clients",
                lastUpdated: "2024-05-07T08:06:00.000Z",
                priority: "LOW",
                state: "DONE",
                userId: 6
            }
        ]
    }
];
