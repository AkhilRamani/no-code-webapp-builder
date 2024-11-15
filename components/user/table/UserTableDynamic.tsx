import { useNode, Element } from "@craftjs/core";
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from 'date-fns';
import { UserText } from "../Text/Text";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserButton } from "../button/Button";
import { tableData_DUMMY } from "@/lib/apis/getTableData_DUMMY";
import { UserTableSettings } from "./UserTableSettings";
import { UserTableProps } from "./types";
import { useTableStore } from "@/lib/store/useTableStore";
import { useEffect, useMemo } from "react";
import { useTableDataStore } from "@/lib/store/useTableDataStore";
import { TableFormDialog } from "./formDialog/TableFormDialog";
import { TableLayout } from "./components/TableLayout";
import { useParams } from "next/navigation";

const formatTimestamp = (timestamp: number) => {
	return format(new Date(timestamp), 'dd MMM yyyy');
};

export const UserTableDynamic = ({ dataSource }: UserTableProps) => {
	const { connectors: { connect, drag } } = useNode();

	const { tables } = useTableStore();
	const table = useMemo(() => tables.find((table) => table.id === dataSource), [dataSource, tables])

	const initTableData = useTableDataStore(state => state.initTableData);
	const { projectId } = useParams<{ projectId: string }>();
	useEffect(() => {
		if (table) {
			// console.log({ dataSource, table })
			initTableData(projectId, dataSource, table.tableName);
		}
	}, [table]);

	return (
		<div ref={(ref) => connect(drag(ref))} className="w-full">
			<div className="flex justify-between items-end mb-6 mx-4">
				<div className="grid gap-0.5 mt-3">
					{/* <CardTitle> */}
					<Element id="table-title" is={UserText} text="Orders" classNames={{ fontSize: 'text-2xl', thickNess: 'font-semibold' }} />
					{/* </CardTitle> */}
					{/* <CardDescription> */}
					<Element id="table-desc" is={UserText} text="Recent orders from your store." classNames={{ fontSize: 'text-sm', all: 'tracking-wide !opacity-55' }} />
					{/* </CardDescription> */}
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
						projectId={projectId}
						tableId={dataSource}
					>
						<Element id='table-add-btn' is={UserButton} size="sm" icon="NotebookPen" label="Add" />
					</TableFormDialog>
				</div>
			</div>

			{dataSource !== 'Dummy' && <TableLayout dataSource={dataSource} table={table} projectId={projectId} />}

			{dataSource === 'Dummy' && <Table>
				<TableHeader className="sticky top-0 bg-muted/50 tracking-wide">
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
						tableData_DUMMY?.map((row, index) => (
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
					}
				</TableBody>
			</Table>}
			{/* :
                            loading ?

                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <Loader2 className="animate-spin ease-in-out m-auto" />
                                    </TableCell>
                                </TableRow>

                                :
                                tableData?.data.length ?
                                    tableData?.data.map((row, index) => (
                                        <TableRow key={`${index}-tr`} className="text-nowrap">
                                            {
                                                table?.fields.map((field, cellIndex) => {
                                                    const value = row[field.columnName];

                                                    if (typeof value === 'boolean') return (
                                                        <TableCell key={`${index}-${cellIndex}-td`}>
                                                            {value ? <Check className="w-5 h-5 text-green-700" /> : <X className="w-5 h-5 text-red-500" />}
                                                        </TableCell>
                                                    )
                                                    return (
                                                        <TableCell key={`${index}-${cellIndex}-td`}>
                                                            {row[field.columnName]}
                                                        </TableCell>
                                                    )
                                                })
                                            }
                                        </TableRow>
                                    ))
                                    :
                                    <TableRow>
                                        <TableCell colSpan={table?.fields.length} align="center">
                                            <Frown className="w-5 h-5 mb-2 text-muted-foreground" />
                                            <p className="text-muted-foreground tracking-wider">Nothing added yet</p>
                                        </TableCell>
                                    </TableRow>
                     */}
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