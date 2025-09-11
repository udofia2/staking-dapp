import * as React from "react"
import { Info } from "lucide-react"
import { cn } from "../../lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

interface InfoTooltipProps {
  content: string | React.ReactNode
  className?: string
  iconClassName?: string
  side?: "top" | "bottom" | "left" | "right"
  children?: React.ReactNode
}

export function InfoTooltip({ 
  content, 
  className, 
  iconClassName,
  side = "top",
  children 
}: InfoTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className={cn("inline-flex items-center", className)}>
          {children || (
            <Info 
              className={cn(
                "h-4 w-4 text-muted-foreground hover:text-foreground transition-colors cursor-help",
                iconClassName
              )} 
            />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent 
        side={side}
        className="max-w-[280px] bg-popover text-popover-foreground border"
      >
        <div className="space-y-1 text-sm">
          {typeof content === 'string' ? (
            <p>{content}</p>
          ) : (
            content
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  )
}