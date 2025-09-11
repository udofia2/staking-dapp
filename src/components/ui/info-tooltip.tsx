import * as React from "react"
import { Info, HelpCircle, Sparkles } from "lucide-react"
import { cn } from "../../lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

interface InfoTooltipProps {
  content: string | React.ReactNode
  className?: string
  iconClassName?: string
  side?: "top" | "bottom" | "left" | "right"
  children?: React.ReactNode
  variant?: "default" | "help" | "premium" | "success" | "warning"
  size?: "sm" | "md" | "lg"
}

export function InfoTooltip({ 
  content, 
  className, 
  iconClassName,
  side = "top",
  children,
  variant = "default",
  size = "sm"
}: InfoTooltipProps) {
  
  const getIcon = () => {
    switch (variant) {
      case "help":
        return HelpCircle;
      case "premium":
        return Sparkles;
      case "success":
        return Info;
      case "warning":
        return Info;
      default:
        return Info;
    }
  };

  const getIconStyles = () => {
    const baseStyles = "transition-all duration-300 cursor-help";
    const sizeStyles = {
      sm: "h-4 w-4",
      md: "h-5 w-5", 
      lg: "h-6 w-6"
    };

    switch (variant) {
      case "help":
        return cn(
          baseStyles,
          sizeStyles[size],
          "text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300",
          iconClassName
        );
      case "premium":
        return cn(
          baseStyles,
          sizeStyles[size],
          "text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300",
          iconClassName
        );
      case "success":
        return cn(
          baseStyles,
          sizeStyles[size],
          "text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300",
          iconClassName
        );
      case "warning":
        return cn(
          baseStyles,
          sizeStyles[size],
          "text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300",
          iconClassName
        );
      default:
        return cn(
          baseStyles,
          sizeStyles[size],
          "text-muted-foreground hover:text-primary dark:hover:text-primary/80",
          iconClassName
        );
    }
  };

  const getTriggerStyles = () => {
    const baseStyles = "inline-flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110";
    
    switch (variant) {
      case "premium":
        return cn(
          baseStyles,
          "hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/20",
          className
        );
      case "success":
        return cn(
          baseStyles,
          "hover:bg-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20",
          className
        );
      case "warning":
        return cn(
          baseStyles,
          "hover:bg-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20",
          className
        );
      case "help":
        return cn(
          baseStyles,
          "hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20",
          className
        );
      default:
        return cn(
          baseStyles,
          "hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20",
          className
        );
    }
  };

  const Icon = getIcon();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className={getTriggerStyles()}>
          {children || (
            <Icon className={getIconStyles()} />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent 
        side={side}
        className={cn(
          "max-w-[320px] p-4 bg-gradient-to-br from-background via-background to-muted/30",
          "border border-primary/20 shadow-2xl backdrop-blur-md",
          "animate-in fade-in-0 zoom-in-95 duration-200",
          variant === "premium" && "border-purple-500/30 shadow-purple-500/10",
          variant === "success" && "border-emerald-500/30 shadow-emerald-500/10", 
          variant === "warning" && "border-amber-500/30 shadow-amber-500/10",
          variant === "help" && "border-blue-500/30 shadow-blue-500/10"
        )}
      >
        <div className="space-y-2">
          {typeof content === 'string' ? (
            <div className="space-y-2">
              {/* Enhanced text styling */}
              <p className="text-sm font-medium leading-relaxed text-foreground">
                {content}
              </p>
              {variant === "premium" && (
                <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
                  <Sparkles className="h-3 w-3" />
                  <span className="font-medium">Premium Feature</span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-sm leading-relaxed">
              {content}
            </div>
          )}
          
          {/* Subtle accent line */}
          <div className={cn(
            "h-0.5 w-full rounded-full bg-gradient-to-r opacity-30",
            variant === "premium" && "from-purple-500 to-purple-300",
            variant === "success" && "from-emerald-500 to-emerald-300",
            variant === "warning" && "from-amber-500 to-amber-300", 
            variant === "help" && "from-blue-500 to-blue-300",
            variant === "default" && "from-primary to-secondary"
          )} />
        </div>
      </TooltipContent>
    </Tooltip>
  )
}