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

export interface Distribution {
  name: string;
  type: "normal" | "uniform" | "exponential" | "linear" | "dirac";
  params: {
    mean?: number;
    stdDev?: number;
    min?: number;
    max?: number;
    lambda?: number;
    points?: { x: number; y: number }[];
    location?: number;
  };
}

interface DistributionInputProps {
  distribution: Distribution;
  onChange: (updates: Partial<Distribution>) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export function DistributionInput({
  distribution,
  onChange,
  onRemove,
  canRemove
}: DistributionInputProps) {
  const parseNumberInput = (value: string, fallback: number) => {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? fallback : parsed;
  };

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
                  value={distribution.params.mean ?? 0}
                  onChange={(e) =>
                    onChange({
                      params: {
                        ...distribution.params,
                        mean: parseNumberInput(e.target.value, 0)
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
                  value={distribution.params.stdDev ?? 1}
                  min="0"
                  onChange={(e) =>
                    onChange({
                      params: {
                        ...distribution.params,
                        stdDev: parseNumberInput(e.target.value, 1)
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
                  value={distribution.params.min ?? 0}
                  onChange={(e) => {
                    const newMin = parseNumberInput(e.target.value, 0);
                    const currentMax = distribution.params.max ?? 100;
                    onChange({
                      params: {
                        ...distribution.params,
                        min: newMin,
                        max: newMin > currentMax ? newMin : currentMax
                      }
                    });
                  }}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`max-${distribution.name}`}>Max</Label>
                <Input
                  id={`max-${distribution.name}`}
                  type="number"
                  value={distribution.params.max ?? 100}
                  onChange={(e) => {
                    const newMax = parseNumberInput(e.target.value, 100);
                    const currentMin = distribution.params.min ?? 0;
                    onChange({
                      params: {
                        ...distribution.params,
                        min: newMax < currentMin ? newMax : currentMin,
                        max: newMax
                      }
                    });
                  }}
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
              min="0.0001"
              value={distribution.params.lambda ?? 1}
              onChange={(e) =>
                onChange({
                  params: {
                    ...distribution.params,
                    lambda: parseNumberInput(e.target.value, 1)
                  }
                })
              }
              className="mt-1"
            />
          </div>
        );
      case "dirac":
        return (
          <div>
            <Label htmlFor={`location-${distribution.name}`}>Location</Label>
            <Input
              id={`location-${distribution.name}`}
              type="number"
              value={distribution.params.location ?? 0}
              onChange={(e) =>
                onChange({
                  params: {
                    ...distribution.params,
                    location: parseNumberInput(e.target.value, 0)
                  }
                })
              }
              className="mt-1"
            />
          </div>
        );
      case "linear": {
        const points = distribution.params.points || [
          { x: 0, y: 0 },
          { x: 50, y: 1 },
          { x: 100, y: 0 }
        ];

        const updatePoint = (index: number, key: "x" | "y", value: number) => {
          const newPoints = [...points];
          newPoints[index] = { ...newPoints[index], [key]: value };
          onChange({
            params: {
              ...distribution.params,
              points: newPoints
            }
          });
        };

        const addPoint = () => {
          const newPoints = [...points];
          const lastIndex = newPoints.length - 1;
          const prev = newPoints[lastIndex - 1];
          const last = newPoints[lastIndex];
          const newX = (prev.x + last.x) / 2;
          const newY = prev.y;
          newPoints.splice(lastIndex, 0, { x: newX, y: newY });
          onChange({
            params: {
              ...distribution.params,
              points: newPoints
            }
          });
        };

        const removePoint = (index: number) => {
          if (points.length <= 3) return;
          const newPoints = points.filter((_, i) => i !== index);
          onChange({
            params: {
              ...distribution.params,
              points: newPoints
            }
          });
        };

        return (
          <div className="space-y-3">
            {points.map((p, index) => (
              <div key={index} className="grid grid-cols-3 gap-3 items-end">
                <div>
                  <Label htmlFor={`x-${distribution.name}-${index}`}>
                    {index === 0
                      ? "Min X"
                      : index === points.length - 1
                        ? "Max X"
                        : "X"}
                  </Label>
                  <Input
                    id={`x-${distribution.name}-${index}`}
                    type="number"
                    value={p.x}
                    onChange={(e) =>
                      updatePoint(index, "x", parseNumberInput(e.target.value, p.x))
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`y-${distribution.name}-${index}`}>Y</Label>
                  <Input
                    id={`y-${distribution.name}-${index}`}
                    type="number"
                    value={p.y}
                    onChange={(e) =>
                      updatePoint(index, "y", parseNumberInput(e.target.value, p.y))
                    }
                    className="mt-1"
                    disabled={index === 0 || index === points.length - 1}
                  />
                </div>
                {index !== 0 && index !== points.length - 1 && points.length > 3 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePoint(index)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addPoint}>
              Add Point
            </Button>
          </div>
        );
      }
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
              <DropdownMenuItem onClick={() => onChange({ type: "dirac", params: { location: 0 } })}>
                Dirac Delta
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  onChange({
                    type: "linear",
                    params: {
                      points: [
                        { x: 0, y: 0 },
                        { x: 50, y: 1 },
                        { x: 100, y: 0 }
                      ]
                    }
                  })
                }
              >
                Linear
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