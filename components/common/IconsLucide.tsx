import { icons } from "lucide-react";

type LucideIconProps = {
    name?: string,
    className?: string
}

export const IconsLucide = ({ name, ...rest }: LucideIconProps) => {

    const LucideIcon = icons[(name ?? 'BoxSelect') as keyof typeof icons];

    return LucideIcon && <LucideIcon {...rest} />;
}