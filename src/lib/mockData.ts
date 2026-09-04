import { ConversationAnalysis } from "@/types/analysis";

export const mockAnalysis: ConversationAnalysis = {
  overall_sentiment: "negative",
  overall_score: -0.72,
  summary: "Customer contacted support regarding an unresolved technical issue. The agent tried to troubleshoot, but the customer remained frustrated about the delay. The issue was escalated to the technical team.",
  dominant_emotion: "frustration",
  resolution_status: "escalated",
  escalation_risk: "high",
  conversation_quality: 68,
  customer: {
    sentiment: "negative",
    frustration: 86,
    satisfaction: 32,
  },
  agent: {
    sentiment: "neutral",
    empathy: 78,
    professionalism: 91,
  },
  sentences: [
    {
      speaker: "customer",
      text: "I've been waiting for three days for a response on my ticket.",
      sentiment: "negative",
      score: -0.86,
      emotion: "frustration",
      reason: "The customer expresses dissatisfaction about the delay."
    },
    {
      speaker: "agent",
      text: "I completely understand your frustration, and I apologize for the delay. Let me check the status for you right now.",
      sentiment: "positive",
      score: 0.6,
      emotion: "empathy",
      reason: "Agent acknowledges the issue and apologizes professionally."
    },
    {
      speaker: "customer",
      text: "Checking the status isn't helping. I need this fixed today, it's blocking my whole team.",
      sentiment: "negative",
      score: -0.9,
      emotion: "anger",
      reason: "Customer is blocked and rejecting the agent's initial attempt to placate."
    },
    {
      speaker: "agent",
      text: "I see that the engineering team is currently investigating the database lock. I am going to escalate this to a P1 priority.",
      sentiment: "neutral",
      score: 0.1,
      emotion: "professionalism",
      reason: "Agent is providing factual information and taking action."
    },
    {
      speaker: "customer",
      text: "Okay, thank you. Please let me know as soon as there's an update.",
      sentiment: "neutral",
      score: 0.2,
      emotion: "relief",
      reason: "Customer calms down slightly after action is taken."
    }
  ]
};
