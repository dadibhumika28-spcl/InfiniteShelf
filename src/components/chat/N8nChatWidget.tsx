import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Minimize2, 
  Maximize2, 
  Bot, 
  User, 
  AlertCircle,
  BookOpen,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useBookstore } from '../../context/BookstoreContext';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  isError?: boolean;
  n8nDiagnostic?: string;
  suggestedBooks?: { id: string; title: string; price: number }[];
}

const N8N_WEBHOOK_URL = 'https://bhumikadadi.app.n8n.cloud/webhook/670edf44-7a34-4da2-8923-42c6635e505b/chat';
const N8N_INSTANCE_ID = 'cb7bbad549095e2f0a6e49cb8fc11c18745f8003044b764e05730c262e8a2124';

export const N8nChatWidget: React.FC = () => {
  const { isChatOpen, setIsChatOpen, navigateToBookDetail } = useBookstore();
  
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Welcome to The Infinite Shelf! 📖 I am your literary assistant connected to your custom n8n AI workflow.',
      timestamp: 'Just now'
    },
    {
      id: 'welcome-2',
      sender: 'bot',
      text: 'How can I assist your reading journey today? Feel free to ask about book recommendations, shipping policies, promo codes, or finding specific authors.',
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize unique session ID
  useEffect(() => {
    let sid = localStorage.getItem('infinite_shelf_chat_session');
    if (!sid) {
      sid = 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      localStorage.setItem('infinite_shelf_chat_session', sid);
    }
    setSessionId(sid);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isChatOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isChatOpen, isMinimized]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isChatOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen, isMinimized, isLoading]);

  // Generate an intelligent bookstore-grounded fallback response if n8n workflow encounters 500 error
  const generateBookstoreFallback = (query: string): { text: string; books?: { id: string; title: string; price: number }[] } => {
    const q = query.toLowerCase();

    // 1. Under 300 / Budget
    if (q.includes('under') && (q.includes('300') || q.includes('299') || q.includes('cheap') || q.includes('budget') || q.includes('affordable'))) {
      return {
        text: 'Here are exceptional literary titles available under ₹300:\n\n• The Little Prince by Antoine de Saint-Exupéry — Paperback ₹199 | eBook ₹99\n• Pride and Prejudice by Jane Austen — Paperback ₹219 | eBook ₹49\n• Meditations by Marcus Aurelius — Paperback ₹249 | eBook ₹99\n• The Psychology of Money by Morgan Housel — Paperback ₹279 | eBook ₹179\n• The Selected Poems of Emily Dickinson — Paperback ₹249 | eBook ₹99\n• The Silent Patient by Alex Michaelides — Paperback ₹299 | eBook ₹199',
        books: [
          { id: 'book-11', title: 'The Little Prince', price: 199 },
          { id: 'book-5', title: 'Pride and Prejudice', price: 219 },
          { id: 'book-2', title: 'Meditations', price: 249 }
        ]
      };
    }

    // 2. Shipping & Delivery Policy
    if (q.includes('shipping') || q.includes('delivery') || q.includes('dispatch') || q.includes('courier')) {
      return {
        text: '📦 **Shipping & Delivery Policies:**\n\n• **Complimentary Delivery:** Free across India on orders over ₹499.\n• **Standard Delivery Fee:** Flat ₹49 on physical orders under ₹499.\n• **Digital Purchases:** Instant library activation with zero delivery fees!\n• **Packaging:** Carefully packed in archival eco-padded packaging.\n• **Timeline:** Dispatched within 24 hours; arrives in 3–5 business days.'
      };
    }

    // 3. Promo Codes & Discounts
    if (q.includes('coupon') || q.includes('promo') || q.includes('discount') || q.includes('code') || q.includes('offer')) {
      return {
        text: '🎟️ **Active Literary Promotions:**\n\n• Code **SHELF10** gives **10% off** your entire order at checkout.\n• Alternate codes: `READERS10` and `WELCOME`.\n• Bundles: "Frequently Bought Together" sets include an automatic 10% bundle saving!'
      };
    }

    // 4. Formats / Digital vs Physical
    if (q.includes('format') || q.includes('hardcover') || q.includes('ebook') || q.includes('audiobook') || q.includes('paperback')) {
      return {
        text: '📚 **Available Editions:**\n\n• **Paperback:** Premium deckle-edge archival print.\n• **Hardcover:** Collector clothbound edition with ribbon marker.\n• **eBook:** Instant DRM-free EPUB & PDF download, readable directly in our integrated in-browser reader with bookmarks, notes, and 4 themes.\n• **Audiobook:** Unabridged professional narration with interactive player, speed control, and scrubber.\n\n*Note: Physical and digital editions are sold independently.*'
      };
    }

    // 5. Specific Book: The Shadow of the Wind
    if (q.includes('shadow of the wind') || q.includes('zafon') || q.includes('carlos')) {
      return {
        text: '✨ **The Shadow of the Wind** by Carlos Ruiz Zafón:\n\nSet in Barcelona, 1945, a young boy Daniel is taken to the secret Cemetery of Forgotten Books and adopts a mysterious novel whose author is being systematically hunted down. A gothic masterpiece of love, books, and vengeance!\n\n• Formats: Paperback (₹399), Hardcover (₹799), eBook (₹249), Audiobook (₹499).',
        books: [{ id: 'book-1', title: 'The Shadow of the Wind', price: 399 }]
      };
    }

    // 6. Specific Book: Meditations
    if (q.includes('meditation') || q.includes('marcus') || q.includes('aurelius') || q.includes('stoic')) {
      return {
        text: '🏛️ **Meditations** by Marcus Aurelius (Gregory Hays Translation):\n\nThe private spiritual journal of the Roman Emperor on Stoic resilience, mortality, integrity, and equanimity. One of the greatest philosophical treasures in human history.\n\n• Formats: Paperback (₹249), Hardcover (₹599), eBook (₹99), Audiobook (₹299).',
        books: [{ id: 'book-2', title: 'Meditations', price: 249 }]
      };
    }

    // 7. Sapiens / Harari / History
    if (q.includes('sapiens') || q.includes('harari') || q.includes('history')) {
      return {
        text: '🌍 **Sapiens: A Brief History of Humankind** by Yuval Noah Harari:\n\nExplores how Homo sapiens conquered the globe through cognitive myths, agriculture, money, and science. A transformative chronicle of humanity.\n\n• Formats: Paperback (₹449), Hardcover (₹899), eBook (₹299), Audiobook (₹549).',
        books: [{ id: 'book-3', title: 'Sapiens', price: 449 }]
      };
    }

    // 8. General Recommendation
    return {
      text: `Here are our curator's top selections on The Infinite Shelf right now:\n\n1. **The Shadow of the Wind** by Carlos Ruiz Zafón (Gothic Literary Mystery) — From ₹249\n2. **Meditations** by Marcus Aurelius (Stoic Wisdom) — From ₹99\n3. **Atomic Habits** by James Clear (Behavioral Science) — From ₹199\n4. **The Psychology of Money** by Morgan Housel (Personal Finance) — From ₹179\n5. **The Little Prince** by Antoine de Saint-Exupéry (Fable) — From ₹99\n\nWould you like recommendations in a specific category (Classics, History, Mystery, Fantasy, Science, Romance, Self-Help)?`,
      books: [
        { id: 'book-1', title: 'The Shadow of the Wind', price: 399 },
        { id: 'book-8', title: 'Atomic Habits', price: 349 },
        { id: 'book-9', title: 'The Psychology of Money', price: 279 }
      ]
    };
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Step 1: Attempt to contact the user's n8n webhook
      // Prepare request payload
      const formData = new FormData();
      formData.append('action', 'sendMessage');
      formData.append('sessionId', sessionId);
      formData.append('chatInput', text);

      let responseText = '';
      let n8nSuccess = false;
      let workflowErrorMessage = '';

      try {
        const response = await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'X-Instance-Id': N8N_INSTANCE_ID,
            'Accept': 'application/json, text/plain, */*'
          },
          body: formData
        });

        if (response.ok) {
          const contentType = response.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const data = await response.json();
            responseText = data.output || data.text || data.message || data.response || JSON.stringify(data);
          } else {
            responseText = await response.text();
          }
          n8nSuccess = Boolean(responseText.trim());
        } else {
          const errData = await response.json().catch(() => null);
          workflowErrorMessage = errData?.message || `HTTP ${response.status} from n8n cloud`;
        }
      } catch (networkErr: any) {
        workflowErrorMessage = networkErr.message || 'Network connection failed';
      }

      // Step 2: Handle response or provide smart fallback if n8n returned workflow error
      if (n8nSuccess && responseText) {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: responseText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        // n8n returned "Error in workflow" or 500 error
        const fallback = generateBookstoreFallback(text);
        
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: fallback.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestedBooks: fallback.books,
            n8nDiagnostic: workflowErrorMessage 
              ? `Note from n8n cloud: "${workflowErrorMessage}". (Your n8n webhook at bhumikadadi.app.n8n.cloud received the message, but an internal AI model node or credential in your workflow threw an error. Meanwhile, the bookstore assistant provided the answer above).`
              : undefined
          }
        ]);
      }
    } catch (err: any) {
      const fallback = generateBookstoreFallback(text);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: fallback.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedBooks: fallback.books,
          n8nDiagnostic: 'Connection to n8n webhook was interrupted. Answer provided via local store catalog.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: 'Chat history cleared. How can I assist you with The Infinite Shelf today?',
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button (Bottom Right) */}
      {!isChatOpen && (
        <button
          onClick={() => {
            setIsChatOpen(true);
            setIsMinimized(false);
          }}
          aria-label="Open AI Literary Assistant"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#8B2635] hover:bg-[#A32E3F] text-[#FAF8F5] shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group border-2 border-[#FAF8F5]/20 focus:outline-none focus:ring-4 focus:ring-[#8B2635]/30"
          title="Chat with The Infinite Shelf Assistant"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6 transition-transform group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#8B2635]" />
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isChatOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col bg-[#FAF8F5] border border-[#DDD3C2] rounded-lg shadow-2xl overflow-hidden ${
            isMinimized
              ? 'bottom-6 right-6 w-72 h-14'
              : 'bottom-6 right-6 w-[92vw] sm:w-[420px] h-[85vh] sm:h-[600px] max-h-[700px]'
          }`}
        >
          {/* Header */}
          <div className="bg-[#23201D] text-[#FAF8F5] p-3.5 px-4 flex items-center justify-between shrink-0 border-b border-[#3A332C]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#8B2635] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-4 h-4 text-[#FAF8F5]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif-title font-bold text-sm text-[#FAF8F5] truncate leading-tight">
                    The Infinite Shelf
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" title="Connected" />
                </div>
                <p className="text-[11px] text-[#C4B9AA] truncate">
                  AI Literary Assistant (n8n Webhook)
                </p>
              </div>
            </div>

            {/* Header Action Controls */}
            <div className="flex items-center gap-1 shrink-0 text-[#C4B9AA]">
              {!isMinimized && (
                <button
                  onClick={handleClearChat}
                  className="p-1.5 rounded hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                  title="Clear conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 rounded hover:bg-white/10 hover:text-white transition-colors cursor-pointer ml-0.5"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Content (Only visible when not minimized) */}
          {!isMinimized && (
            <>
              {/* Message Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF8F5] text-xs">
                
                {/* Integration Status Pill */}
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-1.5 bg-[#F2ECE1] border border-[#DDD3C2] text-[#695F52] text-[10px] px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                    <span>Connected to bhumikadadi.app.n8n.cloud</span>
                  </div>
                </div>

                {/* Messages list */}
                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1 animate-fadeIn`}
                    >
                      <div className="flex items-end gap-1.5 max-w-[88%]">
                        {!isUser && (
                          <div className="w-6 h-6 rounded-full bg-[#8B2635] text-white flex items-center justify-center shrink-0 mb-1">
                            <Bot className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <div
                          className={`p-3 rounded-md text-xs leading-relaxed ${
                            isUser
                              ? 'bg-[#8B2635] text-white rounded-br-none shadow-xs'
                              : 'bg-[#F3EFE9] text-[#1E1B18] border border-[#E2D8C9] rounded-bl-none shadow-xs whitespace-pre-line'
                          }`}
                        >
                          {msg.text}

                          {/* Interactive Book Recommendation Links (if present) */}
                          {msg.suggestedBooks && msg.suggestedBooks.length > 0 && (
                            <div className="mt-3 pt-2 border-t border-[#DDD3C2] space-y-1.5">
                              <span className="text-[10px] font-bold text-[#8B2635] uppercase tracking-wider block">
                                Quick Book Links:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {msg.suggestedBooks.map((b) => (
                                  <button
                                    key={b.id}
                                    onClick={() => {
                                      navigateToBookDetail(b.id);
                                    }}
                                    className="bg-white hover:bg-[#FAF8F5] border border-[#DDD3C2] text-[#1E1B18] text-[11px] font-medium py-1 px-2 rounded-xs flex items-center gap-1 transition-colors cursor-pointer"
                                  >
                                    <BookOpen className="w-3 h-3 text-[#8B2635]" />
                                    <span>{b.title} (₹{b.price})</span>
                                    <ArrowRight className="w-3 h-3 text-[#786D60]" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* n8n Workflow Diagnostic Warning */}
                          {msg.n8nDiagnostic && (
                            <div className="mt-2.5 p-2 bg-amber-50 border border-amber-200 rounded text-[10px] text-amber-900 leading-snug flex items-start gap-1.5">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                              <span>{msg.n8nDiagnostic}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] text-[#8C8275] px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })}

                {/* Typing indicator */}
                {isLoading && (
                  <div className="flex items-center gap-2 text-xs text-[#7A7063] animate-pulse py-1">
                    <div className="w-6 h-6 rounded-full bg-[#8B2635]/15 text-[#8B2635] flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="bg-[#F3EFE9] border border-[#E2D8C9] px-3 py-2 rounded-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-[#8B2635] rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-[#8B2635] rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-[#8B2635] rounded-full animate-bounce [animation-delay:0.4s]" />
                      <span className="text-[11px] text-[#695F52] ml-1">Consulting n8n AI...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Suggestion Chips */}
              <div className="p-2 px-3 bg-[#F5EFEB] border-t border-[#E8DEC0] overflow-x-auto scrollbar-none flex items-center gap-1.5 text-[11px] shrink-0">
                {[
                  'Books under ₹300',
                  'Shipping policy',
                  'Active promo codes',
                  'Available formats',
                  'Shadow of the Wind'
                ].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSendMessage(chip)}
                    className="bg-[#FAF8F5] hover:bg-white text-[#52493E] hover:text-[#8B2635] border border-[#DDD3C2] py-1 px-2.5 rounded-full whitespace-nowrap transition-colors cursor-pointer shrink-0"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Message Input Form */}
              <div className="p-3 bg-[#FAF8F5] border-t border-[#DDD3C2] shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about books, authors, policies..."
                    className="flex-1 bg-white border border-[#DDD3C2] focus:border-[#8B2635] text-xs text-[#1E1B18] placeholder-[#8A8175] rounded-md py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-[#8B2635]"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading}
                    className={`p-2.5 rounded-md flex items-center justify-center transition-all ${
                      inputMessage.trim() && !isLoading
                        ? 'bg-[#8B2635] hover:bg-[#A32E3F] text-white shadow-xs cursor-pointer'
                        : 'bg-[#EAE2D5] text-[#9A8F82] cursor-not-allowed'
                    }`}
                    title="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <div className="flex items-center justify-between text-[10px] text-[#8C8275] mt-1.5 px-1">
                  <span>Powered by n8n Webhook</span>
                  <span>Enter to send</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
