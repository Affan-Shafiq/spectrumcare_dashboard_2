import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Simple chart components to avoid TypeScript issues
export interface ChartConfig {
  [key: string]: {
    label?: string;
    color?: string;
  };
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ReactNode;
  }
>(({ id, className, children, config, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex justify-center text-xs overflow-hidden", className)}
      {...props}
    >
      <div className="w-full min-w-0">
        {children}
      </div>
    </div>
  );
});
ChartContainer.displayName = "Chart";

const ChartTooltip = RechartsTooltip;
const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-background p-2 shadow-md",
        className
      )}
      {...props}
    />
  );
});
ChartTooltipContent.displayName = "ChartTooltipContent";

// Re-export recharts components
export {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

export { ChartContainer, ChartTooltip, ChartTooltipContent };