// src/app/page.tsx

'use client';
import { useState } from 'react';

export default function Home() {
  const [systemPrompt, setSystemPrompt] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(''); // Reset response

    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ systemPrompt, userPrompt }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data.response);
      } else {
        setResponse(data.error || 'Unexpected error');
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setResponse('There was an error communicating with the API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="systemPrompt"
          placeholder="Enter system prompt"
          onChange={(e) => setSystemPrompt(e.target.value)}
          value={systemPrompt}
        />
        <input
          type="text"
          name="userPrompt"
          placeholder="Enter user prompt"
          onChange={(e) => setUserPrompt(e.target.value)}
          value={userPrompt}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Response'}
        </button>
      </form>
      <div>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}
