import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface FAQ {
  question: string;
  answer: string;
  keywords: string[];
}

const faqsEn: FAQ[] = [
  {
    question: "How do I enroll in a course?",
    answer: "To enroll in a course, browse our course catalog, select a course you're interested in, and click the 'Enroll Now' button. If it's a paid course, you'll be guided through the payment process.",
    keywords: ["enroll", "join", "course", "register", "sign up"]
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards (Visa, MasterCard), mobile banking (bKash, Nagad), and bank transfers. All payments are secured with SSL encryption.",
    keywords: ["payment", "pay", "credit", "debit", "bkash", "nagad", "money"]
  },
  {
    question: "Can I get a refund?",
    answer: "Yes! We offer a 7-day money-back guarantee. If you're not satisfied with a course, contact our support team within 7 days of purchase for a full refund.",
    keywords: ["refund", "money back", "return", "cancel"]
  },
  {
    question: "How do I access my certificates?",
    answer: "After completing a course, your certificate will be automatically generated. You can access all your certificates from the Profile page under the 'Certificates' section.",
    keywords: ["certificate", "credential", "badge", "completion"]
  },
  {
    question: "Is there a mobile app?",
    answer: "Our platform is fully responsive and works great on mobile browsers. A dedicated mobile app is coming soon! Stay tuned for updates.",
    keywords: ["mobile", "app", "phone", "android", "ios"]
  },
  {
    question: "How do live classes work?",
    answer: "Live classes are scheduled sessions with instructors. You'll receive a notification before the class starts. Join through the 'Live Classes' section in your dashboard.",
    keywords: ["live", "class", "session", "instructor", "teacher"]
  },
  {
    question: "Can parents track student progress?",
    answer: "Yes! Parents can access the Parent Portal to view their child's progress, attendance, grades, and communicate with teachers directly.",
    keywords: ["parent", "progress", "track", "child", "monitor"]
  },
  {
    question: "How does AI Study Plan work?",
    answer: "Our AI analyzes your learning patterns, strengths, and goals to create a personalized study plan. It adapts as you progress, ensuring optimal learning efficiency.",
    keywords: ["ai", "study", "plan", "personalized", "smart"]
  }
];

const faqsBn: FAQ[] = [
  {
    question: "আমি কীভাবে একটি কোর্সে ভর্তি হব?",
    answer: "একটি কোর্সে ভর্তি হতে, আমাদের কোর্স ক্যাটালগ ব্রাউজ করুন, আপনার পছন্দের কোর্স নির্বাচন করুন এবং 'এখনই ভর্তি হন' বাটনে ক্লিক করুন। পেইড কোর্সের জন্য পেমেন্ট প্রক্রিয়া অনুসরণ করুন।",
    keywords: ["ভর্তি", "কোর্স", "যোগ", "রেজিস্টার"]
  },
  {
    question: "আপনারা কোন পেমেন্ট পদ্ধতি গ্রহণ করেন?",
    answer: "আমরা ক্রেডিট/ডেবিট কার্ড (ভিসা, মাস্টারকার্ড), মোবাইল ব্যাংকিং (বিকাশ, নগদ) এবং ব্যাংক ট্রান্সফার গ্রহণ করি। সব পেমেন্ট SSL এনক্রিপশন দিয়ে সুরক্ষিত।",
    keywords: ["পেমেন্ট", "টাকা", "বিকাশ", "নগদ", "কার্ড"]
  },
  {
    question: "আমি কি রিফান্ড পেতে পারি?",
    answer: "হ্যাঁ! আমরা ৭ দিনের মানি-ব্যাক গ্যারান্টি দিই। কোনো কোর্সে সন্তুষ্ট না হলে, ক্রয়ের ৭ দিনের মধ্যে আমাদের সাপোর্ট টিমে যোগাযোগ করুন।",
    keywords: ["রিফান্ড", "ফেরত", "বাতিল"]
  },
  {
    question: "আমার সার্টিফিকেট কোথায় পাব?",
    answer: "কোর্স সম্পন্ন করার পর আপনার সার্টিফিকেট স্বয়ংক্রিয়ভাবে তৈরি হবে। প্রোফাইল পেজের 'সার্টিফিকেট' সেকশনে সব সার্টিফিকেট দেখতে পাবেন।",
    keywords: ["সার্টিফিকেট", "ব্যাজ", "সনদ"]
  },
  {
    question: "লাইভ ক্লাস কীভাবে কাজ করে?",
    answer: "লাইভ ক্লাস হলো শিক্ষকদের সাথে নির্ধারিত সেশন। ক্লাস শুরুর আগে নোটিফিকেশন পাবেন। ড্যাশবোর্ডের 'লাইভ ক্লাস' থেকে যোগ দিন।",
    keywords: ["লাইভ", "ক্লাস", "শিক্ষক", "সেশন"]
  },
  {
    question: "অভিভাবকরা কি শিক্ষার্থীর অগ্রগতি দেখতে পারেন?",
    answer: "হ্যাঁ! অভিভাবকরা প্যারেন্ট পোর্টালে সন্তানের অগ্রগতি, উপস্থিতি, গ্রেড দেখতে এবং শিক্ষকদের সাথে সরাসরি যোগাযোগ করতে পারেন।",
    keywords: ["অভিভাবক", "অগ্রগতি", "সন্তান", "ট্র্যাক"]
  }
];

