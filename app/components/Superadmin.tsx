"use client";

import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Building2,
  CalendarDays,
  ClipboardList,
  FileBarChart,
  Package,
  Settings2,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Users,
  Wrench,
} from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statCards = [
  {
    label: "Total Revenue",
    value: "$248,680",
    trend: 12.8,
    icon: BarChart3,
  },
  {
    label: "Total Transactions",
    value: "1,842",
    trend: 8.4,
    icon: ShoppingCart,
  },
  {
    label: "Total Products",
    value: "4,628",
    trend: -2.1,
    icon: Package,
  },
  {
    label: "Active Customers",
    value: "2,914",
    trend: 6.7,
    icon: Users,
  },
];

const organizations = [
  {
    id: "vehicles",
    name: "Vehicles",
    icon: Truck,
    accentClass: "bg-amber-500",
    revenue: "$104,920",
    orders: "716 orders",
    lowStock: 18,
  },
  {
    id: "instruments",
    name: "Instruments",
    icon: Wrench,
    accentClass: "bg-rose-500",
    revenue: "$78,460",
    orders: "532 orders",
    lowStock: 9,
  },
  {
    id: "appliances",
    name: "Appliances",
    icon: Package,
    accentClass: "bg-teal-500",
    revenue: "$65,300",
    orders: "594 orders",
    lowStock: 24,
  },
];

const revenueData = [
  { month: "Apr", Vehicles: 54, Instruments: 42, Appliances: 38 },
  { month: "May", Vehicles: 62, Instruments: 48, Appliances: 44 },
  { month: "Jun", Vehicles: 58, Instruments: 51, Appliances: 47 },
  { month: "Jul", Vehicles: 72, Instruments: 56, Appliances: 52 },
  { month: "Aug", Vehicles: 84, Instruments: 63, Appliances: 58 },
  { month: "Sep", Vehicles: 105, Instruments: 78, Appliances: 65 },
];

const recentActivity = [
  { organization: "Vehicles", accentClass: "bg-amber-500", description: "A new vehicle product was added to the catalog.", timestamp: "2 hours ago" },
  { organization: "Appliances", accentClass: "bg-teal-500", description: "Order #SZ-10482 was marked as fulfilled.", timestamp: "4 hours ago" },
  { organization: "Instruments", accentClass: "bg-rose-500", description: "Inventory threshold reached for 3 products.", timestamp: "6 hours ago" },
  { organization: "Vehicles", accentClass: "bg-amber-500", description: "A customer profile was updated by an org admin.", timestamp: "Yesterday" },
  { organization: "Appliances", accentClass: "bg-teal-500", description: "Monthly transaction report was generated.", timestamp: "Yesterday" },
  { organization: "Instruments", accentClass: "bg-rose-500", description: "A new transaction was recorded.", timestamp: "2 days ago" },
  { organization: "Vehicles", accentClass: "bg-amber-500", description: "User permissions were updated for the org team.", timestamp: "2 days ago" },
  { organization: "Appliances", accentClass: "bg-teal-500", description: "Low-stock alert resolved for 5 products.", timestamp: "3 days ago" },
];

const quickActions = [
  { label: "Manage Organizations", href: "/organizations", icon: Building2 },
  { label: "Manage Users", href: "/users", icon: Users },
  { label: "View Reports", href: "/reports", icon: FileBarChart },
];

type StatCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  trend: number;
};

export function StatCard({ icon: Icon, label, value, trend }: StatCardProps) {
  const isPositive = trend >= 0;
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="min-w-0 border-border bg-card shadow-sm">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-5" />
          </div>
          <Badge
            variant="outline"
            className={isPositive ? "border-primary/20 bg-primary/10 text-primary" : "border-destructive/20 bg-destructive/10 text-destructive"}
          >
            <TrendIcon className="mr-1 size-3" />
            {Math.abs(trend).toFixed(1)}%
          </Badge>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 truncate text-2xl font-semibold tracking-tight sm:text-3xl">{value}</p>
      </CardContent>
    </Card>
  );
}

type OrgBadgeProps = {
  name: string;
  accentClass: string;
};

