import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "../../lib/utils"

function TooltipProvider({
  delayDuration = 200,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 8,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          
          "relative z-50 overflow-hidden rounded-xl border border-primary/20",
          "bg-gradient-to-br from-popover via-popover to-popover/80",
          "px-4 py-3 text-popover-foreground",
          "backdrop-blur-md shadow-2xl",
          
          
          "animate-in fade-in-0 zoom-in-95 duration-200",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-150",
          
          
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2", 
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          
          
          "max-w-[280px] md:max-w-[320px]",
          "text-balance text-sm font-medium leading-relaxed",
          
          className
        )}
        {...props}
      >
        {/* Content with enhanced styling */}
        <div className="relative">
          {children}
          
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 pointer-events-none rounded-lg" />
        </div>
        
        {/* Enhanced arrow with gradient */}
        <TooltipPrimitive.Arrow 
          className={cn(
            "fill-popover stroke-primary/20 stroke-1",
            "drop-shadow-sm",
            "z-50 size-3 rotate-45 rounded-sm"
          )} 
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }