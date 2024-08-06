import { useNode } from "@craftjs/core";
import { TextSizeSetting } from "./settings/TextSizeSetting"
import { UserTextClassNames, UserTextProps } from "./types";
import { TextThicknessSetting } from "./settings/TextStyleSetting";

export const TextSettings = () => {
    const {
        actions: { setProp },
        classNames
    } = useNode((node) => ({
        fontSize: node.data.props.fontSize,
        classNames: node.data.props.classNames as UserTextClassNames,
    }));

    const setClassName = (name: keyof UserTextClassNames, value: string) => setProp((props: UserTextProps) => (props.classNames = { ...props.classNames, [name]: value }));

    return (
        <div className="px-4 flex flex-col gap-6 pt-5">
            <TextSizeSetting selected={classNames?.fontSize ?? 'text-base'} onChange={(selectedSize) => setClassName('fontSize', selectedSize)} />
            <TextThicknessSetting selected={classNames?.thickNess ?? 'font-normal'} onChange={(selectedValue) => setClassName('thickNess', selectedValue)} />
        </div>
    );
};