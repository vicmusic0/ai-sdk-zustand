import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { UseChatHelpers, UIMessage } from '@ai-sdk/react'

export interface ChatStore<TMessage extends UIMessage = UIMessage> extends UseChatHelpers<TMessage> {}

const storeInstances = new Map<string, any>()

function createChatStore() {
  return create<ChatStore>()(
    devtools(
      (set) => ({
        id: '',
        messages: [],
        error: undefined,
        status: 'ready' as const,
        sendMessage: async () => {},
        regenerate: async () => {},
        stop: async () => {},
        resumeStream: async () => {},
        addToolResult: async () => {},
        setMessages: () => {},
        clearError: () => {},
        _syncState: (newState: Partial<ChatStore>) => {
          set(newState, false, 'syncFromUseChat')
        },
      } as ChatStore & { _syncState: (newState: Partial<ChatStore>) => void }),
      {
        name: 'ai-chat-store',
      }
    )
  )
}

export function getChatStore(storeId: string = 'default'): any {
  if (!storeInstances.has(storeId)) {
    storeInstances.set(storeId, createChatStore())
  }
  return storeInstances.get(storeId)!
}

export function clearChatStore(storeId: string = 'default') {
  storeInstances.delete(storeId)
}

export function clearAllChatStores() {
  storeInstances.clear()
}

export function getChatStoreIds() {
  return Array.from(storeInstances.keys())
}

export type ChatStoreWithSync<TMessage extends UIMessage = UIMessage> = ChatStore<TMessage> & { 
  _syncState: (newState: Partial<ChatStore<TMessage>>) => void 
}

// Helper function for users to create custom chat stores
export function createCustomChatStore<TMessage extends UIMessage = UIMessage>(
  middleware?: (config: any) => any
) {
  type StoreState = ChatStore<TMessage>
  
  const baseConfig = (_set: (partial: Partial<StoreState>) => void) => ({
    id: '',
    messages: [] as TMessage[],
    error: undefined as Error | undefined,
    status: 'ready' as const,
    sendMessage: async () => {},
    regenerate: async () => {},
    stop: async () => {},
    resumeStream: async () => {},
    addToolResult: async () => {},
    setMessages: () => {},
    clearError: () => {},
  })
  
  const baseStore = create<StoreState>()(
    middleware ? middleware(baseConfig) : baseConfig
  )
  
  return baseStore
}
