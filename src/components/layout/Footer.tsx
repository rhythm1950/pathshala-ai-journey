import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Instagram,
  Mail,
  Phone,
  MapPin,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  const { language, t } = useLanguage();
  const [email, setEmail] = React.useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    setEmail('');
  };

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

  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      {/* Newsletter Section */}
      <div className="border-b border-border/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">
                {language === 'bn' ? 'আমাদের নিউজলেটারে সাবস্ক্রাইব করুন' : 'Subscribe to our Newsletter'}
              </h3>
              <p className="text-muted-foreground text-sm">
                {language === 'bn' 
                  ? 'নতুন কোর্স, অফার এবং শিক্ষামূলক বিষয়বস্তু সম্পর্কে আপডেট পান'
                  : 'Get updates on new courses, offers, and educational content'
                }
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'bn' ? 'আপনার ইমেইল' : 'Your email'}
                className="w-full md:w-64 bg-secondary-foreground/10 border-border/30 rounded-[3px]"
              />
              <Button type="submit" className="gradient-primary rounded-[3px]">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-[3px] gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">প</span>
              </div>
              <span className="font-bold text-xl text-secondary-foreground">
                পাঠশালা <span className="gradient-text">AI</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              {t('footer.description')}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@pathshala.ai</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+880 1234-567890</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{language === 'bn' ? 'ঢাকা, বাংলাদেশ' : 'Dhaka, Bangladesh'}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-[3px] bg-secondary-foreground/10 flex items-center justify-center hover:gradient-primary transition-all duration-300 group"
                >
                  <social.icon className="h-4 w-4 text-muted-foreground group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="text-muted-foreground hover:text-secondary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.resources')}</h4>
            <ul className="space-y-2 text-sm">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="text-muted-foreground hover:text-secondary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">
              {language === 'bn' ? 'কোম্পানি' : 'Company'}
            </h4>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="text-muted-foreground hover:text-secondary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="text-muted-foreground hover:text-secondary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} পাঠশালা AI. {t('footer.rights')}</p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-secondary-foreground transition-colors">
                {language === 'bn' ? 'গোপনীয়তা' : 'Privacy'}
              </Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-secondary-foreground transition-colors">
                {language === 'bn' ? 'শর্তাবলী' : 'Terms'}
              </Link>
              <span>•</span>
              <Link to="/cookies" className="hover:text-secondary-foreground transition-colors">
                {language === 'bn' ? 'কুকি' : 'Cookies'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
