export interface SentenceAnalysis {
  speaker: 'customer' | 'agent';
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  emotion: string;
  reason: string;
}

export interface CustomerAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  frustration: number;
  satisfaction: number;
}

export interface AgentAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  empathy: number;
  professionalism: number;
}

export interface ConversationAnalysis {
  overall_sentiment: 'positive' | 'negative' | 'neutral';
  overall_score: number;
  summary: string;
  dominant_emotion: string;
  resolution_status: 'resolved' | 'partially_resolved' | 'unresolved' | 'escalated';
  escalation_risk: 'low' | 'medium' | 'high';
  conversation_quality: number;
  customer: CustomerAnalysis;
  agent: AgentAnalysis;
  sentences: SentenceAnalysis[];
}

export interface AnalysisResponse {
  success: boolean;
  data?: ConversationAnalysis;
  error?: string;
}
