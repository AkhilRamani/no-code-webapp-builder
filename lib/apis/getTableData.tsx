import { useEffect, useState } from "react";

export const getTableData = () => {
    const tableData = [
        {
            name: "Liam Johnson",
            type: "Sale",
            status: "fulfilled",
            timestamp: 1690848000000, // 2024-08-01
            amount: 250,
            email: "liam.johnson@example.com"
        },
        {
            name: "Emma Smith",
            type: "Sale",
            status: "pending",
            timestamp: 1690934400000, // 2024-08-02
            amount: 150,
            email: "emma.smith@example.com"
        },
        {
            name: "Noah Brown",
            type: "Return",
            status: "fulfilled",
            timestamp: 1691020800000, // 2024-08-03
            amount: 100,
            email: "noah.brown@example.com"
        },
        {
            name: "Olivia Davis",
            type: "Sale",
            status: "canceled",
            timestamp: 1691107200000, // 2024-08-04
            amount: 300,
            email: "olivia.davis@example.com"
        },
        {
            name: "Ava Wilson",
            type: "Sale",
            status: "fulfilled",
            timestamp: 1691193600000, // 2024-08-05
            amount: 200,
            email: "ava.wilson@example.com"
        },
        {
            name: "Isabella Garcia",
            type: "Return",
            status: "pending",
            timestamp: 1691280000000, // 2024-08-06
            amount: 50,
            email: "isabella.garcia@example.com"
        },
        {
            name: "Sophia Martinez",
            type: "Sale",
            status: "fulfilled",
            timestamp: 1691366400000, // 2024-08-07
            amount: 400,
            email: "sophia.martinez@example.com"
        },
        {
            name: "Mason Rodriguez",
            type: "Sale",
            status: "fulfilled",
            timestamp: 1691452800000, // 2024-08-08
            amount: 350,
            email: "mason.rodriguez@example.com"
        },
        {
            name: "Ethan Hernandez",
            type: "Sale",
            status: "canceled",
            timestamp: 1691539200000, // 2024-08-09
            amount: 500,
            email: "ethan.hernandez@example.com"
        },
        {
            name: "James Lee",
            type: "Return",
            status: "fulfilled",
            timestamp: 1691625600000, // 2024-08-10
            amount: 75,
            email: "james.lee@example.com"
        },
        {
            name: "Benjamin Walker",
            type: "Sale",
            status: "pending",
            timestamp: 1691712000000, // 2024-08-11
            amount: 600,
            email: "benjamin.walker@example.com"
        },
        {
            name: "Lucas Hall",
            type: "Sale",
            status: "fulfilled",
            timestamp: 1691798400000, // 2024-08-12
            amount: 450,
            email: "lucas.hall@example.com"
        },
        {
            name: "Charlotte Allen",
            type: "Sale",
            status: "fulfilled",
            timestamp: 1691884800000, // 2024-08-13
            amount: 275,
            email: "charlotte.allen@example.com"
        },
        {
            name: "Amelia Young",
            type: "Return",
            status: "pending",
            timestamp: 1691971200000, // 2024-08-14
            amount: 90,
            email: "amelia.young@example.com"
        },
        {
            name: "Harper King",
            type: "Sale",
            status: "fulfilled",
            timestamp: 1692057600000, // 2024-08-15
            amount: 320,
            email: "harper.king@example.com"
        },
        {
            name: "Ella Wright",
            type: "Sale",
            status: "canceled",
            timestamp: 1692144000000, // 2024-08-16
            amount: 180,
            email: "ella.wright@example.com"
        },
        {
            name: "Scarlett Scott",
            type: "Sale",
            status: "fulfilled",
            timestamp: 1692230400000, // 2024-08-17
            amount: 220,
            email: "scarlett.scott@example.com"
        },
        {
            name: "Grace Green",
            type: "Return",
            status: "fulfilled",
            timestamp: 1692316800000, // 2024-08-18
            amount: 110,
            email: "grace.green@example.com"
        },
        {
            name: "Chloe Adams",
            type: "Sale",
            status: "pending",
            timestamp: 1692403200000, // 2024-08-19
            amount: 360,
            email: "chloe.adams@example.com"
        },
        {
            name: "Zoe Baker",
            type: "Sale",
            status: "fulfilled",
            timestamp: 1692489600000, // 2024-08-20
            amount: 280,
            email: "zoe.baker@example.com"
        },
        {
            name: "Lily Gonzalez",
            type: "Return",
            status: "fulfilled",
            timestamp: 1692576000000, // 2024-08-21
            amount: 95,
            email: "lily.gonzalez@example.com"
        }
    ];

    const [data, setData] = useState<typeof tableData>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setData(tableData)
            setLoading(false)
        }, 3000)
    }, [])

    return { data, loading }
}