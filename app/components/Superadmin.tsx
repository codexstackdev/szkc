"use client";

import { useState } from "react";
import {
  Activity,
  Building2,
  Check,
  ClipboardList,
  Ellipsis,
  FileBarChart,
  Moon,
  Package,
  Plus,
  ShieldCheck,
  Sun,
  UserRound,
  UserRoundCog,
  Users,
  Warehouse,
  Wrench,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTheme } from "next-themes";
import { createOrganization } from "@/hooks/actions";
import { toast } from "sonner";
import { organizationProp } from "@/hooks/types";

const statCards = [
  { label: "Total Products", value: "4,628", icon: Package, trend: "+8.2%" },
  {
    label: "Total Stock Units",
    value: "18,942",
    icon: Warehouse,
    trend: "+5.6%",
  },
  { label: "Low Stock Alerts", value: "51", icon: Activity, trend: "-12.4%" },
  { label: "Active Users", value: "24", icon: Users, trend: "+4.1%" },
];

const users = [
  {
    name: "Alex Morgan",
    email: "alex.morgan@szkc.com",
    role: "Super Admin",
    organization: null,
    status: "Active",
    initials: "AM",
  },
  {
    name: "Maria Santos",
    email: "maria.santos@szkc.com",
    role: "Org Admin",
    organization: "Vehicles",
    accentClass: "bg-amber-500",
    status: "Active",
    initials: "MS",
  },
  {
    name: "Daniel Cruz",
    email: "daniel.cruz@szkc.com",
    role: "Org Admin",
    organization: "Instruments",
    accentClass: "bg-rose-500",
    status: "Active",
    initials: "DC",
  },
  {
    name: "Aisha Rahman",
    email: "aisha.rahman@szkc.com",
    role: "Org Admin",
    organization: "Appliances",
    accentClass: "bg-teal-500",
    status: "Active",
    initials: "AR",
  },
  {
    name: "Juan Delgado",
    email: "juan.delgado@szkc.com",
    role: "Org Admin",
    organization: "Vehicles",
    accentClass: "bg-amber-500",
    status: "Inactive",
    initials: "JD",
  },
  {
    name: "Priya Nair",
    email: "priya.nair@szkc.com",
    role: "Org Admin",
    organization: "Appliances",
    accentClass: "bg-teal-500",
    status: "Active",
    initials: "PN",
  },
];

const recentActivity = [
  {
    description: "New product added — SZKC Instruments",
    organization: "Instruments",
    accentClass: "bg-rose-500",
    timestamp: "2 hours ago",
  },
  {
    description: "Low stock alert — SZKC Appliances",
    organization: "Appliances",
    accentClass: "bg-teal-500",
    timestamp: "4 hours ago",
  },
  {
    description: "User role updated — Juan D. reassigned to Vehicles",
    organization: null,
    accentClass: "bg-muted-foreground",
    timestamp: "6 hours ago",
  },
  {
    description: "New Org Admin added — SZKC Vehicles",
    organization: "Vehicles",
    accentClass: "bg-amber-500",
    timestamp: "Yesterday",
  },
  {
    description: "Inventory adjustment completed — SZKC Appliances",
    organization: "Appliances",
    accentClass: "bg-teal-500",
    timestamp: "Yesterday",
  },
  {
    description: "Product category updated — SZKC Instruments",
    organization: "Instruments",
    accentClass: "bg-rose-500",
    timestamp: "2 days ago",
  },
  {
    description: "User account activated — Priya Nair",
    organization: null,
    accentClass: "bg-muted-foreground",
    timestamp: "2 days ago",
  },
  {
    description: "Reorder threshold changed — SZKC Vehicles",
    organization: "Vehicles",
    accentClass: "bg-amber-500",
    timestamp: "3 days ago",
  },
];

type StatCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  trend?: string;
};

