import { useNode, Element } from "@craftjs/core";
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserText } from "../Text/Text";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserButton } from "../button/Button";

export const UserTable = () => {
    const {
        connectors: { connect, drag },
    } = useNode();

    return (
        <div ref={(ref) => connect(drag(ref))} className="w-full">
            <div className="flex justify-between items-end mb-6">
                <div className="grid gap-0.5 ml-3 mt-3">
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
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead className="hidden sm:table-cell">Type</TableHead>
                        <TableHead className="hidden sm:table-cell">Status</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="bg-accent">
                        <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                                liam@example.com
                            </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">Sale</TableCell>
                        <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                                Fulfilled
                            </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <div className="font-medium">Olivia Smith</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                                olivia@example.com
                            </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">Refund</TableCell>
                        <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="outline">
                                Declined
                            </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">2023-06-24</TableCell>
                        <TableCell className="text-right">$150.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <div className="font-medium">Noah Williams</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                                noah@example.com
                            </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                            Subscription
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                                Fulfilled
                            </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">2023-06-25</TableCell>
                        <TableCell className="text-right">$350.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <div className="font-medium">Emma Brown</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                                emma@example.com
                            </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">Sale</TableCell>
                        <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                                Fulfilled
                            </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">2023-06-26</TableCell>
                        <TableCell className="text-right">$450.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                                liam@example.com
                            </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">Sale</TableCell>
                        <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                                Fulfilled
                            </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                                liam@example.com
                            </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">Sale</TableCell>
                        <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                                Fulfilled
                            </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <div className="font-medium">Olivia Smith</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                                olivia@example.com
                            </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">Refund</TableCell>
                        <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="outline">
                                Declined
                            </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">2023-06-24</TableCell>
                        <TableCell className="text-right">$150.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <div className="font-medium">Emma Brown</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                                emma@example.com
                            </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">Sale</TableCell>
                        <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                                Fulfilled
                            </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">2023-06-26</TableCell>
                        <TableCell className="text-right">$450.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

UserTable.craft = {
    displayName: 'Table'
}