export function OrgBadge({ name, accentClass }: OrgBadgeProps) {
  return (
    <span className="inline-flex min-w-0 items-center gap-2 text-sm font-medium text-foreground">
      <span className={`size-2 shrink-0 rounded-full ${accentClass}`} />
      <span className="truncate">{name}</span>
    </span>
  );
}

const SuperAdminDashboard = () => {
  return (
    <div className="min-w-0 space-y-6 p-4 sm:space-y-8 sm:p-6 lg:p-8">
      <header className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" />
            <span>Super Admin workspace</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Company Overview</h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Consolidated performance across all organizations
          </p>
        </div>
        <Select defaultValue="this-month">
          <SelectTrigger className="min-h-10 w-full bg-card sm:w-45">
            <CalendarDays className="mr-2 size-4 text-muted-foreground" />
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="this-year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </header>

      <section aria-label="Company statistics" className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section aria-labelledby="organization-breakdown-heading" className="space-y-4">
        <div>
          <h2 id="organization-breakdown-heading" className="text-lg font-semibold tracking-tight">Organization breakdown</h2>
          <p className="mt-1 text-sm text-muted-foreground">A quick view of performance and inventory health by business unit.</p>
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-3">
          {organizations.map((organization) => {
            const Icon = organization.icon;
            return (
              <Card key={organization.id} className="min-w-0 border-border bg-card shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <OrgBadge name={organization.name} accentClass={organization.accentClass} />
                  </div>
                  <p className="mt-6 text-sm text-muted-foreground">Revenue this period</p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight">{organization.revenue}</p>
                  <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Orders</p>
                      <p className="mt-1 text-sm font-medium">{organization.orders}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Low stock</p>
                      <p className="mt-1 text-sm font-medium">{organization.lowStock} items</p>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-5 min-h-10 w-full">
                    <Link href={`/dashboard/${organization.id}`}>View Dashboard</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Card className="min-w-0 border-border bg-card shadow-sm">
        <CardHeader className="p-5 pb-0 sm:p-6 sm:pb-0">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg">Revenue by Organization</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Monthly revenue comparison in thousands.</p>
            </div>
            <BarChart3 className="hidden size-5 text-muted-foreground sm:block" />
          </div>
        </CardHeader>
        <CardContent className="min-w-0 p-5 sm:p-6">
          <div className="max-w-full overflow-x-auto">
            <div className="h-70 min-w-155 sm:h-85">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 8, right: 12, left: -16, bottom: 8 }}>
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={(value) => `$${value}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "0.75rem", color: "hsl(var(--foreground))" }}
                    formatter={(value) => [`$${value}k`, "Revenue"]}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
                  <Line type="monotone" dataKey="Vehicles" stroke="hsl(38 92% 50%)" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="Instruments" stroke="hsl(347 77% 50%)" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="Appliances" stroke="hsl(173 80% 40%)" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="min-w-0 border-border bg-card shadow-sm">
        <CardHeader className="p-5 pb-3 sm:p-6 sm:pb-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Latest changes across the company workspace.</p>
            </div>
            <ClipboardList className="size-5 shrink-0 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {recentActivity.map((activity, index) => (
              <div key={`${activity.description}-${index}`} className="flex min-w-0 items-start gap-3 px-5 py-3.5 sm:px-6">
                <span className={`mt-1.5 size-2 shrink-0 rounded-full ${activity.accentClass}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-5 text-foreground">{activity.description}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{activity.organization}</p>
                </div>
                <span className="shrink-0 text-right text-xs text-muted-foreground">{activity.timestamp}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <section aria-labelledby="quick-actions-heading" className="space-y-4">
        <div>
          <h2 id="quick-actions-heading" className="text-lg font-semibold tracking-tight">Quick actions</h2>
          <p className="mt-1 text-sm text-muted-foreground">Jump directly into common company administration tasks.</p>
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button key={action.label} variant="outline" className="min-h-12 justify-start gap-3 bg-card px-4">
                <Link href={action.href}>
                  <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <span>{action.label}</span>
                </Link>
              </Button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default SuperAdminDashboard;
