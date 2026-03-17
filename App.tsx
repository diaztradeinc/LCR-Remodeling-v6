import { useState } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hi! I'm here to help with any questions about LCR Remodeling's services. How can I assist you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickQuestions = [
    "What services do you offer?",
    "How can I get a quote?",
    "What areas do you serve?",
    "Tell me about your experience"
  ];

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('do')) {
      return "LCR Remodeling offers comprehensive services including:\n\n• Apartment Maintenance - Professional upkeep and repairs for residential properties\n• Hospitality Maintenance - Expert services for hotels and extended stays\n• Complete Remodeling - Full renovation solutions for any space\n• Drain Cleaning - Professional plumbing services\n\nWould you like more details about any specific service?";
    }

    if (lowerMessage.includes('quote') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "I'd be happy to help you get a quote! You can:\n\n• Call us at (609) 212-6052 or (609) 233-9233\n• Email us at lcrremodeling@gmail.com\n• Fill out our contact form on this website\n\nOur team will get back to you promptly with a free, detailed quote for your project!";
    }

    if (lowerMessage.includes('area') || lowerMessage.includes('location') || lowerMessage.includes('where')) {
      return "We serve the Plainsboro, NJ area and surrounding regions. We're proud to work with major properties including The Crossings at Plainsboro, Extended Stay America, and Homewood Suites. Contact us to confirm we service your area!";
    }

    if (lowerMessage.includes('experience') || lowerMessage.includes('about') || lowerMessage.includes('who')) {
      return "LCR Remodeling was established in 2023 under the leadership of owner Alex. Despite being a newer company, we've quickly built a strong reputation working with major property management companies. We're committed to quality, reliability, and customer satisfaction in every project we undertake.";
    }

    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('call')) {
      return "You can reach us at:\n\n📞 Primary: (609) 212-6052\n📞 Secondary: (609) 233-9233\n📧 Email: lcrremodeling@gmail.com\n\nWe typically respond within 24 hours. Looking forward to hearing from you!";
    }

    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're very welcome! Is there anything else I can help you with today?";
    }

    return "That's a great question! For specific details about that, I'd recommend contacting our team directly:\n\n• Call: (609) 212-6052\n• Email: lcrremodeling@gmail.com\n\nThey'll be able to provide you with the most accurate information. Is there anything else I can help with?";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const response = getAIResponse(userMessage);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
      setIsLoading(false);
    }, 800);
  };

  const handleQuickQuestion = (question: string) => {
    setMessages(prev => [...prev, { text: question, isUser: true }]);
    setIsLoading(true);

    setTimeout(() => {
      const response = getAIResponse(question);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 flex items-center justify-center group hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border-2 border-gray-200 flex flex-col">
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold">LCR Assistant</div>
                <div className="text-xs opacity-90">Online • Ready to help</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl whitespace-pre-line ${
                    message.isUser
                      ? 'bg-teal-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-900 rounded-bl-sm border border-gray-200'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-sm">
                  <Loader2 className="w-5 h-5 text-teal-600 animate-spin" />
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 text-center mb-2">Quick questions:</p>
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left p-3 bg-white border border-gray-200 hover:border-teal-600 rounded-lg text-sm transition-all duration-300 hover:shadow-md"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-teal-600 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
