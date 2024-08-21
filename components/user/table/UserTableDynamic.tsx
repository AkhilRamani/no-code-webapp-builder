import { useNode, Element } from "@craftjs/core";
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserText } from "../Text/Text";
import { Loader, Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserButton } from "../button/Button";
import { getTableData } from "@/lib/apis/getTableData";

import { format } from 'date-fns';

const formatTimestamp = (timestamp: number) => {
    return format(new Date(timestamp), 'dd MMM yyyy');
};

export const UserTableDynamic = () => {
    const {
        connectors: { connect, drag },
    } = useNode();

    const { data, loading } = getTableData()

    return (
        <div ref={(ref) => connect(drag(ref))} className="w-full">
            <div className="flex justify-between items-end mb-6 mx-4">
                <div className="grid gap-0.5 mt-3">
                    <CardTitle>
                        <Element id="table-title" is={UserText} text="Orders" classNames={{ fontSize: 'text-2xl', thickNess: 'font-semibold' }} />
                    </CardTitle>
                    <CardDescription>
                        <Element id="table-desc" is={UserText} text="Recent orders from your store." classNames={{ fontSize: 'text-sm' }} />
                    </CardDescription>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search customers..."
                            className="pl-9 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                    </div>

                    <Element id='table-add-btn' is={UserButton} size="default" icon="NotebookPen" label="Add" />
                </div>
            </div>
            <Table className="">
                <TableHeader className="sticky top-0 bg-muted/50">
                    <TableRow>
                        <TableHead className="">Customer</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="hidden sm:table-cell">Type</TableHead>
                        <TableHead className="hidden sm:table-cell">Status</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        loading ?

                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Loader2 className="animate-spin ease-in-out m-auto" />
                                </TableCell>
                            </TableRow>

                            : data?.map(row => (
                                <TableRow className="text-nowrap">
                                    <TableCell>
                                        <div className="font-medium">{row.name}</div>
                                    </TableCell>
                                    <TableCell>
                                        {/* <Element id={row.email} is={UserText} text={row.email} /> */}
                                        {/* <UserText text={row.email} /> */}
                                        <div className="hidden text-sm text-muted-foreground md:inline">{row.email}</div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{row.type}</TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge className="text-xs" variant="secondary">
                                            {row.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{formatTimestamp(row.timestamp)}</TableCell>
                                    <TableCell className="text-right">${row.amount}</TableCell>
                                </TableRow>
                            ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

UserTableDynamic.craft = {
    displayName: 'Table D'
}