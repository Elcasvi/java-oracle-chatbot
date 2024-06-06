export const UserModel2 = [
    {
        id: 1,
        name: "Emily Johnson",
        email: "emily.johnson@example.com",
        password: "securepassword123",
        role: "Marketing Manager",
        tasks: [
            {
                id: 1,
                name: "Plan social media campaign",
                description: "Plan and schedule posts for the upcoming social media campaign",
                lastUpdated: "2024-06-01T09:30:00.000Z",
                priority: "HIGH",
                state: "IN PROGRESS",
                userId: 1
            },
            {
                id: 2,
                name: "Create email newsletter",
                description: "Design and create the monthly email newsletter for subscribers",
                lastUpdated: "2024-06-05T14:00:00.000Z",
                priority: "MEDIUM",
                state: "TODO",
                userId: 1
            }
        ]
    },
    {
        id: 2,
        name: "David Lee",
        email: "david.lee@example.com",
        password: "password456",
        role: "Human Resources Manager",
        tasks: [
            {
                id: 3,
                name: "Schedule interviews",
                description: "Schedule interviews for the open positions in the company",
                lastUpdated: "2024-06-02T11:15:00.000Z",
                priority: "HIGH",
                state: "TODO",
                userId: 2
            },
            {
                id: 4,
                name: "Review employee performance",
                description: "Review employee performance evaluations and provide feedback",
                lastUpdated: "2024-06-07T16:30:00.000Z",
                priority: "MEDIUM",
                state: "IN PROGRESS",
                userId: 2
            },
            {
                id: 5,
                name: "Organize team building event",
                description: "Plan and organize a team building event for the company",
                lastUpdated: "2024-06-10T10:00:00.000Z",
                priority: "LOW",
                state: "TODO",
                userId: 2
            }
        ]
    },
    {
        id: 3,
        name: "Sophia Martinez",
        email: "sophia.martinez@example.com",
        password: "mysecurepassword",
        role: "Product Manager",
        tasks: [
            {
                id: 6,
                name: "Define product roadmap",
                description: "Define the product roadmap for the next release cycle",
                lastUpdated: "2024-06-03T14:45:00.000Z",
                priority: "HIGH",
                state: "IN PROGRESS",
                userId: 3
            },
            {
                id: 7,
                name: "Gather customer feedback",
                description: "Gather feedback from customers on the current product features",
                lastUpdated: "2024-06-08T09:00:00.000Z",
                priority: "MEDIUM",
                state: "TODO",
                userId: 3
            },
            {
                id: 8,
                name: "Conduct user testing",
                description: "Conduct user testing for the new product features",
                lastUpdated: "2024-06-12T13:30:00.000Z",
                priority: "HIGH",
                state: "TODO",
                userId: 3
            }
        ]
    }
];