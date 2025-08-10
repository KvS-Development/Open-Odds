"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2, ChevronDown } from "lucide-react";

interface DistributionInputProps {
  distribution: {
    name: string;
    type: "normal" | "uniform" | "exponential";
    params: Record<string, number>;
  };
  onChange: (updates: any) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export function DistributionInput({
  distribution,
  onChange,
  onRemove,
  canRemove
}: DistributionInputProps) {
  const renderParamsInputs = () => {
    switch (distribution.type) {
      case "normal":
        return (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor={`mean-${distribution.name}`}>Mean (μ)</Label>
                <Input
                  id={`mean-${distribution.name}`}
                  type="number"
                  value={distribution.params.mean || 0}
                  onChange={(e) =>
                    onChange({
                      params: {
                        ...distribution.params,
                        mean: parseFloat(e.target.value) || 0
                      }
                    })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`stdDev-${distribution.name}`}>Std Dev (σ)</Label>
                <Input
                  id={`stdDev-${distribution.name}`}
                  type="number"
                  value={distribution.params.stdDev || 1}
                  onChange={(e) =>
                    onChange({
                      params: {
                        ...distribution.params,
                        stdDev: parseFloat(e.target.value) || 1
                      }
                    })
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </>
        );
      case "uniform":
        return (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor={`min-${distribution.name}`}>Min</Label>
                <Input
                  id={`min-${distribution.name}`}
                  type="number"
                  value={distribution.params.min || 0}
                  onChange={(e) =>
                    onChange({
                      params: {
                        ...distribution.params,
                        min: parseFloat(e.target.value) || 0
                      }
                    })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`max-${distribution.name}`}>Max</Label>
                <Input
                  id={`max-${distribution.name}`}
                  type="number"
                  value={distribution.params.max || 100}
                  onChange={(e) =>
                    onChange({
                      params: {
                        ...distribution.params,
                        max: parseFloat(e.target.value) || 100
                      }
                    })
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </>
        );
      case "exponential":
        return (
          <div>
            <Label htmlFor={`lambda-${distribution.name}`}>Lambda (λ)</Label>
            <Input
              id={`lambda-${distribution.name}`}
              type="number"
              step="0.01"
              value={distribution.params.lambda || 1}
              onChange={(e) =>
                onChange({
                  params: {
                    ...distribution.params,
                    lambda: parseFloat(e.target.value) || 1
                  }
                })
              }
              className="mt-1"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 border rounded-lg space-y-3">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <Input
            value={distribution.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="font-semibold"
            placeholder="Component name"
          />
        </div>
        <div className="flex gap-2 ml-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="capitalize">
                {distribution.type} <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onChange({ type: "normal", params: { mean: 50, stdDev: 10 } })}>
                Normal
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onChange({ type: "uniform", params: { min: 0, max: 100 } })}>
                Uniform
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onChange({ type: "exponential", params: { lambda: 1 } })}>
                Exponential
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {canRemove && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {renderParamsInputs()}
      </div>
    </div>
  );
}