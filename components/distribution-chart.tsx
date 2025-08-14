"use client";

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
import type { Distribution } from "./distribution-input";

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

  // Calculate probability density for linear distribution
  const linearPDF = (x: number, points: { x: number; y: number }[]) => {
    if (points.length < 2) return 0;
    const sorted = [...points].sort((a, b) => a.x - b.x);
    const area = sorted.reduce((acc, p, i) => {
      if (i === 0) return 0;
      const prev = sorted[i - 1];
      return acc + ((prev.y + p.y) / 2) * (p.x - prev.x);
    }, 0);
    if (area === 0) return 0;
    if (x < sorted[0].x || x > sorted[sorted.length - 1].x) return 0;
    for (let i = 0; i < sorted.length - 1; i++) {
      const p1 = sorted[i];
      const p2 = sorted[i + 1];
      if (x >= p1.x && x <= p2.x) {
        const slope = (p2.y - p1.y) / (p2.x - p1.x);
        const y = p1.y + slope * (x - p1.x);
        return y / area;
      }
    }
    return 0;
  };

  const getRange = (dist: Distribution) => {
    switch (dist.type) {
      case "normal": {
        const mean = dist.params.mean || 50;
        const stdDev = dist.params.stdDev || 10;
        return { min: mean - 4 * stdDev, max: mean + 4 * stdDev };
      }
      case "uniform":
        return { min: dist.params.min || 0, max: dist.params.max || 100 };
      case "exponential":
        return { min: 0, max: 5 / (dist.params.lambda || 1) };
      case "linear": {
        const pts = dist.params.points || [];
        if (pts.length === 0) return { min: 0, max: 0 };
        const sorted = [...pts].sort((a, b) => a.x - b.x);
        return { min: sorted[0].x, max: sorted[sorted.length - 1].x };
      }
    }
  };

  const pdfAt = (dist: Distribution, x: number) => {
    switch (dist.type) {
      case "normal":
        return normalPDF(x, dist.params.mean || 50, dist.params.stdDev || 10);
      case "uniform":
        return uniformPDF(x, dist.params.min || 0, dist.params.max || 100);
      case "exponential":
        return exponentialPDF(x, dist.params.lambda || 1);
      case "linear":
        return linearPDF(x, dist.params.points || []);
    }
  };

  const convolve = (a: number[], b: number[], step: number) => {
    const result = Array(a.length + b.length - 1).fill(0);
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b.length; j++) {
        result[i + j] += a[i] * b[j] * step;
      }
    }
    return result;
  };

  const computeConvolution = (dists: Distribution[], numPoints = 400) => {
    if (dists.length === 0) return [] as { x: number; y: number }[];

    const ranges = dists.map(getRange);
    const totalMin = ranges.reduce((sum, r) => sum + r.min, 0);
    const totalMax = ranges.reduce((sum, r) => sum + r.max, 0);
    const step = (totalMax - totalMin) / numPoints;

    const pdfArrays = dists.map((dist, idx) => {
      const { min, max } = ranges[idx];
      const length = Math.ceil((max - min) / step) + 1;
      return Array.from({ length }, (_, i) => pdfAt(dist, min + i * step));
    });

    let result = pdfArrays[0];
    for (let i = 1; i < pdfArrays.length; i++) {
      result = convolve(result, pdfArrays[i], step);
    }

    const area = result.reduce((sum, y) => sum + y, 0) * step;
    result = result.map((y) => y / area);

    return result.map((y, i) => ({ x: totalMin + i * step, y }));
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
      case "linear": {
        const pts = dist.params.points || [];
        if (pts.length > 0) {
          const sorted = [...pts].sort((a, b) => a.x - b.x);
          xMin = sorted[0].x;
          xMax = sorted[sorted.length - 1].x;
        }
        break;
      }
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
        case "linear":
          y = linearPDF(x, dist.params.points || []);
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

    if (distributions.length > 0) {
      datasets.push({
        label: "Convolution",
        data: computeConvolution(distributions),
        borderColor: "rgba(0,0,0,0.8)",
        backgroundColor: "rgba(0,0,0,0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      });
    }

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