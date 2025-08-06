// Core type definitions for Open-Odds

export interface User {
  id: string
  email: string
  username?: string
  created_at: string
}

export interface Scenario {
  id: string
  user_id: string
  title: string
  description?: string
  structure: ScenarioStructure
  version: number
  parent_id?: string
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface ScenarioStructure {
  steps: Step[]
  metadata?: {
    tags?: string[]
    category?: string
  }
}

export interface Step {
  id: string
  name: string
  description?: string
  type: 'input' | 'calculation' | 'branch'
  distribution?: Distribution
  formula?: string
  branches?: Branch[]
  notes?: string
  references?: Reference[]
}

export interface Branch {
  id: string
  condition: string
  probability?: number
  steps: Step[]
}

export interface Distribution {
  type: 'normal' | 'uniform' | 'exponential' | 'custom'
  parameters: Record<string, number>
}

export interface Reference {
  title: string
  url?: string
  description?: string
}

export interface ScenarioInput {
  id: string
  scenario_id: string
  user_id: string
  inputs: Record<string, Distribution>
  notes: Record<string, string>
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  user_id: string
  scenario_id?: string
  scenario_input_id?: string
  step_id?: string
  content: string
  created_at: string
  user?: User
}

export interface Vote {
  id: string
  user_id: string
  target_type: 'scenario' | 'comment' | 'input'
  target_id: string
  vote_type: 1 | -1
  created_at: string
}