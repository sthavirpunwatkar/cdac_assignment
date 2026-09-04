# AI Conversation Sentiment Analyzer — Product Requirements Document

## 1. Project Overview

Build a full-stack AI-powered web application that accepts a conversation/phone-call transcript as a `.txt` file, analyzes it using AI, and presents the results through a clean, readable dashboard.

The core flow is:

User → React/Next.js UI → Backend/API → n8n orchestration → AI model → Structured JSON → Dashboard

The project should demonstrate clean separation between the UI, orchestration layer, and AI analysis.

## 2. Assignment Requirements

The application must provide:

- Basic login/authentication screen.
- `.txt` conversation file upload.
- Results dashboard.
- Overall sentiment: Positive / Negative / Neutral.
- Sentence-level sentiment.
- Identification of useful KPIs that can be derived from a phone call.
- Clean architecture with UI → n8n → AI separation.
- Clean and readable UX/UI.

Recommended creativity features:

- Charts.
- Emotion detection.
- Conversation summary.
- Additional useful conversation/phone-call KPIs.

## 3. Product Goal

Convert an unstructured conversation transcript into actionable conversation intelligence.

A user should be able to upload a transcript and quickly understand:

- What was the overall sentiment?
- How did sentiment change throughout the conversation?
- What emotions were expressed?
- How did the customer behave?
- How did the agent communicate?
- Was the issue resolved?
- Was escalation likely?
- How good was the overall conversation?

## 4. Target User

Primary:
- Technical evaluator / interviewer evaluating the AI engineering implementation.

Secondary:
- Customer-support or call-center manager reviewing conversations.

## 5. MVP Scope

### Authentication
- Basic login screen.
- Username/email and password fields.
- Protected dashboard.
- Complex production authentication is not required for the assignment.

### File Upload
- Accept `.txt` files only.
- Reject empty files.
- Validate file type and reasonable file size.
- Show selected filename.
- Show upload/processing state.
- Show clear errors.

### AI Analysis
The uploaded transcript should be sent through the backend/orchestration layer to an AI model.

The frontend must not contain AI/API secrets or AI-analysis logic.

### Required Analysis
1. Overall sentiment:
   - Positive
   - Negative
   - Neutral

2. Sentence-level sentiment:
   - Speaker
   - Sentence text
   - Sentiment
   - Sentiment score
   - Optional reasoning

3. Conversation summary.

4. Phone-call KPIs.

### Recommended Additional Analysis
- Emotion detection.
- Speaker-level sentiment.
- Customer frustration.
- Customer satisfaction indicator.
- Agent empathy.
- Agent professionalism.
- Resolution status.
- Escalation risk.
- Conversation quality score.
- Sentiment shift/timeline.

## 6. Recommended KPI Set

Keep the dashboard focused on meaningful KPIs rather than generating excessive metrics.

| KPI | Purpose |
|---|---|
| Overall Sentiment | Overall conversation tone |
| Customer Sentiment | Customer emotional state |
| Agent Sentiment | Agent communication tone |
| Customer Frustration | Detect dissatisfaction |
| Empathy Score | Evaluate agent acknowledgement and empathy |
| Resolution Status | Resolved / Partially Resolved / Unresolved / Escalated |
| Escalation Risk | Low / Medium / High |
| Conversation Quality | Overall quality score |
| Dominant Emotion | Main emotional state |
| Sentiment Shift | Detect improvement or worsening |

## 7. Dashboard Requirements

### Header
- Product/application name.
- Logged-in user.
- Logout action.

### KPI Cards
Show key metrics prominently:
- Overall sentiment.
- Conversation quality.
- Empathy.
- Customer frustration.
- Resolution status.

### Visualizations
Recommended:
- Sentiment distribution chart.
- Emotion distribution chart.
- Sentiment timeline.
- Sentence-level sentiment visualization.

### Conversation Summary
Display a concise AI-generated summary.

### Transcript Analysis
Show each sentence with:
- Speaker.
- Original text.
- Sentiment.
- Emotion.
- Optional score.
- Optional AI reasoning.