export function StatCard({ icon: Icon, label, value, trend }: StatCardProps) {
  return (
    <Card className="min-w-0 border-border bg-card shadow-sm">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-5" />
          </div>
          {trend && (
            <Badge
              variant="outline"
              className="border-primary/20 bg-primary/10 text-primary"
            >
              {trend}
            </Badge>
          )}
        </div>
        <p className="mt-5 text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

type OrgBadgeProps = { name: string; accentClass: string };

export function OrgBadge({ name, accentClass }: OrgBadgeProps) {
  return (
    <span className="inline-flex min-w-0 items-center gap-2 text-sm font-medium">
      <span className={`size-2 shrink-0 rounded-full ${accentClass}`} />
      <span className="truncate">{name}</span>
    </span>
  );
}

const SuperAdminDashboard = () => {
  const [organizations, setOrganizations] = useState<organizationProp[]>([]);
  const [organizationDialogOpen, setOrganizationDialogOpen] = useState(false);
  const [organizationFormOpen, setOrganizationFormOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [editingOrganizationId, setEditingOrganizationId] = useState<
    string | null
  >(null);
  const [organizationName, setOrganizationName] = useState("");
  const [organizationAdmin, setOrganizationAdmin] = useState<string | null>(
    null,
  );
  const [organizationType, setOrganizationType] = useState("");
  const { theme, setTheme } = useTheme();

  const editingOrganization = organizations.find(
    (organization) => organization._id === editingOrganizationId,
  );

  const openOrganizationManager = () => {
    setOrganizationDialogOpen(true);
    setOrganizationFormOpen(false);
  };

  const openAddOrganization = () => {
    setEditingOrganizationId(null);
    setOrganizationName("");
    setOrganizationType("");
    setOrganizationFormOpen(true);
  };

  const openEditOrganization = (
    organization: (typeof organizations)[number],
  ) => {
    setEditingOrganizationId(organization._id);
    setOrganizationName(organization.name);
    setOrganizationType(organization.type);
    setOrganizationFormOpen(true);
  };

  const saveOrganization = () => {
    if (!organizationName.trim()) return;
    if (editingOrganizationId) {
      setOrganizations((current) =>
        current.map((organization) =>
          organization._id === editingOrganizationId
            ? {
                ...organization,
                name: organizationName,
                type: organizationType,
              }
            : organization,
        ),
      );
    } else {
      handleOrganization();
      setOrganizations((current) => [
        ...current,
        {
          _id: organizationName.toLowerCase().replace(/\s+/g, "-"),
          name: organizationName,
          type: organizationType,
          admin: organizationAdmin ?? ""
        },
      ]);
    }
    setOrganizationFormOpen(false);
  };

  const deleteOrganization = (id: string) => {
    setOrganizations((current) =>
      current.filter((organization) => organization._id !== id),
    );
  };

  const handleOrganization = async () => {
    if (editingOrganization) return;
    try {
      const data = await createOrganization(organizationName, organizationType, organizationAdmin as string);
      if(data.success){
        toast.success(data.message);
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-w-0 space-y-6 p-4 sm:space-y-8 sm:p-6 lg:p-8">
      <header className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" />
            <span>Super Admin workspace</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Company Overview
          </h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Manage organizations, users, and inventory across SZKC
          </p>
        </div>
        <Button
          onClick={() =>
            setTheme((prev) => (prev === "light" ? "dark" : "light"))
          }
          type="button"
          variant="outline"
          aria-label="Toggle theme"
          className="min-h-10 w-full gap-2 bg-card sm:w-auto"
        >
          {theme === "light" ? (
            <Moon className="size-4" />
          ) : (
            <Sun className="size-4" />
          )}
          <span className="sm:hidden">Theme</span>
        </Button>
      </header>

      <section
        aria-label="Inventory statistics"
        className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {statCards.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section
        aria-labelledby="organization-breakdown-heading"
        className="space-y-4"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="organization-breakdown-heading"
              className="text-lg font-semibold tracking-tight"
            >
              Organization breakdown
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Inventory health and assigned ownership across each business unit.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="min-h-10 w-full gap-2 sm:w-auto"
            onClick={openOrganizationManager}
          >
            <Building2 className="size-4" />
            Manage Organizations
          </Button>
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-3">
          {organizations.map((organization) => {
            return (
              <Card
                key={organization._id}
                className="min-w-0 border-border bg-card shadow-sm"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <OrgBadge
                      name={organization.name}
                    />
                  </div>
                  <p className="mt-4 truncate text-sm text-muted-foreground">
                    {organization.type}
                  </p>
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Products</p>
                      <p className="mt-1 text-lg font-semibold">
                        {organization.products}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Stock units
                      </p>
                      <p className="mt-1 text-lg font-semibold">
                        {organization.units}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Low stock</p>
                      <p className="mt-1 text-lg font-semibold">
                        {organization.lowStock}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-muted text-xs">
                        {organization.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        Assigned Org Admin
                      </p>
                      <p className="truncate text-sm font-medium">
                        {organization.admin}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-5 min-h-10 w-full"
                    onClick={() => {
                      window.location.href = `/dashboard/${organization.id}`;
                    }}
                  >
                    View Dashboard
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Card
        id="user-management"
        className="min-w-0 scroll-mt-6 border-border bg-card shadow-sm"
      >
        <CardHeader className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <CardTitle className="text-lg">
              Users &amp; Role Assignment
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage access and organization ownership.
            </p>
          </div>
          <Button
            type="button"
            className="min-h-10 w-full gap-2 sm:w-auto"
            onClick={() => setUserDialogOpen(true)}
          >
            <Plus className="size-4" />
            Add User
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-w-full overflow-x-auto">
            <Table className="min-w-190">
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-5 sm:pl-6">User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12 pr-5 sm:pr-6" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.email}>
                    <TableCell className="pl-5 sm:pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback className="text-xs">
                            {user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {user.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="whitespace-nowrap">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.organization ? (
                        <OrgBadge
                          name={user.organization}
                          accentClass={
                            user.accentClass ?? "bg-muted-foreground"
                          }
                        />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.status === "Active"
                            ? "border-primary/20 bg-primary/10 text-primary"
                            : "border-border text-muted-foreground"
                        }
                      >
                        <Check className="mr-1 size-3" />
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-5 sm:pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-9"
                            aria-label={`Actions for ${user.name}`}
                          >
                            <Ellipsis className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>
                            Reassign Organization
                          </DropdownMenuItem>
                          <DropdownMenuItem>Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="min-w-0 border-border bg-card shadow-sm">
        <CardHeader className="p-5 pb-3 sm:p-6 sm:pb-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Inventory and user changes across the workspace.
              </p>
            </div>
            <ClipboardList className="size-5 shrink-0 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {recentActivity.map((activity, index) => (
              <div
                key={`${activity.description}-${index}`}
                className="flex min-w-0 items-start gap-3 px-5 py-3.5 sm:px-6"
              >
                <span
                  className={`mt-1.5 size-2 shrink-0 rounded-full ${activity.accentClass}`}
                />
                {activity.organization ? (
                  <OrgBadge
                    name={activity.organization}
                    accentClass={activity.accentClass}
                  />
                ) : (
                  <UserRound className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                )}
                <p className="min-w-0 flex-1 text-sm leading-5">
                  {activity.description}
                </p>
                <span className="shrink-0 text-right text-xs text-muted-foreground">
                  {activity.timestamp}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <section aria-labelledby="quick-actions-heading" className="space-y-4">
        <div>
          <h2
            id="quick-actions-heading"
            className="text-lg font-semibold tracking-tight"
          >
            Quick actions
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Each action opens its related management view.
          </p>
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Button
            type="button"
            variant="outline"
            className="min-h-12 justify-start gap-3 bg-card px-4"
            onClick={openOrganizationManager}
          >
            <Building2 className="size-4 text-primary" />
            Manage Organizations
          </Button>
          <Button
            type="button"
            variant="outline"
            className="min-h-12 justify-start gap-3 bg-card px-4"
            onClick={() => {
              document
                .getElementById("user-management")
                ?.scrollIntoView({ behavior: "smooth" });
              setUserDialogOpen(true);
            }}
          >
            <UserRoundCog className="size-4 text-primary" />
            Manage Users
          </Button>
          <Button
            type="button"
            variant="outline"
            className="min-h-12 justify-start gap-3 bg-card px-4"
            onClick={() => setReportDialogOpen(true)}
          >
            <FileBarChart className="size-4 text-primary" />
            View Inventory Reports
          </Button>
        </div>
      </section>

      <Dialog
        open={organizationDialogOpen}
        onOpenChange={setOrganizationDialogOpen}
      >
        <DialogContent className="w-[calc(100%-2rem)] max-w-2xl max-h-[calc(100svh-2rem)] overflow-y-auto p-4 sm:p-6">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-lg sm:text-xl">
              Manage Organizations
            </DialogTitle>
          </DialogHeader>
          {organizationFormOpen ? (
            <div className="grid min-w-0 gap-4 py-2">
              <div className="grid min-w-0 gap-2">
                <Label htmlFor="organization-name">Organization name</Label>
                <Input
                  id="organization-name"
                  value={organizationName}
                  onChange={(event) => setOrganizationName(event.target.value)}
                  placeholder="Organization name"
                  className="min-w-0"
                />
              </div>
              <div className="grid min-w-0 gap-2">
                <Label>Type</Label>
                <Select
                  value={organizationType}
                  onValueChange={(value) => {
                    if (!value) return;
                    setOrganizationType(value);
                  }}
                >
                  <SelectTrigger className="min-h-10 w-full">
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vehicle">Vehicle</SelectItem>
                    <SelectItem value="instruments">Instruments</SelectItem>
                    <SelectItem value="appliances">Appliances</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid min-w-0 gap-2">
                <Label>Assigned Org Admin</Label>
                <Select
                  defaultValue={editingOrganization?.admin ?? "unassigned"}
                  onValueChange={setOrganizationAdmin}
                >
                  <SelectTrigger className="min-h-10 w-full">
                    <SelectValue placeholder="Select an admin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    <SelectItem value="maria">Maria Santos</SelectItem>
                    <SelectItem value="daniel">Daniel Cruz</SelectItem>
                    <SelectItem value="aisha">Aisha Rahman</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter className="flex-col gap-2 pt-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="min-h-10 w-full sm:w-auto"
                  onClick={() => setOrganizationFormOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="min-h-10 w-full sm:w-auto"
                  onClick={saveOrganization}
                >
                  {editingOrganizationId
                    ? "Save Changes"
                    : "Create Organization"}
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <div className="min-w-0 space-y-3">
              <div className="max-h-[52svh] space-y-3 overflow-y-auto pr-1">
                {organizations.map((organization) => (
                  <div
                    key={organization.id}
                    className="flex min-w-0 flex-col gap-3 rounded-xl border border-border p-3 sm:p-4"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <span
                        className={`mt-1 size-2 shrink-0 rounded-full ${organization.accentClass}`}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="wrap-break-word font-medium">
                          {organization.name}
                        </p>
                        <p className="wrap-break-word text-sm leading-5 text-muted-foreground">
                          {organization.type}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="min-h-10 w-full"
                        onClick={() => openEditOrganization(organization)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        className="min-h-10 w-full"
                        onClick={() => deleteOrganization(organization.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                className="min-h-10 w-full gap-2"
                onClick={openAddOrganization}
              >
                <Plus className="size-4" />
                Add Organization
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="user-name">Name</Label>
              <Input id="user-name" placeholder="Full name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="user-email">Email</Label>
              <Input id="user-email" type="email" placeholder="name@szkc.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="user-password">Password</Label>
              <Input
                id="user-password"
                type="password"
                placeholder="Temporary password"
              />
            </div>
            <div className="grid gap-2">
              <Label>Role</Label>
              <Select defaultValue="org-admin">
                <SelectTrigger className="min-h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super-admin">Super Admin</SelectItem>
                  <SelectItem value="org-admin">Org Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Organization</Label>
              <Select defaultValue="vehicles">
                <SelectTrigger className="min-h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {organizations.map((organization) => (
                    <SelectItem key={organization.id} value={organization.id}>
                      {organization.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setUserDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={() => setUserDialogOpen(false)}>
              Save User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>View Inventory Reports</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <Button
              type="button"
              variant="outline"
              className="min-h-12 justify-start"
            >
              <FileBarChart className="size-4 text-primary" />
              Inventory summary report
            </Button>
            <Button
              type="button"
              variant="outline"
              className="min-h-12 justify-start"
            >
              <Activity className="size-4 text-primary" />
              Low-stock alert report
            </Button>
            <Button
              type="button"
              variant="outline"
              className="min-h-12 justify-start"
            >
              <Package className="size-4 text-primary" />
              Product catalog report
            </Button>
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => setReportDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuperAdminDashboard;
