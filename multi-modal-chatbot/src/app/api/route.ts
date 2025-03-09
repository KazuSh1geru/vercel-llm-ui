import { openai } from '@ai-sdk/openai';
import { streamText, Message } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

/* 
* messages: 会話の履歴
* 会話作成のapi endpointをapp/api/postに設置.
*/

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  // モデルを指定し、会話を作成.
  const result = streamText({
    model: openai('gpt-4o'),
    messages,
  });

  // ストリームを返す.
  return result.toDataStreamResponse();
}