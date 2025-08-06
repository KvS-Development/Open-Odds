// Probability distribution calculation utilities

import { Distribution } from '@/types'

// Generate sample points for a distribution
export function generateDistributionSamples(
  distribution: Distribution,
  numSamples: number = 1000
): number[] {
  switch (distribution.type) {
    case 'normal':
      return generateNormalSamples(
        distribution.parameters.mean,
        distribution.parameters.stdDev,
        numSamples
      )
    case 'uniform':
      return generateUniformSamples(
        distribution.parameters.min,
        distribution.parameters.max,
        numSamples
      )
    case 'exponential':
      return generateExponentialSamples(
        distribution.parameters.lambda,
        numSamples
      )
    default:
      return []
  }
}

// Box-Muller transform for normal distribution
function generateNormalSamples(mean: number, stdDev: number, count: number): number[] {
  const samples: number[] = []
  for (let i = 0; i < count; i++) {
    const u1 = Math.random()
    const u2 = Math.random()
    const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
    samples.push(z0 * stdDev + mean)
  }
  return samples
}

function generateUniformSamples(min: number, max: number, count: number): number[] {
  const samples: number[] = []
  for (let i = 0; i < count; i++) {
    samples.push(Math.random() * (max - min) + min)
  }
  return samples
}

function generateExponentialSamples(lambda: number, count: number): number[] {
  const samples: number[] = []
  for (let i = 0; i < count; i++) {
    samples.push(-Math.log(1 - Math.random()) / lambda)
  }
  return samples
}

// Convolve two distributions (simplified Monte Carlo approach)
export function convolveDistributions(
  samples1: number[],
  samples2: number[],
  operation: 'add' | 'multiply' = 'multiply'
): number[] {
  const result: number[] = []
  const minLength = Math.min(samples1.length, samples2.length)
  
  for (let i = 0; i < minLength; i++) {
    if (operation === 'add') {
      result.push(samples1[i] + samples2[i])
    } else {
      result.push(samples1[i] * samples2[i])
    }
  }
  
  return result
}

// Calculate statistics from samples
export function calculateStatistics(samples: number[]) {
  const sorted = [...samples].sort((a, b) => a - b)
  const n = sorted.length
  
  return {
    mean: samples.reduce((a, b) => a + b, 0) / n,
    median: sorted[Math.floor(n / 2)],
    min: sorted[0],
    max: sorted[n - 1],
    p5: sorted[Math.floor(n * 0.05)],
    p25: sorted[Math.floor(n * 0.25)],
    p75: sorted[Math.floor(n * 0.75)],
    p95: sorted[Math.floor(n * 0.95)],
  }
}