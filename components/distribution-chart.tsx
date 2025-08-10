"use client";

import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Distribution {
  name: string;
  type: "normal" | "uniform" | "exponential";
  params: Record<string, number>;
}

interface DistributionChartProps {
  distributions: Distribution[];
}

export function DistributionChart({ distributions }: DistributionChartProps) {
  // Calculate probability density for normal distribution
  const normalPDF = (x: number, mean: number, stdDev: number) => {
    const variance = stdDev * stdDev;
    return (1 / Math.sqrt(2 * Math.PI * variance)) * 
           Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
  };

  // Calculate probability density for uniform distribution
  const uniformPDF = (x: number, min: number, max: number) => {
    if (x < min || x > max) return 0;
    return 1 / (max - min);
  };

  // Calculate probability density for exponential distribution
  const exponentialPDF = (x: number, lambda: number) => {
    if (x < 0) return 0;
    return lambda * Math.exp(-lambda * x);
  };

  // Generate data points for a distribution
  const generateDistributionData = (dist: Distribution, numPoints = 200) => {
    const points: { x: number; y: number }[] = [];
    
    let xMin = 0, xMax = 100;
    
    // Determine x range based on distribution type
    switch (dist.type) {
      case "normal":
        const mean = dist.params.mean || 50;
        const stdDev = dist.params.stdDev || 10;
        xMin = mean - 4 * stdDev;
        xMax = mean + 4 * stdDev;
        break;
      case "uniform":
        xMin = dist.params.min || 0;
        xMax = dist.params.max || 100;
        // Add some padding
        const range = xMax - xMin;
        xMin -= range * 0.1;
        xMax += range * 0.1;
        break;
      case "exponential":
        xMin = 0;
        xMax = 5 / (dist.params.lambda || 1);
        break;
    }

    const step = (xMax - xMin) / numPoints;

    for (let i = 0; i <= numPoints; i++) {
      const x = xMin + i * step;
      let y = 0;

      switch (dist.type) {
        case "normal":
          y = normalPDF(x, dist.params.mean || 50, dist.params.stdDev || 10);
          break;
        case "uniform":
          y = uniformPDF(x, dist.params.min || 0, dist.params.max || 100);
          break;
        case "exponential":
          y = exponentialPDF(x, dist.params.lambda || 1);
          break;
      }

      points.push({ x, y });
    }

    return points;
  };

  // Generate chart data
  const generateChartData = () => {
    const colors = [
      "rgba(59, 130, 246, 0.8)",  // blue
      "rgba(239, 68, 68, 0.8)",   // red
      "rgba(34, 197, 94, 0.8)",   // green
      "rgba(168, 85, 247, 0.8)",  // purple
      "rgba(251, 146, 60, 0.8)",  // orange
    ];

    const datasets = distributions.map((dist, index) => {
      const data = generateDistributionData(dist);
      return {
        label: dist.name,
        data: data,
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length].replace("0.8", "0.1"),
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      };
    });

    // Calculate x range for all distributions
    let globalXMin = Infinity, globalXMax = -Infinity;
    datasets.forEach(dataset => {
      dataset.data.forEach(point => {
        if (point.x < globalXMin) globalXMin = point.x;
        if (point.x > globalXMax) globalXMax = point.x;
      });
    });

    return {
      datasets,
      labels: [] // We'll use the data points directly
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Probability Distributions",
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        type: "linear" as const,
        display: true,
        title: {
          display: true,
          text: "Value",
        },
      },
      y: {
        type: "linear" as const,
        display: true,
        title: {
          display: true,
          text: "Probability Density",
        },
        beginAtZero: true,
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  };

  const data = generateChartData();

  return (
    <div className="w-full h-[400px] p-4 border rounded-lg bg-background">
      <Line options={options} data={data} />
    </div>
  );
}