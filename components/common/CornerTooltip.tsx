import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const CornerTooltip = ({ tip }: { tip: string }) => (
    <Tooltip>
        <TooltipTrigger asChild>
            <div className="bg-primary w-4 h-4 flex justify-center rounded-full text-white text-[10px] absolute -right-2 -top-2 cursor-help">
                ?
            </div>
        </TooltipTrigger>

        <TooltipContent className="text-muted-foreground">
            {tip}
        </TooltipContent>
    </Tooltip>
)