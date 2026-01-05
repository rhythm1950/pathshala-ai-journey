import React from 'react';
import { PromoBar } from './PromoBar';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { FAQChatbot } from '@/components/chat/FAQChatbot';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <PromoBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
      <FAQChatbot />
    </div>
  );
}
