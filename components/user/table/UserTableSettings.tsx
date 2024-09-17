import { useNode } from "@craftjs/core";
import { DataSourceSetting } from "./settings/DataSourceSetting"
import { UserTableProps } from "./types";

export const UserTableSettings = () => {
    const {
        actions: { setProp },
        dataSource
    } = useNode<UserTableProps>((node) => ({
        dataSource: node.data.props.dataSource,
    }));

    return (
        <div className="px-4 pt-6 grid gap-6">
            <DataSourceSetting selected={dataSource} onChange={tableId => setProp((props: UserTableProps) => props.dataSource = tableId)} />
        </div>
    )
}