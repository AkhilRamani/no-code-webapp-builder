import { useNode, Element } from "@craftjs/core";
import { Badge } from "@/components/ui/badge"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from 'date-fns';
import { UserText } from "../Text/Text";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserButton } from "../button/Button";
import { getTableData_DUMMY } from "@/lib/apis/getTableData_DUMMY";
import { UserTableSettings } from "./UserTableSettings";
import { UserTableProps } from "./types";
import { useTableStore } from "@/lib/store/useTableStore";
import { useEffect, useMemo } from "react";
import { useTableDataStore } from "@/lib/store/useTableDataStore";
import { TableFormDialog } from "./formDialog/tableFormDialog";

const formatTimestamp = (timestamp: number) => {
    return format(new Date(timestamp), 'dd MMM yyyy');
};

export const UserTableDynamic = ({ dataSource }: UserTableProps) => {
    const {
        connectors: { connect, drag },
    } = useNode();

    const { data } = getTableData_DUMMY()

    const { tables } = useTableStore();
    const table = useMemo(() => tables.find((table) => table.id === dataSource), [dataSource, tables])

    const tableData = useTableDataStore(state => state.tableData[dataSource]);
    const loading = useTableDataStore(state => state.loading);

    const initTableData = useTableDataStore(state => state.initTableData);

    useEffect(() => {
        if (table) {
            console.log({ dataSource, table })
            initTableData(dataSource, table.tableName);
        }
    }, [table]);

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

                    <TableFormDialog
                        title={`Add to ${table?.tableName}`}
                        fields={table?.fields || []}
                    >
                        <Element id='table-add-btn' is={UserButton} size="sm" icon="NotebookPen" label="Add" />
                    </TableFormDialog>
                </div>
            </div>
            <Table className="">
                <TableHeader className="sticky top-0 bg-muted/50">
                    <TableRow>
                        {dataSource === 'Dummy' && <>
                            <TableHead className="">Customer</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="hidden sm:table-cell">Type</TableHead>
                            <TableHead className="hidden sm:table-cell">Status</TableHead>
                            <TableHead className="hidden md:table-cell">Date</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </>}
                        {
                            table?.fields.map((column, index) => (
                                <TableHead key={`${column.columnName}-${index}`}>{column.columnName}</TableHead>
                            ))
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        dataSource === 'Dummy' ?
                            data?.map((row, index) => (
                                <TableRow key={`${index}-tr`} className="text-nowrap">
                                    <TableCell className="font-medium">{row.name}</TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {/* <Element id={row.email} is={UserText} text={row.email} /> */}
                                        {/* <UserText text={row.email} /> */}
                                        {row.email}
                                    </TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>
                                        <Badge className="text-xs" variant="secondary">
                                            {row.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{formatTimestamp(row.timestamp)}</TableCell>
                                    <TableCell className="text-right">${row.amount}</TableCell>
                                </TableRow>
                            ))
                            :
                            loading ?

                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <Loader2 className="animate-spin ease-in-out m-auto" />
                                    </TableCell>
                                </TableRow>

                                :
                                tableData?.data.map((row, index) => (
                                    <TableRow key={`${index}-tr`} className="text-nowrap">
                                        {row.data.map((field: string, cellIndex: number) => (
                                            <TableCell key={`${index}-${cellIndex}-td`}>
                                                {field}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

UserTableDynamic.craft = {
    displayName: 'Table D',
    props: {
        dataSource: 'Dummy'
    },
    related: {
        settings: UserTableSettings,
    },
}