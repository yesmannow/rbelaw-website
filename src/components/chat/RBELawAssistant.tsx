/**
 * RBE Law Assistant - AI Chatbot
 * Uses OpenAI API to answer visitor questions and capture leads
 */

import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Loader2, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface LeadInfo {
  name?: string;
  email?: string;
  phone?: string;
  practiceArea?: string;
}

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const SYSTEM_PROMPT = `You are the RBE Law Assistant, a helpful AI chatbot for Riley Bennett Egloff LLP, a law firm in Indianapolis, Indiana. 

About RBE Law:
- Mid-sized law firm specializing in business defense, insurance, labor & employment, healthcare, construction, bankruptcy, and government law
- Serves clients in Indiana and Kentucky
- Known for "Big Law Expertise, Boutique Attention"
- Main office: 111 Monument Circle, Suite 3700, Indianapolis, IN 46204
- Phone: 317-636-8000

Your role:
1. Answer questions about the firm's practice areas and services
2. Help visitors understand their legal needs
3. Provide general legal information (not legal advice)
4. Collect contact information from interested visitors
5. Schedule consultations

Practice Areas:
- Business Litigation: Contract disputes, trade secrets, partnership disputes
- Insurance Defense: Bad faith defense, coverage disputes, liability defense
- Healthcare Law: HIPAA compliance, licensing, medical malpractice defense
- Construction Law: Mechanics liens, construction defects, delay claims
- Employment Law: Wage and hour defense, discrimination defense, FLSA compliance
- Bankruptcy: Business bankruptcy, creditor rights
- Government Law: Municipal law, public entity defense

Important Guidelines:
- Be professional, friendly, and helpful
- Never provide specific legal advice - always recommend speaking with an attorney
- Ask for contact information when visitors show interest
- Mention relevant practice areas based on their questions
- Suggest scheduling a consultation for specific legal matters
- Keep responses concise (2-3 paragraphs max)

If a visitor asks about a specific legal issue, acknowledge their concern, provide general information, and suggest they speak with one of our attorneys for personalized advice.`;

export const RBELawAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm the RBE Law Assistant. I'm here to help answer your questions about our legal services. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadInfo, setLeadInfo] = useState<LeadInfo>({});
  const [showLeadForm, setShowLeadForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.slice(-10).map(m => ({
              role: m.role,
              content: m.content
            })),
            { role: 'user', content: messageContent }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Check if we should show lead form
      const shouldShowLeadForm = 
        messageContent.toLowerCase().includes('consultation') ||
        messageContent.toLowerCase().includes('contact') ||
        messageContent.toLowerCase().includes('speak with') ||
        messageContent.toLowerCase().includes('hire') ||
        messages.length > 4; // After a few exchanges

      if (shouldShowLeadForm && !leadInfo.email) {
        setTimeout(() => setShowLeadForm(true), 2000);
      }
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please call us at 317-636-8000 or use our contact form to reach our team directly.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save lead to your backend/CRM
    try {
      // TODO: Send to your backend API
      console.log('Lead captured:', leadInfo);
      
      // Show thank you message
      const thankYouMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Thank you, ${leadInfo.name}! One of our attorneys will reach out to you at ${leadInfo.email} within 24 hours. In the meantime, feel free to ask me any other questions.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, thankYouMessage]);
      setShowLeadForm(false);
    } catch (error) {
      console.error('Error saving lead:', error);
    }
  };

  const quickQuestions = [
    "What practice areas do you specialize in?",
    "How much does a consultation cost?",
    "Do you handle employment law cases?",
    "Can you help with a business dispute?",
    "I need help with a construction issue"
  ];

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-primary-navy text-white rounded-full p-4 shadow-lg hover:bg-primary-navy/90 transition-colors"
            aria-label="Open chat"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-accent-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              ?
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary-navy text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="h-6 w-6 mr-2" />
                <div>
                  <h3 className="font-semibold">RBE Law Assistant</h3>
                  <p className="text-xs text-gray-300">Powered by AI</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 rounded p-1 transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start max-w-[80%] ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 ${
                        message.role === 'user' ? 'ml-2' : 'mr-2'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <div className="bg-accent-gold rounded-full p-2">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      ) : (
                        <div className="bg-primary-navy rounded-full p-2">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-accent-gold text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center bg-gray-100 rounded-lg p-3">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span className="text-sm text-gray-600">Typing...</span>
                  </div>
                </div>
              )}

              {/* Lead Form */}
              {showLeadForm && !leadInfo.email && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Get a Free Consultation
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Let us help you with your legal needs. Please provide your contact information.
                  </p>
                  <form onSubmit={handleLeadSubmit} className="space-y-2">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={leadInfo.name || ''}
                      onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={leadInfo.email || ''}
                      onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number (Optional)"
                      value={leadInfo.phone || ''}
                      onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 bg-accent-gold text-white px-4 py-2 rounded text-sm font-medium hover:bg-accent-bronze transition-colors"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowLeadForm(false)}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                      >
                        Later
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions (shown when no messages) */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.slice(0, 3).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => sendMessage(question)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-navy"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-primary-navy text-white p-2 rounded-lg hover:bg-primary-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                This chatbot provides general information only, not legal advice.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
