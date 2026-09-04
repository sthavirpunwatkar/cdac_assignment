export interface SentenceAnalysis {
  speaker: 'customer' | 'agent';
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  emotion?: string;
  reason?: string;
}

export interface ActorAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  frustration?: number;
  satisfaction?: number;
  empathy?: number;
  professionalism?: number;
}

export interface ConversationAnalysis {
  overall_sentiment: 'positive' | 'negative' | 'neutral';
  overall_score: number;
  summary: string;
  dominant_emotion: string;
  resolution_status: 'resolved' | 'partially_resolved' | 'unresolved' | 'escalated';
  escalation_risk: 'low' | 'medium' | 'high';
  conversation_quality: number;
  customer: ActorAnalysis;
  agent: ActorAnalysis;
  sentences: SentenceAnalysis[];
}

export interface AnalysisResponse {
  success: boolean;
  data?: ConversationAnalysis;
  error?: string;
}
