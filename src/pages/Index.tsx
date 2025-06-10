
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, AlertTriangle, CheckCircle, TrendingUp, Users, Target } from 'lucide-react';
import MetricsGlossary from '@/components/MetricsGlossary';
import MetricTranslator from '@/components/MetricTranslator';
import MisalignmentDetector from '@/components/MisalignmentDetector';
import MetricMappingVisual from '@/components/MetricMappingVisual';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const overviewStats = [
    {
      title: "Total Metrics",
      value: "147",
      change: "+12%",
      icon: Target,
      description: "Across all departments"
    },
    {
      title: "Aligned Metrics", 
      value: "89%",
      change: "+5%",
      icon: CheckCircle,
      description: "Successfully mapped"
    },
    {
      title: "Conflicts Detected",
      value: "16",
      change: "-23%", 
      icon: AlertTriangle,
      description: "Require attention"
    },
    {
      title: "Active Users",
      value: "234",
      change: "+18%",
      icon: Users,
      description: "Using the platform"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MetricsAlign AI
              </h1>
              <p className="text-muted-foreground mt-1">
                Business Glossary & KPI Translation Platform
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search metrics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Add Metric
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overviewStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm bg-white/70 backdrop-blur-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={stat.change.startsWith('+') ? 'default' : 'secondary'} className="text-xs">
                        {stat.change}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{stat.description}</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="glossary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit">
            <TabsTrigger value="glossary">Business Glossary</TabsTrigger>
            <TabsTrigger value="translator">AI Translator</TabsTrigger>
            <TabsTrigger value="detector">Misalignment Detector</TabsTrigger>
            <TabsTrigger value="mapping">Visual Mapping</TabsTrigger>
          </TabsList>

          <TabsContent value="glossary">
            <MetricsGlossary searchTerm={searchTerm} />
          </TabsContent>

          <TabsContent value="translator">
            <MetricTranslator />
          </TabsContent>

          <TabsContent value="detector">
            <MisalignmentDetector />
          </TabsContent>

          <TabsContent value="mapping">
            <MetricMappingVisual />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
