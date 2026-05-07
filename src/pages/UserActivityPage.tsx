import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "@/components/ui/chart";
import { TrendingUp, Users, Activity, RefreshCw } from "lucide-react";
import { getUserActivityAnalytics, AnalyticsStats, DailyStat } from "@/services/analyticsService";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const chartColors = {
  users: "#FF7700",
  screenings: "#26694B", 
  posts: "#3D9CE1"
};

const chartConfig = {
  users: {
    label: "Users",
    color: chartColors.users,
  },
  screenings: {
    label: "Screenings",
    color: chartColors.screenings,
  },
  posts: {
    label: "Posts",
    color: chartColors.posts,
  },
};

export const UserActivityPage = () => {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [chartData, setChartData] = useState<DailyStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const res = await getUserActivityAnalytics();
      if (res.success) {
        setStats(res.stats);
        setChartData(res.chartData);
      }
    } catch (error) {
      toast({
        title: "Error loading analytics",
        description: "Failed to fetch user activity data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-spectrum-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-spectrum-text-primary">
            User Activity Analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Track user engagement, screening frequency, and community interaction patterns.
          </p>
        </div>
        <Button variant="outline" className="gap-2" onClick={loadData}>
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Activity Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <Card className="spectrum-card border-l-4 border-l-[#FF7700]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Active Users</CardTitle>
            <Users className="h-4 w-4 text-[#FF7700]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#FF7700]">
              {stats?.activeUsers.value}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-spectrum-accent-success" />
              {stats?.activeUsers.label}
            </p>
          </CardContent>
        </Card>

        <Card className="spectrum-card border-l-4 border-l-[#26694B]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Screenings</CardTitle>
            <Activity className="h-4 w-4 text-[#26694B]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#26694B]">
              {stats?.screenings.value}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-spectrum-accent-success" />
              {stats?.screenings.label}
            </p>
          </CardContent>
        </Card>

        <Card className="spectrum-card border-l-4 border-l-[#3D9CE1]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Posts</CardTitle>
            <Activity className="h-4 w-4 text-[#3D9CE1]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#3D9CE1]">
              {stats?.communityPosts.value}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-spectrum-accent-success" />
              {stats?.communityPosts.label}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* User Activity Trend */}
        <Card className="spectrum-card shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg">Daily User Activity</CardTitle>
            <CardDescription>
              Track daily active users over the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis 
                    dataKey="displayDate" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis 
                    fontSize={12} 
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    cursor={{ stroke: '#FF7700', strokeWidth: 1, strokeDasharray: '4 4' }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border rounded-xl shadow-xl border-orange-100">
                            <p className="font-bold text-spectrum-text-primary mb-1">
                              {label}
                            </p>
                            <p className="text-sm flex items-center gap-2" style={{ color: chartColors.users }}>
                              <span className="w-2 h-2 rounded-full bg-orange-500" />
                              Active Users: {payload[0].value}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke={chartColors.users}
                    strokeWidth={4}
                    dot={{ fill: 'white', stroke: chartColors.users, strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, strokeWidth: 0, fill: chartColors.users }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Screening Activity */}
        <Card className="spectrum-card shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg">Daily Screenings Completed</CardTitle>
            <CardDescription>
              Number of autism screenings completed each day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis 
                    dataKey="displayDate" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(38, 105, 75, 0.05)' }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border rounded-xl shadow-xl border-emerald-100">
                            <p className="font-bold text-spectrum-text-primary mb-1">
                              {label}
                            </p>
                            <p className="text-sm flex items-center gap-2" style={{ color: chartColors.screenings }}>
                              <span className="w-2 h-2 rounded-full bg-emerald-600" />
                              Screenings: {payload[0].value}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="screenings" 
                    fill={chartColors.screenings}
                    radius={[6, 6, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Combined Activity Chart */}
      <Card className="spectrum-card shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-lg">Weekly Activity Overview</CardTitle>
          <CardDescription>
            Combined view of users, screenings, and community posts
          </CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="displayDate" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-4 border rounded-2xl shadow-2xl border-gray-100 min-w-[200px]">
                          <p className="font-bold text-spectrum-text-primary mb-3 text-base">
                            {label}
                          </p>
                          <div className="space-y-2">
                            {payload.map((entry, index) => (
                              <div key={index} className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                                  <span className="text-sm text-gray-600">{entry.name}:</span>
                                </div>
                                <span className="text-sm font-bold" style={{ color: entry.color }}>{entry.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke={chartColors.users}
                  strokeWidth={3}
                  name="Active Users"
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0, fill: chartColors.users }}
                />
                <Line 
                  type="monotone" 
                  dataKey="screenings" 
                  stroke={chartColors.screenings}
                  strokeWidth={3}
                  name="Screenings"
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0, fill: chartColors.screenings }}
                />
                <Line 
                  type="monotone" 
                  dataKey="posts" 
                  stroke={chartColors.posts}
                  strokeWidth={3}
                  name="Community Posts"
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0, fill: chartColors.posts }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};