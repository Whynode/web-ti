import React from "react"
import { cn } from "@/lib/utils"

export type SectionProps = React.HTMLAttributes<HTMLElement>

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <section
        className={cn("py-16 md:py-24", className)}
        ref={ref}
        {...props}
      >
        {children}
      </section>
    )
  }
)
Section.displayName = "Section"
