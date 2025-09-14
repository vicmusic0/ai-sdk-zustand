import { useChatStore } from './hooks'
import type { ChatStore } from './store'
import type { UIMessage } from '@ai-sdk/react'

export function useChatProperty<TMessage extends UIMessage = UIMessage, T = any>(
  selector: (state: ChatStore<TMessage>) => T,
  storeId: string = 'default'
): T {
  return useChatStore<TMessage, T>(selector, storeId)
}

export function useChatMessages<TMessage extends UIMessage = UIMessage>(
  storeId: string = 'default'
): TMessage[] {
  return useChatStore<TMessage>((state) => state.messages, storeId)
}

export function useChatId(storeId: string = 'default'): string {
  return useChatStore((state) => state.id, storeId)
}

export function useChatStatus(storeId: string = 'default'): 'submitted' | 'streaming' | 'ready' | 'error' {
  return useChatStore((state) => state.status, storeId)
}

export function useChatError(storeId: string = 'default'): Error | undefined {
  return useChatStore((state) => state.error, storeId)
}

export function useChatSendMessage(storeId: string = 'default') {
  return useChatStore((state) => state.sendMessage, storeId)
}

export function useChatRegenerate(storeId: string = 'default') {
  return useChatStore((state) => state.regenerate, storeId)
}

export function useChatStop(storeId: string = 'default') {
  return useChatStore((state) => state.stop, storeId)
}

export function useChatResumeStream(storeId: string = 'default') {
  return useChatStore((state) => state.resumeStream, storeId)
}

export function useChatAddToolResult(storeId: string = 'default') {
  return useChatStore((state) => state.addToolResult, storeId)
}

export function useChatSetMessages(storeId: string = 'default') {
  return useChatStore((state) => state.setMessages, storeId)
}

export function useChatClearError(storeId: string = 'default') {
  return useChatStore((state) => state.clearError, storeId)
}

export function useChatLatestMessage<TMessage extends UIMessage = UIMessage>(
  storeId: string = 'default'
): TMessage | undefined {
  return useChatStore<TMessage>((state) => {
    const messages = state.messages
    return messages.length > 0 ? messages[messages.length - 1] : undefined
  }, storeId)
}

export function useChatUserMessages<TMessage extends UIMessage = UIMessage>(
  storeId: string = 'default'
): TMessage[] {
  return useChatStore<TMessage>(
    (state) => state.messages.filter((msg) => msg.role === 'user'),
    storeId
  )
}

export function useChatAssistantMessages<TMessage extends UIMessage = UIMessage>(
  storeId: string = 'default'
): TMessage[] {
  return useChatStore<TMessage>(
    (state) => state.messages.filter((msg) => msg.role === 'assistant'),
    storeId
  )
}

export function useChatMessageCount(storeId: string = 'default'): number {
  return useChatStore((state) => state.messages.length, storeId)
}

export function useChatHasMessages(storeId: string = 'default'): boolean {
  return useChatStore((state) => state.messages.length > 0, storeId)
}

export function useChatIsLoading(storeId: string = 'default'): boolean {
  return useChatStore((state) => state.status === 'submitted' || state.status === 'streaming', storeId)
}

export function useChatStatusInfo(storeId: string = 'default'): {
  status: 'submitted' | 'streaming' | 'ready' | 'error'
  isLoading: boolean
  error: Error | undefined
  hasError: boolean
} {
  return useChatStore(
    (state) => ({
      status: state.status,
      isLoading: state.status === 'submitted' || state.status === 'streaming',
      error: state.error,
      hasError: !!state.error,
    }),
    storeId
  )
}

export function useChatMessaging(storeId: string = 'default') {
  return useChatStore(
    (state) => ({
      messages: state.messages,
      sendMessage: state.sendMessage,
      regenerate: state.regenerate,
      setMessages: state.setMessages,
    }),
    storeId
  )
}
