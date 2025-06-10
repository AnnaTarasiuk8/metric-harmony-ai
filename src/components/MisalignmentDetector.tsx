
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle, Clock, RefreshCw, TrendingDown, Users, FileText } from 'lucide-react';

interface MisalignmentIssue {
  id: string;
  title: string;
  severity: 'high' | 'medium' | 'low';
  type: 'definition' | 'calculation' | 'reporting' | 'ownership';
  departments: string[];
  description: string;
  impact: string;
  suggestedAction: string;
  detectedDate: string;
  status: 'new' | 'in-progress' | 'resolved';
}

const MisalignmentDetector = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isScanning, setIsScanning] = useState(false);

  const misalignmentIssues: MisalignmentIssue[] = [
    {
      id: '1',
      title: 'Lead Definition Conflict',
      severity: 'high',
      type: 'definition',
      departments: ['Sales', 'Marketing'],
      description: 'Sales defines "qualified lead" as BANT qualified, while Marketing uses engagement scoring. This creates a 40% variance in lead counts.',
      impact: 'Misaligned pipeline forecasting, confused handoff process',
      suggestedAction: 'Create unified lead qualification framework with both BANT and engagement criteria',
      detectedDate: '2024-06-08',
      status: 'new'
    },
    {
      id: '2',
      title: 'Customer Activation Metrics Mismatch',
      severity: 'high',
      type: 'calculation',
      departments: ['Product', 'Customer Success'],
      description: 'Product measures activation as feature usage, CS measures as value realization. 25% difference in activation rates.',
      impact: 'Inconsistent customer health scoring, misaligned success metrics',
      suggestedAction: 'Align on hybrid activation metric combining usage depth and outcome achievement',
      detectedDate: '2024-06-07',
      status: 'in-progress'
    },
    {
      id: '3',
      title: 'Revenue Recognition Timing',
      severity: 'medium',
      type: 'reporting',
      departments: ['Sales', 'Finance'],
      description: 'Sales reports deals when signed, Finance when cash received. Creates reporting delays and discrepancies.',
      impact: 'Delayed financial reporting, inaccurate revenue forecasts',
      suggestedAction: 'Implement dual reporting: booking date (Sales) and cash date (Finance) with clear definitions',
      detectedDate: '2024-06-06',
      status: 'resolved'
    },
    {
      id: '4',
      title: 'Churn Rate Calculation Differences',
      severity: 'medium',
      type: 'calculation',
      departments: ['Product', 'Finance', 'Customer Success'],
      description: 'Three different churn calculation methods across departments, resulting in 15% variance.',
      impact: 'Conflicting retention strategies, unclear success metrics',
      suggestedAction: 'Standardize on revenue-based churn calculation with monthly reporting cadence',
      detectedDate: '2024-06-05',
      status: 'new'
    },
    {
      id: '5',
      title: 'Campaign Attribution Overlap',
      severity: 'low',
      type: 'ownership',
      departments: ['Marketing', 'Sales'],
      description: 'Both departments claim attribution for the same conversions, leading to double counting.',
      impact: 'Inflated ROI calculations, budget allocation inefficiencies',
      suggestedAction: 'Implement first-touch (Marketing) and last-touch (Sales) attribution model',
      detectedDate: '2024-06-04',
      status: 'in-progress'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'definition': return <FileText className="h-4 w-4" />;
      case 'calculation': return <TrendingDown className="h-4 w-4" />;
      case 'reporting': return <Clock className="h-4 w-4" />;
      case 'ownership': return <Users className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const handleScan = async () => {
    setIsScanning(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsScanning(false);
  };

  const stats = {
    total: misalignmentIssues.length,
    high: misalignmentIssues.filter(i => i.severity === 'high').length,
    resolved: misalignmentIssues.filter(i => i.status === 'resolved').length,
    inProgress: misalignmentIssues.filter(i => i.status === 'in-progress').length
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Issues</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Severity</p>
                <p className="text-2xl font-bold text-red-600">{stats.high}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="issues">All Issues</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          <Button 
            onClick={handleScan}
            disabled={isScanning}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isScanning ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Run Scan
              </>
            )}
          </Button>
        </div>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Recent Issues */}
          <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Recent Misalignments Detected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {misalignmentIssues.slice(0, 3).map(issue => (
                  <div key={issue.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="p-2 rounded-full bg-red-100">
                      {getTypeIcon(issue.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{issue.title}</h4>
                        <div className="flex gap-2">
                          <Badge className={getSeverityColor(issue.severity)}>
                            {issue.severity}
                          </Badge>
                          <Badge className={getStatusColor(issue.status)}>
                            {issue.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{issue.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Departments: {issue.departments.join(', ')}</span>
                        <span>Detected: {issue.detectedDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Department Health */}
          <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Department Alignment Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { dept: 'Sales', score: 78, issues: 3 },
                  { dept: 'Marketing', score: 65, issues: 4 },
                  { dept: 'Product', score: 82, issues: 2 },
                  { dept: 'Finance', score: 91, issues: 1 },
                  { dept: 'Customer Success', score: 73, issues: 3 }
                ].map(dept => (
                  <div key={dept.dept} className="flex items-center gap-4">
                    <div className="w-24 font-medium">{dept.dept}</div>
                    <div className="flex-1">
                      <Progress value={dept.score} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground w-16">{dept.score}%</div>
                    <div className="text-sm text-muted-foreground w-20">{dept.issues} issues</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          {misalignmentIssues.map(issue => (
            <Card key={issue.id} className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-red-100 mt-1">
                      {getTypeIcon(issue.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{issue.title}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge className={getSeverityColor(issue.severity)}>
                          {issue.severity} severity
                        </Badge>
                        <Badge className={getStatusColor(issue.status)}>
                          {issue.status}
                        </Badge>
                        <Badge variant="outline">
                          {issue.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Description</h4>
                  <p className="text-sm text-muted-foreground">{issue.description}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Business Impact</h4>
                  <p className="text-sm text-muted-foreground">{issue.impact}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Suggested Action</h4>
                  <p className="text-sm text-muted-foreground">{issue.suggestedAction}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Departments: {issue.departments.join(', ')} • Detected: {issue.detectedDate}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Assign Owner
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Start Resolution
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="trends">
          <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Misalignment Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingDown className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Trend Analysis Coming Soon</h3>
                <p className="text-muted-foreground">
                  Historical trend analysis and predictive insights will be available in the next update.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MisalignmentDetector;
