
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Bot, Lightbulb, RefreshCw, Copy } from 'lucide-react';

const MetricTranslator = () => {
  const [sourceMetric, setSourceMetric] = useState('');
  const [sourceDepartment, setSourceDepartment] = useState('');
  const [targetDepartment, setTargetDepartment] = useState('');
  const [translationResult, setTranslationResult] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);

  const departments = ['Sales', 'Marketing', 'Product', 'Finance', 'Customer Success'];

  const sampleTranslations = {
    'qualified-lead-sales-marketing': {
      sourceMetric: 'Qualified Lead',
      sourceDept: 'Sales',
      targetDept: 'Marketing',
      translation: 'Marketing Qualified Lead (MQL)',
      confidence: 92,
      explanation: 'In Marketing terms, a Sales Qualified Lead maps most closely to a Marketing Qualified Lead that has been further validated through lead scoring and sales criteria.',
      keyDifferences: [
        'Marketing focuses on engagement and interest signals',
        'Sales emphasizes readiness to purchase and budget qualification',
        'Timeline expectations differ: Marketing nurtures longer-term, Sales focuses on immediate opportunity'
      ],
      suggestedMapping: {
        formula: 'MQL + Lead Score ≥ 75 + (Demo Request OR Pricing Inquiry)',
        attributes: ['Engagement Score', 'Firmographic Fit', 'BANT Qualification'],
        frequency: 'Real-time sync between departments'
      }
    },
    'activation-product-sales': {
      sourceMetric: 'User Activation',
      sourceDept: 'Product',
      targetDept: 'Sales',
      translation: 'Trial-to-Paid Qualification',
      confidence: 87,
      explanation: 'Product\'s User Activation translates to Sales as the point where a trial user becomes a qualified prospect for conversion to paid.',
      keyDifferences: [
        'Product measures feature adoption and value realization',
        'Sales measures sales-readiness and conversion potential',
        'Product uses usage analytics, Sales uses qualification criteria'
      ],
      suggestedMapping: {
        formula: 'Activated Users + Usage Threshold Met + Sales Trigger Events',
        attributes: ['Feature Usage Depth', 'Time in Product', 'Value Moment Reached'],
        frequency: 'Daily automated handoff triggers'
      }
    }
  };

  const handleTranslate = async () => {
    if (!sourceMetric || !sourceDepartment || !targetDepartment) return;
    
    setIsTranslating(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate translation key and get sample result
    const key = `${sourceMetric.toLowerCase().replace(/\s+/g, '-')}-${sourceDepartment.toLowerCase()}-${targetDepartment.toLowerCase()}`;
    const result = sampleTranslations[key as keyof typeof sampleTranslations] || {
      sourceMetric,
      sourceDept: sourceDepartment,
      targetDept: targetDepartment,
      translation: `${targetDepartment} Equivalent of ${sourceMetric}`,
      confidence: 75,
      explanation: `AI analysis suggests this ${sourceDepartment} metric translates to ${targetDepartment} terminology with some semantic adjustments.`,
      keyDifferences: [
        'Different measurement timelines and criteria',
        'Varying data sources and collection methods',
        'Distinct success indicators and thresholds'
      ],
      suggestedMapping: {
        formula: 'Requires custom mapping based on departmental criteria',
        attributes: ['Cross-departmental alignment needed'],
        frequency: 'Manual review recommended'
      }
    };
    
    setTranslationResult(result);
    setIsTranslating(false);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-100 text-green-800';
    if (confidence >= 75) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      {/* Translation Input */}
      <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Metric Translator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Source */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Source Metric</h3>
              <div>
                <label className="text-sm font-medium mb-2 block">Metric Name</label>
                <Input
                  placeholder="e.g., Qualified Lead, User Activation..."
                  value={sourceMetric}
                  onChange={(e) => setSourceMetric(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Department</label>
                <Select value={sourceDepartment} onValueChange={setSourceDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Target */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Target Department</h3>
              <div className="pt-8">
                <label className="text-sm font-medium mb-2 block">Translate To</label>
                <Select value={targetDepartment} onValueChange={setTargetDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.filter(dept => dept !== sourceDepartment).map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={handleTranslate}
              disabled={!sourceMetric || !sourceDepartment || !targetDepartment || isTranslating}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isTranslating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Translating...
                </>
              ) : (
                <>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Translate Metric
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Translation Result */}
      {translationResult && (
        <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Translation Result
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={getConfidenceColor(translationResult.confidence)}>
                  {translationResult.confidence}% Confidence
                </Badge>
                <Button variant="ghost" size="sm">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Translation Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-lg">{translationResult.sourceMetric}</h4>
                  <p className="text-sm text-muted-foreground">{translationResult.sourceDept}</p>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                <div className="text-right">
                  <h4 className="font-medium text-lg">{translationResult.translation}</h4>
                  <p className="text-sm text-muted-foreground">{translationResult.targetDept}</p>
                </div>
              </div>
            </div>

            {/* AI Explanation */}
            <div>
              <h4 className="font-medium mb-2">AI Analysis</h4>
              <p className="text-sm text-muted-foreground">{translationResult.explanation}</p>
            </div>

            {/* Key Differences */}
            <div>
              <h4 className="font-medium mb-3">Key Differences</h4>
              <ul className="space-y-2">
                {translationResult.keyDifferences.map((difference, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{difference}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggested Mapping */}
            <div>
              <h4 className="font-medium mb-3">Suggested Implementation</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h5 className="text-sm font-medium mb-2">Formula</h5>
                  <code className="text-xs bg-muted p-2 rounded block">
                    {translationResult.suggestedMapping.formula}
                  </code>
                </div>
                <div>
                  <h5 className="text-sm font-medium mb-2">Key Attributes</h5>
                  <div className="space-y-1">
                    {translationResult.suggestedMapping.attributes.map((attr, index) => (
                      <Badge key={index} variant="outline" className="text-xs block w-fit">
                        {attr}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-medium mb-2">Sync Frequency</h5>
                  <p className="text-sm text-muted-foreground">
                    {translationResult.suggestedMapping.frequency}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button variant="outline" className="flex-1">
                Request Manual Review
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Implement Mapping
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Examples */}
      <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Common Translation Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Sales → Marketing</span>
                <Badge className="bg-green-100 text-green-800">92% Match</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                "Qualified Lead" → "Marketing Qualified Lead (MQL)"
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Product → Sales</span>
                <Badge className="bg-yellow-100 text-yellow-800">87% Match</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                "User Activation" → "Trial-to-Paid Qualification"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricTranslator;