export function FAQChatbot() {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const faqs = language === 'bn' ? faqsBn : faqsEn;
  
  const welcomeMessage = language === 'bn' 
    ? "স্বাগতম! আমি আপনার সহায়ক বট। আমাকে যেকোনো প্রশ্ন জিজ্ঞাসা করুন!"
    : "Welcome! I'm your assistant bot. Ask me any question!";

  const quickQuestions = language === 'bn'
    ? ["কোর্সে ভর্তি", "পেমেন্ট পদ্ধতি", "সার্টিফিকেট", "লাইভ ক্লাস"]
    : ["Enroll in course", "Payment methods", "Certificates", "Live classes"];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: '1',
        text: welcomeMessage,
        isBot: true,
        timestamp: new Date()
      }]);
    }
  }, [isOpen, messages.length, welcomeMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const findAnswer = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    for (const faq of faqs) {
      const hasKeyword = faq.keywords.some(keyword => 
        lowerQuery.includes(keyword.toLowerCase())
      );
      if (hasKeyword) {
        return faq.answer;
      }
    }
    
    return language === 'bn'
      ? "দুঃখিত, এই প্রশ্নের উত্তর আমার কাছে নেই। সাহায্য পেতে help@pathshala.ai তে ইমেইল করুন অথবা +880 1234-567890 এ কল করুন।"
      : "I'm sorry, I don't have an answer for that. For more help, email us at help@pathshala.ai or call +880 1234-567890.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const answer = findAnswer(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: answer,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => handleSend(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 left-6 z-50 h-14 w-14 rounded-[3px] shadow-lg transition-all duration-300 ${
          isOpen ? 'bg-destructive hover:bg-destructive/90' : 'gradient-primary hover:opacity-90'
        }`}
        size="icon"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-[350px] max-w-[calc(100vw-48px)] rounded-[3px] bg-card border border-border shadow-xl animate-fade-in">
          {/* Header */}
          <div className="gradient-primary p-4 rounded-t-[3px] flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white">
                {language === 'bn' ? 'পাঠশালা সহায়ক' : 'Pathshala Assistant'}
              </h3>
              <p className="text-xs text-white/80">
                {language === 'bn' ? 'আমি সবসময় আছি' : 'Always here to help'}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8 rounded-[3px]"
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="h-[300px] p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {message.isBot && (
                    <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-[3px] px-3 py-2 text-sm ${
                      message.isBot
                        ? 'bg-muted text-foreground'
                        : 'gradient-primary text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                  {!message.isBot && (
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-2 items-center">
                  <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-muted rounded-[3px] px-3 py-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-muted-foreground mb-2">
                {language === 'bn' ? 'দ্রুত প্রশ্ন:' : 'Quick questions:'}
              </p>
              <div className="flex flex-wrap gap-1">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickQuestion(q)}
                    className="text-xs px-2 py-1 rounded-[3px] bg-muted hover:bg-muted/80 text-foreground transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={language === 'bn' ? 'আপনার প্রশ্ন লিখুন...' : 'Type your question...'}
                className="flex-1 rounded-[3px]"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim()}
                className="gradient-primary rounded-[3px]"
                size="icon"
              >
                <Send className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
