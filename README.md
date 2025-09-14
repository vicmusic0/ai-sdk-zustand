# ai-sdk-zustand

Drop-in replacement for `@ai-sdk/react` that gives you global state access to your AI chats. No prop drilling, better performance, multiple chat instances.

## Why Use This?

**Problem**: Regular `useChat` traps state in one component. Need chat data elsewhere? Props everywhere.

**Solution**: Same `useChat` API + global Zustand store access from any component.

```bash
bun add ai-sdk-zustand
```

## Migration (30 seconds)

```tsx
// Before
import { useChat } from '@ai-sdk/react'

// After - ONLY CHANGE NEEDED
import { useChat } from 'ai-sdk-zustand'
```

Everything else works exactly the same.

## Core Benefits

### 1. **Access Chat from Any Component**

```tsx
// ❌ Regular useChat - state trapped
function App() {
  const { messages, sendMessage } = useChat()
  return <Layout messages={messages} sendMessage={sendMessage} />
}

// ✅ ai-sdk-zustand - access anywhere
function App() {
  useChat({ api: '/api/chat' }) // Initialize once
  return <Layout />
}

function Layout() {
  const messages = useChatMessages() // Direct access!
  const sendMessage = useChatSendMessage()
  return <div>...</div>
}
```

### 2. **Optimized Re-renders**

```tsx
// ❌ Regular useChat - everything re-renders
function Chat() {
  const { messages, isLoading, error } = useChat()
  // Re-renders when ANY of these change
}

// ✅ ai-sdk-zustand - selective subscriptions  
function MessageCount() {
  const count = useChatMessageCount() // Only re-renders when count changes
}

function LoadingSpinner() {
  const isLoading = useChatIsLoading() // Only re-renders when loading changes
}
```

### 3. **Multiple Chat Instances**

```tsx
function MultiChat() {
  useChat({ api: '/api/support', storeId: 'support' })
  useChat({ api: '/api/sales', storeId: 'sales' })
  
  return (
    <div>
      <SupportChat />
      <SalesChat />
    </div>
  )
}

function SupportChat() {
  const messages = useChatMessages('support')
  const sendMessage = useChatSendMessage('support')
}
```

### 4. **Custom Zustand Stores**

```tsx
import { createCustomChatStore } from 'ai-sdk-zustand'
import { persist } from 'zustand/middleware'

// Custom store with persistence
const persistedStore = createCustomChatStore(
  persist(
    (set) => ({ /* your config */ }),
    { name: 'chat-storage' }
  )
)

function PersistentChat() {
  const chat = useChat({
    api: '/api/chat',
    store: persistedStore // Chat survives page refresh!
  })
}
```

## API

### Hooks

```tsx
// Main hook - same as @ai-sdk/react
const chat = useChat({ api: '/api/chat' })

// Store access
const messages = useChatMessages()
const isLoading = useChatIsLoading()
const sendMessage = useChatSendMessage()

// Multiple chats
const supportChat = useChat({ api: '/api/support', storeId: 'support' })
const supportMessages = useChatMessages('support')

// Custom store
const chat = useChat({ store: myCustomStore })
```

### Selectors (Performance)

```tsx
// Basic selectors
useChatMessages()           // Message array
useChatIsLoading()          // Loading state
useChatError()              // Error state
useChatStatus()             // Chat status

// Message selectors
useChatLatestMessage()      // Last message
useChatUserMessages()       // User messages only
useChatAssistantMessages()  // Assistant messages only
useChatMessageCount()       // Message count

// Actions
useChatSendMessage()        // Send function
useChatRegenerate()         // Regenerate function
useChatStop()               // Stop function

// Custom selector
useChatProperty(state => state.messages.filter(m => m.role === 'user'))
```

### Custom Stores

```tsx
import { createCustomChatStore } from 'ai-sdk-zustand'
import { devtools, persist } from 'zustand/middleware'

// With persistence
const persistedStore = createCustomChatStore(
  persist(
    (set) => ({ /* config */ }),
    { name: 'chat-history' }
  )
)

// With devtools
const debugStore = createCustomChatStore(
  devtools((set) => ({ /* config */ }))
)

// Use custom store
const chat = useChat({ store: persistedStore })
```

## Full TypeScript Support

```tsx
// Define custom message type with tools
interface MyMessage extends UIMessage<
  { userId: string }, // metadata
  { weather: WeatherData }, // data
  { getWeather: { input: { location: string }, output: WeatherData } } // tools
> {}

// Use with full typing
const chat = useChat<MyMessage>({ api: '/api/chat' })
const messages = useChatMessages<MyMessage>() // Fully typed!
```

## When to Use This vs Regular useChat

**Use ai-sdk-zustand when:**
- Multiple components need chat data
- Building complex chat UIs  
- Multiple chat instances
- Need performance optimization
- Want persistence or custom middleware

**Use regular useChat when:**
- Simple single-component chat
- No cross-component access needed

## Migration Benefits

- ✅ **Zero breaking changes** - same API
- ✅ **Better performance** - selective re-renders
- ✅ **No prop drilling** - access from anywhere
- ✅ **Multiple chats** - easy with `storeId`
- ✅ **Custom stores** - persistence, devtools, etc.
- ✅ **Full TypeScript** - same generic support

## License

MIT
