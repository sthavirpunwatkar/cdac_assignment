# AI Conversation Sentiment Analyzer

## Project Overview
This is a full-stack AI-powered web application that accepts a conversation/phone-call transcript as a `.txt` file, analyzes it using AI, and presents actionable insights through a clean, readable dashboard.

## Features
- **Authentication**: Basic assignment-level login protection.
- **Transcript Upload**: Upload `.txt` transcripts (up to 5MB limit).
- **Overall Sentiment**: AI determines if the call was positive, negative, or neutral.
- **Sentence-Level Analysis**: Line-by-line sentiment breakdown and AI reasoning.
- **KPI Dashboard**: Displays conversation quality, resolution status, agent empathy, and escalation risk.
- **Visualizations**: Charts mapping emotion distribution and sentiment timeline.

## Architecture
```
User -> Next.js UI -> API Route -> Vercel AI SDK -> OpenAI -> JSON -> Dashboard
```
*Note: This project leverages the Vercel AI SDK directly within the Next.js API route as its agentic orchestration tool. This ensures strict JSON schema validation, keeps AI secrets on the backend, and allows for zero-configuration serverless deployment on Vercel without requiring a standalone n8n server.*

## Tech Stack
- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Visualizations**: Recharts, Lucide React
- **Backend / AI Orchestration**: Vercel AI SDK (`generateObject`), Zod
- **AI Model**: Groq (`llama-3.1-70b-versatile`) via OpenAI compatibility API

## Local Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables by copying the example file:
   ```bash
   cp .env.example .env.local
   ```
4. Add your `GROQ_API_KEY` to `.env.local`.
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) and login with `test@example.com` / `password123`.

## Environment Variables
- `GROQ_API_KEY`: Your Groq API key required for actual AI analysis. If omitted, the application falls back to rendering mock data for UI testing purposes.

## AI Output Schema
The application strictly enforces a JSON contract using Zod in the API layer before it reaches the frontend. This includes properties like `overall_sentiment`, `summary`, `resolution_status`, `escalation_risk`, and an array of `sentences` with individual `score` and `emotion` tagging.
