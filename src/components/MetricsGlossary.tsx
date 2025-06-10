
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Edit, Link2, TrendingUp } from 'lucide-react';

interface Metric {
  id: string;
  name: string;
  definition: string;
  department: string;
  formula?: string;
  aliases: string[];
  relatedMetrics: string[];
  lastUpdated: string;
  owner: string;
  alignment: 'aligned' | 'conflicted' | 'unmapped';
}

interface MetricsGlossaryProps {
  searchTerm: string;
}

const MetricsGlossary = ({ searchTerm }: MetricsGlossaryProps) => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedAlignment, setSelectedAlignment] = useState('all');

  const sampleMetrics: Metric[] = [
    {
      id: '1',
      name: 'Qualified Lead',
      definition: 'A prospect who has been identified as more likely to become a customer based on lead scoring criteria and specific qualifying actions.',
      department: 'Sales',
      formula: 'Leads with score ≥ 75 AND (demo requested OR pricing inquiry)',
      aliases: ['SQL', 'Sales Qualified Lead', 'Hot Lead'],
      relatedMetrics: ['Lead Score', 'Conversion Rate', 'Pipeline Value'],
      lastUpdated: '2024-06-08',
      owner: 'Sarah Johnson',
      alignment: 'conflicted'
    },
    {
      id: '2',
      name: 'Engaged Contact',
      definition: 'A contact who has shown meaningful interaction with marketing content within the last 30 days.',
      department: 'Marketing',
      formula: 'Email opens + Click-throughs + Content downloads + Event attendance > 3',
      aliases: ['Active Contact', 'Engaged Lead', 'Marketing Qualified Contact'],
      relatedMetrics: ['Engagement Score', 'Email Open Rate', 'Content Consumption'],
      lastUpdated: '2024-06-07',
      owner: 'Mike Chen',
      alignment: 'conflicted'
    },
    {
      id: '3',
      name: 'User Activation',
      definition: 'A user who has completed the core value action within their first 7 days of signing up.',
      department: 'Product',
      formula: 'Users who complete ≥ 3 key actions within 7 days of signup',
      aliases: ['Activated User', 'Onboarded User', 'Value Realized'],
      relatedMetrics: ['Time to Value', 'Feature Adoption', 'User Retention'],
      lastUpdated: '2024-06-06',
      owner: 'Lisa Park',
      alignment: 'aligned'
    },
    {
      id: '4',
      name: 'Monthly Recurring Revenue',
      definition: 'The predictable revenue generated from subscriptions each month.',
      department: 'Finance',
      formula: 'Sum of all monthly subscription fees',
      aliases: ['MRR', 'Recurring Revenue', 'Subscription Revenue'],
      relatedMetrics: ['ARR', 'Customer LTV', 'Churn Rate'],
      lastUpdated: '2024-06-09',
      owner: 'David Wong',
      alignment: 'aligned'
    },
    {
      id: '5',
      name: 'Customer Success Score',
      definition: 'A composite score measuring customer health and likelihood to renew or expand.',
      department: 'Customer Success',
      formula: 'Weighted average of usage, support tickets, NPS, and engagement metrics',
      aliases: ['Health Score', 'Customer Health', 'Success Metric'],
      relatedMetrics: ['NPS', 'Churn Risk', 'Expansion Revenue'],
      lastUpdated: '2024-06-05',
      owner: 'Emma Rodriguez',
      alignment: 'unmapped'
    }
  ];

  const departments = ['all', 'Sales', 'Marketing', 'Product', 'Finance', 'Customer Success'];
  const alignmentStatuses = ['all', 'aligned', 'conflicted', 'unmapped'];

  const filteredMetrics = sampleMetrics.filter(metric => {
    const matchesSearch = searchTerm === '' || 
      metric.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      metric.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      metric.aliases.some(alias => alias.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDepartment = selectedDepartment === 'all' || metric.department === selectedDepartment;
    const matchesAlignment = selectedAlignment === 'all' || metric.alignment === selectedAlignment;
    
    return matchesSearch && matchesDepartment && matchesAlignment;
  });

  const getAlignmentBadge = (alignment: string) => {
    switch (alignment) {
      case 'aligned':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aligned</Badge>;
      case 'conflicted':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Conflicted</Badge>;
      case 'unmapped':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Unmapped</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getDepartmentColor = (department: string) => {
    const colors = {
      'Sales': 'bg-blue-100 text-blue-800',
      'Marketing': 'bg-purple-100 text-purple-800',
      'Product': 'bg-green-100 text-green-800',
      'Finance': 'bg-orange-100 text-orange-800',
      'Customer Success': 'bg-pink-100 text-pink-800'
    };
    return colors[department as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Department</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>
                      {dept === 'all' ? 'All Departments' : dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Alignment Status</label>
              <Select value={selectedAlignment} onValueChange={setSelectedAlignment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select alignment" />
                </SelectTrigger>
                <SelectContent>
                  {alignmentStatuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                Reset Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMetrics.map(metric => (
          <Card key={metric.id} className="border-0 shadow-sm bg-white/70 backdrop-blur-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{metric.name}</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getDepartmentColor(metric.department)}>
                      {metric.department}
                    </Badge>
                    {getAlignmentBadge(metric.alignment)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Link2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Definition</h4>
                <p className="text-sm">{metric.definition}</p>
              </div>
              
              {metric.formula && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Formula</h4>
                  <code className="text-xs bg-muted px-2 py-1 rounded">{metric.formula}</code>
                </div>
              )}
              
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Aliases</h4>
                <div className="flex flex-wrap gap-1">
                  {metric.aliases.map(alias => (
                    <Badge key={alias} variant="outline" className="text-xs">
                      {alias}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Related Metrics</h4>
                <div className="flex flex-wrap gap-1">
                  {metric.relatedMetrics.map(related => (
                    <Badge key={related} variant="secondary" className="text-xs cursor-pointer hover:bg-secondary/80">
                      {related}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center text-xs text-muted-foreground pt-2 border-t">
                <span>Owner: {metric.owner}</span>
                <span>Updated: {metric.lastUpdated}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMetrics.length === 0 && (
        <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
          <CardContent className="text-center py-12">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No metrics found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MetricsGlossary;