The transcript should remain readable and easy to scan.

## 8. AI Output Contract

The AI/orchestration layer should return structured JSON rather than UI-specific prose.

Suggested schema:

```json
{
  "overall_sentiment": "negative",
  "overall_score": -0.72,
  "summary": "Customer contacted support regarding an unresolved technical issue.",
  "dominant_emotion": "frustration",
  "resolution_status": "escalated",
  "escalation_risk": "high",
  "conversation_quality": 74,
  "customer": {
    "sentiment": "negative",
    "frustration": 86,
    "satisfaction": 32
  },
  "agent": {
    "sentiment": "neutral",
    "empathy": 78,
    "professionalism": 91
  },
  "sentences": [
    {
      "speaker": "customer",
      "text": "I've been waiting for three days.",
      "sentiment": "negative",
      "score": -0.86,
      "emotion": "frustration",
      "reason": "The customer expresses dissatisfaction about the delay."
    }
  ]
}
```

The exact implementation/schema can be refined during technical design, but the frontend should consume a stable structured contract.

## 9. Sentence Object

Each analyzed sentence should ideally contain:

```json
{
  "speaker": "customer",
  "text": "I've been waiting for three days.",
  "sentiment": "negative",
  "score": -0.86,
  "emotion": "frustration",
  "reason": "The customer expresses dissatisfaction about the delay."
}
```

Reasoning is useful because AI quality should include logical accuracy and clear reasoning when an LLM is used.

## 10. Architecture

Preferred architecture:

```text
                    User
                      |
                      v
             React / Next.js UI
                      |
                      v
                 API Layer
                      |
                      v
                     n8n
                Orchestration
                      |
                      v
                  AI Model
                      |
                      v
             Structured JSON
                      |
                      v
              Next.js Dashboard
```

Important architectural rule:

- UI handles presentation and user interaction.
- Backend/API handles requests and validation.
- n8n handles orchestration.
- AI model handles analysis.
- Frontend renders structured results.

Do not put AI provider secrets in the frontend.

## 11. Recommended Technology

Frontend:
- Next.js
- React
- TypeScript
- Tailwind CSS

Charts:
- Recharts or another lightweight React charting library.

Backend:
- Next.js API routes/server endpoints, unless a separate backend is justified.

Orchestration:
- n8n.

AI:
- An appropriate sentiment/LLM model selected during implementation.

Deployment:
- Vercel or Netlify.

Do not over-engineer infrastructure for the assignment.

## 12. User Journey

```text
Login
  ↓
Dashboard
  ↓
Upload .txt transcript
  ↓
Validate file
  ↓
"Analyzing conversation..."
  ↓
Backend/API
  ↓
n8n workflow
  ↓
AI analysis
  ↓
Structured JSON
  ↓
Results dashboard
  ↓
Explore sentiment, emotions, KPIs and transcript
```

## 13. Error Handling

The application should gracefully handle:

- Invalid file type.
- Empty transcript.
- Excessively large file.
- Network failure.
- Backend failure.
- n8n failure.
- AI provider failure.
- Invalid/malformed AI response.
- Missing fields in AI output.

Errors should be understandable to the user and should not expose secrets or internal implementation details.

## 14. UX Requirements

The UI should be:

- Clean.
- Modern.
- Readable.
- Responsive.
- Easy to navigate.
- Clear about loading/processing states.
- Clear about errors.
- Designed around information hierarchy rather than excessive decoration.

The evaluator should understand the analysis within a few seconds of seeing the dashboard.

## 15. AI Quality Requirements

The system should prioritize:

- Logical sentiment classification.
- Consistency between overall and sentence-level sentiment.
- Clear reasoning for important classifications.
- Structured and predictable output.
- Avoiding hallucinated facts not supported by the transcript.

Where a KPI cannot reliably be derived from the transcript, the system should avoid pretending that it has exact factual data.

## 16. Conversation Intelligence Logic

The system should distinguish between:

### Customer analysis
- Sentiment.
- Emotion.
- Frustration.
- Satisfaction indicators.

