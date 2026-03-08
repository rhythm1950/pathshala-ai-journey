import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Twitter, Linkedin, Youtube, Instagram, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const { language, t } = useLanguage();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const quickLinks = [
    { to: '/student', label: language === 'bn' ? 'শিক্ষার্থী ড্যাশবোর্ড' : 'Student Dashboard' },
    { to: '/teacher', label: language === 'bn' ? 'শিক্ষক ড্যাশবোর্ড' : 'Teacher Dashboard' },
    { to: '/parent', label: language === 'bn' ? 'অভিভাবক পোর্টাল' : 'Parent Portal' },
    { to: '/courses', label: language === 'bn' ? 'কোর্স সমূহ' : 'Courses' },
  ];

  const resourceLinks = [
    { to: '/blog', label: language === 'bn' ? 'ব্লগ' : 'Blog' },
    { to: '/help', label: language === 'bn' ? 'সাহায্য কেন্দ্র' : 'Help Center' },
    { to: '/tutorials', label: language === 'bn' ? 'টিউটোরিয়াল' : 'Tutorials' },
    { to: '/community', label: language === 'bn' ? 'কমিউনিটি' : 'Community' },
  ];

  const legalLinks = [
    { to: '/privacy', label: language === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy' },
    { to: '/terms', label: language === 'bn' ? 'শর্তাবলী' : 'Terms of Service' },
    { to: '/refund', label: language === 'bn' ? 'রিফান্ড নীতি' : 'Refund Policy' },
    { to: '/cookies', label: language === 'bn' ? 'কুকি নীতি' : 'Cookie Policy' },
  ];

  const companyLinks = [
    { to: '/about', label: language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us' },
    { to: '/careers', label: language === 'bn' ? 'ক্যারিয়ার' : 'Careers' },
    { to: '/contact', label: language === 'bn' ? 'যোগাযোগ' : 'Contact' },
    { to: '/partners', label: language === 'bn' ? 'পার্টনার' : 'Partners' },
  ];

  const FooterLinkSection = ({ title, links }: { title: string; links: { to: string; label: string }[] }) => (
    <div>
      <h4 className="text-sm font-bold mb-4 uppercase tracking-wider text-secondary-foreground/70">{title}</h4>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.to} className="text-sm text-muted-foreground hover:text-secondary-foreground transition-colors flex items-center gap-1 group">
              {link.label}
              <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="container mx-auto px-4 max-w-6xl py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">প</span>
              </div>
              <span className="font-bold text-lg text-secondary-foreground tracking-tight">
                পাঠশালা <span className="text-primary">AI</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              {t('footer.description')}
            </p>

            <div className="space-y-2.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-primary/60" /><span>support@pathshala.ai</span></div>
              <div className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-primary/60" /><span>+880 1234-567890</span></div>
              <div className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-primary/60" /><span>{language === 'bn' ? 'ঢাকা, বাংলাদেশ' : 'Dhaka, Bangladesh'}</span></div>
            </div>

            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.href} aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-secondary-foreground/8 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300 group"
                >
                  <social.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                </a>
              ))}
            </div>
          </div>

          <FooterLinkSection title={t('footer.quickLinks')} links={quickLinks} />
          <FooterLinkSection title={t('footer.resources')} links={resourceLinks} />
          <FooterLinkSection title={language === 'bn' ? 'কোম্পানি' : 'Company'} links={companyLinks} />
          <FooterLinkSection title={t('footer.support')} links={legalLinks} />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/15">
        <div className="container mx-auto px-4 max-w-7xl py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} পাঠশালা AI. {t('footer.rights')}</p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-secondary-foreground transition-colors">{language === 'bn' ? 'গোপনীয়তা' : 'Privacy'}</Link>
              <span className="text-border">•</span>
              <Link to="/terms" className="hover:text-secondary-foreground transition-colors">{language === 'bn' ? 'শর্তাবলী' : 'Terms'}</Link>
              <span className="text-border">•</span>
              <Link to="/cookies" className="hover:text-secondary-foreground transition-colors">{language === 'bn' ? 'কুকি' : 'Cookies'}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
