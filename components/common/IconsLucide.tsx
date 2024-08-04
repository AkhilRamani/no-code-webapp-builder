import { icons } from "lucide-react";

type LucideIconProps = {
    name?: string,
    className?: string
}

export const IconsLucide = ({ name, ...rest }: LucideIconProps) => {

    const LucideIcon = icons[name ?? 'BoxSelect'];

    return LucideIcon && <LucideIcon {...rest} />;
}