// src/app/api/openai/route.ts

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { systemPrompt, userPrompt } = await request.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Make sure to use the correct model
      messages: [
        { role: "system", content: systemPrompt },
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
