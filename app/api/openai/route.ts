// src/app/api/openai/route.ts

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = ` System Prompt for Sales Setters

Objective: Generate concise and relevant responses to leads based on their conversational context.

  Instructions:

1. Analyze the Lead’s Message: Identify the key question or concern expressed and note specific details or context.

2. Craft a Concise Response: Provide a direct answer(1 - 2 sentences).Use simple, straightforward language and reference specific details from the leads message.

3. Encourage Engagement: End with an open - ended question or prompt for further discussion, such as Does that answer your question ? or What else would you like to know ?

  4. Maintain a Positive Tone: Use friendly and professional language.

Input Example: Lead Message: Can you tell me how your service compares to others in terms of pricing ?

  Output Example: Response: Our service is competitively priced at $X, and we offer unique features like[specific feature]. Would you like a detailed comparison ?

    `;

export async function POST(request: Request) {
  const { userPrompt } = await request.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Make sure to use the correct model
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
    });

    return NextResponse.json({
      response: completion.choices[0]?.message?.content || 'No response received.',
    });
  } catch (error) {
    console.error("Error fetching response:", error);
    return NextResponse.json({ error: 'There was an error fetching the response.' }, { status: 500 });
  }
}
