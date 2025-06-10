
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Network, Filter, Maximize2, Download } from 'lucide-react';

const MetricMappingVisual = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedView, setSelectedView] = useState('relationships');

  const departments = [
    { id: 'sales', name: 'Sales', color: 'bg-blue-500', metrics: ['Qualified Lead', 'Pipeline Value', 'Conversion Rate'] },
    { id: 'marketing', name: 'Marketing', color: 'bg-purple-500', metrics: ['Engaged Contact', 'MQL', 'Campaign ROI'] },
    { id: 'product', name: 'Product', color: 'bg-green-500', metrics: ['User Activation', 'Feature Adoption', 'DAU'] },
    { id: 'finance', name: 'Finance', color: 'bg-orange-500', metrics: ['MRR', 'CAC', 'LTV'] },
    { id: 'cs', name: 'Customer Success', color: 'bg-pink-500', metrics: ['Health Score', 'NPS', 'Churn Rate'] }
  ];

  const connections = [
    { from: 'Qualified Lead', to: 'MQL', strength: 92, type: 'high-alignment' },
    { from: 'Qualified Lead', to: 'User Activation', strength: 65, type: 'medium-alignment' },
    { from: 'User Activation', to: 'Health Score', strength: 87, type: 'high-alignment' },
    { from: 'MQL', to: 'Pipeline Value', strength: 78, type: 'medium-alignment' },
    { from: 'Health Score', to: 'Churn Rate', strength: 94, type: 'high-alignment' },
    { from: 'Feature Adoption', to: 'NPS', strength: 71, type: 'medium-alignment' },
    { from: 'Campaign ROI', to: 'CAC', strength: 83, type: 'high-alignment' }
  ];

  const ViewSelector = () => (
    <div className="flex gap-4">
      <Select value={selectedView} onValueChange={setSelectedView}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relationships">Metric Relationships</SelectItem>
          <SelectItem value="flows">Data Flows</SelectItem>
          <SelectItem value="conflicts">Conflict Map</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          {departments.map(dept => (
            <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const NetworkVisualization = () => (
    <div className="relative w-full h-96 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg border-2 border-dashed border-gray-200 overflow-hidden">
      {/* Department Clusters */}
      <div className="absolute inset-0 p-6">
        {departments.map((dept, index) => {
          const positions = [
            { x: 10, y: 20 },   // Sales
            { x: 75, y: 15 },   // Marketing  
            { x: 85, y: 70 },   // Product
            { x: 15, y: 75 },   // Finance
            { x: 45, y: 45 }    // CS (center)
          ];
          
          const pos = positions[index];
          
          return (
            <div
              key={dept.id}
              className="absolute"
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div className={`w-20 h-20 rounded-full ${dept.color} bg-opacity-20 border-2 border-current flex items-center justify-center group hover:scale-110 transition-transform cursor-pointer`}>
                <div className={`w-12 h-12 rounded-full ${dept.color} flex items-center justify-center text-white text-xs font-medium`}>
                  {dept.name.slice(0, 2)}
                </div>
              </div>
              <div className="text-center mt-2">
                <p className="text-xs font-medium">{dept.name}</p>
                <p className="text-xs text-muted-foreground">{dept.metrics.length} metrics</p>
              </div>
            </div>
          );
        })}
        
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((connection, index) => {
            // Simple representation of connections - in a real app, you'd calculate actual positions
            const lines = [
              { x1: '20%', y1: '30%', x2: '75%', y2: '25%' },
              { x1: '20%', y1: '30%', x2: '85%', y2: '70%' },
              { x1: '85%', y1: '70%', x2: '55%', y2: '55%' },
              { x1: '75%', y1: '25%', x2: '25%', y2: '85%' },
              { x1: '55%', y1: '55%', x2: '25%', y2: '85%' },
              { x1: '85%', y1: '70%', x2: '55%', y2: '55%' },
              { x1: '75%', y1: '25%', x2: '25%', y2: '85%' }
            ];
            
            const line = lines[index % lines.length];
            const strokeColor = connection.type === 'high-alignment' ? '#10b981' : '#f59e0b';
            const strokeWidth = connection.strength > 80 ? 3 : 2;
            
            return (
              <line
                key={index}
                x1={line.x1} y1={line.y1}
                x2={line.x2} y2={line.y2}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={connection.type === 'medium-alignment' ? '5,5' : 'none'}
                opacity={0.7}
              />
            );
          })}
        </svg>
        
        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-lg border">
          <h4 className="text-xs font-medium mb-2">Connection Strength</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-green-500"></div>
              <span className="text-xs">High Alignment (80%+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-yellow-500" style={{ borderTop: '2px dashed' }}></div>
              <span className="text-xs">Medium Alignment (60-80%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              Metric Relationship Mapping
            </CardTitle>
            <div className="flex items-center gap-2">
              <ViewSelector />
              <Button variant="outline" size="sm">
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <NetworkVisualization />
        </CardContent>
      </Card>

      {/* Detailed Connections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Strong Alignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {connections.filter(c => c.strength >= 80).map((connection, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{connection.from} ↔ {connection.to}</p>
                    <p className="text-xs text-muted-foreground">Highly correlated metrics</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {connection.strength}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Potential Conflicts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {connections.filter(c => c.strength < 80).map((connection, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{connection.from} ↔ {connection.to}</p>
                    <p className="text-xs text-muted-foreground">May require reconciliation</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    {connection.strength}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Metrics */}
      <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Department Metrics Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {departments.map(dept => (
              <div key={dept.id} className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-3 h-3 rounded-full ${dept.color}`}></div>
                  <h4 className="font-medium">{dept.name}</h4>
                </div>
                <div className="space-y-2">
                  {dept.metrics.map(metric => (
                    <div key={metric} className="text-sm p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricMappingVisual;
