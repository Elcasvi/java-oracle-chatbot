export const UserModel=[
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
    }
]