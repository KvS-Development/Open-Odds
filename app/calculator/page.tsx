"use client";

import { useState } from "react";
import { DistributionInput, type Distribution } from "@/components/distribution-input";
import { DistributionChart } from "@/components/distribution-chart";
import { Button } from "@/components/ui/button";

export default function CalculatorPage() {
  const [distributions, setDistributions] = useState<Distribution[]>([
    {
      name: "Component 1",
      type: "normal",
      params: { mean: 50, stdDev: 10 }
    }
  ]);

  const addDistribution = () => {
    setDistributions([
      ...distributions,
      {
        name: `Component ${distributions.length + 1}`,
        type: "normal",
        params: { mean: 50, stdDev: 10 }
      }
    ]);
  };

  const updateDistribution = (index: number, updates: Partial<Distribution>) => {
    const newDistributions = [...distributions];
    newDistributions[index] = { ...newDistributions[index], ...updates };
    setDistributions(newDistributions);
  };

  const removeDistribution = (index: number) => {
    setDistributions(distributions.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Probability Calculator</h1>
        <p className="text-muted-foreground">
          Add probability distributions for each component of your scenario and see the results visualized.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Components</h2>
            <Button onClick={addDistribution} size="sm">
              Add Component
            </Button>
          </div>

          {distributions.map((dist, index) => (
            <DistributionInput
              key={index}
              distribution={dist}
              onChange={(updates) => updateDistribution(index, updates)}
              onRemove={() => removeDistribution(index)}
              canRemove={distributions.length > 1}
            />
          ))}
        </div>

        {/* Visualization Panel */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Visualization</h2>
          <DistributionChart distributions={distributions} />
          
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Statistics</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Components:</span> {distributions.length}
              </div>
              <div>
                <span className="text-muted-foreground">Type:</span> {distributions.length > 1 ? "Convolution" : "Single"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}