### Agent analysis
- Sentiment.
- Empathy.
- Professionalism.
- Response quality.

### Conversation analysis
- Overall sentiment.
- Sentiment progression.
- Resolution status.
- Escalation risk.
- Conversation quality.
- Summary.

## 17. Sentiment Timeline

A useful visualization is sentiment across the conversation.

For example:

```text
Start                                    End
Negative → Negative → Neutral → Positive → Positive
```

This helps demonstrate whether the interaction de-escalated or became worse.

## 18. Definition of Done

The project is complete when a fresh user can:

1. Open the deployed application.
2. Log in.
3. Upload a valid `.txt` transcript.
4. See a processing/loading state.
5. Receive AI analysis.
6. See overall sentiment.
7. Inspect sentence-level sentiment.
8. See conversation summary.
9. See meaningful phone-call KPIs.
10. View charts.
11. Understand important AI reasoning.
12. Use the application without developer intervention.

## 19. Development Plan

Build incrementally.

### Phase 1 — Project Foundation
- Initialize Next.js + TypeScript.
- Configure styling.
- Establish folder structure.
- Build application shell.
- Build basic login.
- Build dashboard layout.

### Phase 2 — Upload Flow
- Build `.txt` upload component.
- Add validation.
- Add loading/error states.
- Implement API endpoint.

### Phase 3 — AI Pipeline
- Build n8n workflow.
- Connect API to n8n.
- Connect AI model.
- Define and validate structured JSON response.

### Phase 4 — Required Analysis
- Overall sentiment.
- Sentence-level sentiment.
- Basic KPIs.
- Summary.

### Phase 5 — Differentiation
- Emotion detection.
- Sentiment timeline.
- Empathy score.
- Resolution status.
- Escalation risk.
- Conversation quality.

### Phase 6 — Polish
- Responsive UI.
- Better charts.
- Loading states.
- Error handling.
- Sample transcript/demo data.
- README.
- Architecture documentation.
- Deployment.

## 20. Engineering Principles

- Keep components modular.
- Keep AI logic outside the UI.
- Use TypeScript types for API/AI responses.
- Validate AI output before rendering.
- Keep secrets server-side.
- Avoid unnecessary dependencies.
- Avoid premature optimization.
- Prefer simple, explainable architecture.
- Make implementation decisions that can be clearly explained in a technical interview.

## 21. Evaluation Alignment

The project should explicitly optimize for:

### AI Quality
- Logical sentiment classification.
- Clear reasoning.
- Reliable structured output.

### Architecture
- Clean UI → API → n8n → AI separation.

### UX/UI
- Clean dashboard.
- Easy upload.
- Readable results.
- Clear visual hierarchy.

### Creativity
- Charts.
- Emotion detection.
- Summary.
- Additional useful KPIs.

## 22. Out of Scope for MVP

Do not initially build:

- Complex user management.
- Multi-tenant architecture.
- Billing.
- Real-time call transcription.
- Native mobile application.
- Large-scale database infrastructure.
- Advanced authentication/authorization.
- Complicated agent frameworks unless clearly justified.

Focus on making the core assignment polished and technically defensible.

## 23. Final Product Positioning

This should feel like a small **AI Conversation Intelligence product**, not merely a form that sends text to an LLM.

The strongest demo should communicate:

```text
Upload transcript
       ↓
Secure/structured AI pipeline
       ↓
Sentiment + emotions + KPIs
       ↓
Actionable conversation intelligence
       ↓
Professional dashboard
```

## 24. Next Step

Before writing the application code, create a Technical Design Document based on this PRD covering:

1. Exact project/folder structure.
2. Component architecture.
3. API endpoints.
4. Request/response schemas.
5. n8n workflow design.
6. AI model strategy.
7. Prompt design.
8. JSON schema validation.
9. Error-handling strategy.
10. Local development setup.
11. Environment variables.
12. Deployment architecture.
13. Implementation order.

Do not start by building unnecessary features. First establish the architecture and contracts, then implement the MVP incrementally.
