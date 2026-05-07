import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, Brain, MessageSquare, TrendingUp, Clock } from "lucide-react";
import { dashboardMetrics } from "@/data/mockData";

const MetricCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend 
}: {
  title: string;
  value: string | number;
  description: string;
  icon: any;
  trend?: string;
}) => (
  <Card className="spectrum-metric-card">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <Icon className="h-4 w-4 text-spectrum-accent-primary" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-spectrum-text-primary">{value}</div>
      <p className="text-xs text-muted-foreground mt-1">
        {trend && (
          <span className="text-spectrum-accent-success flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </span>
        )}
        {description}
      </p>
    </CardContent>
  </Card>
);

export const DashboardHome = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-spectrum-text-primary">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the SpectrumCare Admin Dashboard. Here's your system overview.
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Users"
          value={dashboardMetrics.totalUsers.toLocaleString()}
          description="Registered users"
          icon={Users}
          trend="+12%"
        />
        
        <MetricCard
          title="Active Users"
          value={dashboardMetrics.activeUsers.toLocaleString()}
          description="Active this month"
          icon={Activity}
          trend="+8%"
        />
        
        <MetricCard
          title="Screenings Completed"
          value={dashboardMetrics.screeningsCompleted.toLocaleString()}
          description="Total assessments"
          icon={Brain}
          trend="+15%"
        />
        
        <MetricCard
          title="Community Posts"
          value={dashboardMetrics.communityPosts.toLocaleString()}
          description="User interactions"
          icon={MessageSquare}
          trend="+5%"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="spectrum-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-spectrum-accent-info" />
              Model Performance
            </CardTitle>
            <CardDescription>ML screening accuracy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-spectrum-accent-info">
              {dashboardMetrics.avgAccuracy}%
            </div>
            <p className="text-sm text-muted-foreground">Average accuracy rate</p>
          </CardContent>
        </Card>

        <Card className="spectrum-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-spectrum-accent-success" />
              New Users
            </CardTitle>
            <CardDescription>This week's registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-spectrum-accent-success">
              {dashboardMetrics.newUsersThisWeek}
            </div>
            <p className="text-sm text-muted-foreground">New this week</p>
          </CardContent>
        </Card>

        <Card className="spectrum-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-spectrum-accent-primary" />
              System Status
            </CardTitle>
            <CardDescription>Current system health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-spectrum-accent-success">
              ✓ All Systems Operational
            </div>
            <p className="text-sm text-muted-foreground">Last updated: 2 minutes ago</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Summary */}
      <Card className="spectrum-card">
        <CardHeader>
          <CardTitle>Quick Stats Summary</CardTitle>
          <CardDescription>
            Key metrics at a glance for FYP demonstration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-spectrum-accent-primary">
                {Math.round((dashboardMetrics.activeUsers / dashboardMetrics.totalUsers) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">User Engagement</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-spectrum-accent-success">
                {Math.round(dashboardMetrics.screeningsCompleted / dashboardMetrics.totalUsers * 100) / 100}
              </div>
              <div className="text-sm text-muted-foreground">Avg Screenings/User</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-spectrum-accent-info">
                {Math.round(dashboardMetrics.communityPosts / dashboardMetrics.activeUsers * 100) / 100}
              </div>
              <div className="text-sm text-muted-foreground">Posts/Active User</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-spectrum-text-primary">
                98.5%
              </div>
              <div className="text-sm text-muted-foreground">System Uptime</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};