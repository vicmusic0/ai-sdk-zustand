import { openai } from '@ai-sdk/openai';
import { convertToModelMessages, streamText, UIMessage, tool } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Mock weather data for demonstration
const mockWeatherData = {
  'new york': { location: 'New York', temperature: 22, condition: 'Sunny', humidity: 65, windSpeed: 10 },
  'london': { location: 'London', temperature: 15, condition: 'Cloudy', humidity: 80, windSpeed: 5 },
  'tokyo': { location: 'Tokyo', temperature: 28, condition: 'Partly Cloudy', humidity: 70, windSpeed: 8 },
  'sydney': { location: 'Sydney', temperature: 25, condition: 'Rainy', humidity: 85, windSpeed: 12 },
};

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: 'You are a helpful assistant with access to weather data and calculation tools. Use the tools when appropriate.',
    messages: convertToModelMessages(messages),
    tools: {
      getWeather: tool({
        description: 'Get current weather information for a specific location',
        inputSchema: z.object({
          location: z.string().describe('The location to get weather for'),
        }),
        execute: async ({ location }) => {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const normalizedLocation = location.toLowerCase();
          const weatherData = mockWeatherData[normalizedLocation as keyof typeof mockWeatherData];
          
          if (weatherData) {
            return {
              success: true,
              data: weatherData
            };
          } else {
            return {
              success: false,
              error: `Weather data not available for ${location}. Try: New York, London, Tokyo, or Sydney.`
            };
          }
        },
      }),
      calculate: tool({
        description: 'Perform mathematical calculations',
        inputSchema: z.object({
          expression: z.string().describe('Mathematical expression to evaluate (e.g., "2 + 2" or "sqrt(16)")'),
        }),
        execute: async ({ expression }) => {
          try {
            // Simple expression evaluator (in production, use a proper math library)
            const sanitizedExpression = expression
              .replace(/[^0-9+\-*/().\s]/g, '') // Remove unsafe characters
              .replace(/\s+/g, ''); // Remove spaces
            
            // Basic validation
            if (!sanitizedExpression || /[^0-9+\-*/().]/.test(sanitizedExpression)) {
              throw new Error('Invalid mathematical expression');
            }
            
            const result = Function(`"use strict"; return (${sanitizedExpression})`)();
            
            if (typeof result !== 'number' || !isFinite(result)) {
              throw new Error('Result is not a valid number');
            }
            
            return {
              result,
              expression: sanitizedExpression,
              success: true
            };
          } catch (error) {
            return {
              success: false,
              error: `Cannot calculate "${expression}": ${error instanceof Error ? error.message : 'Unknown error'}`
            };
          }
        },
      }),
      search: tool({
        description: 'Search for information (mock search for demo)',
        inputSchema: z.object({
          query: z.string().describe('Search query'),
          limit: z.number().optional().describe('Maximum number of results (default: 3)'),
        }),
        execute: async ({ query, limit = 3 }) => {
          // Mock search results
          const mockResults = [
            {
              title: `${query} - Wikipedia`,
              url: `https://en.wikipedia.org/wiki/${query.replace(/\s+/g, '_')}`,
              snippet: `Learn about ${query} on Wikipedia. Comprehensive information and references.`
            },
            {
              title: `${query} News - Latest Updates`,
              url: `https://news.example.com/search?q=${encodeURIComponent(query)}`,
              snippet: `Latest news and updates about ${query} from trusted sources.`
            },
            {
              title: `${query} Guide - How To`,
              url: `https://guide.example.com/${query.toLowerCase().replace(/\s+/g, '-')}`,
              snippet: `Complete guide and tutorial about ${query} with step-by-step instructions.`
            }
          ];
          
          return {
            results: mockResults.slice(0, limit),
            query,
            totalResults: mockResults.length
          };
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}