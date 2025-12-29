import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-secondary text-secondary-foreground py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">প</span>
              </div>
              <span className="font-bold text-xl text-secondary-foreground">
                পাঠশালা <span className="gradient-text">AI</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{t('footer.description')}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/student" className="text-muted-foreground hover:text-secondary-foreground transition-colors">{t('nav.student')}</Link></li>
              <li><Link to="/teacher" className="text-muted-foreground hover:text-secondary-foreground transition-colors">{t('nav.teacher')}</Link></li>
              <li><Link to="/parent" className="text-muted-foreground hover:text-secondary-foreground transition-colors">{t('nav.parent')}</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.resources')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="text-muted-foreground hover:text-secondary-foreground transition-colors">{t('footer.blog')}</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-secondary-foreground transition-colors">{t('footer.help')}</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-secondary-foreground transition-colors">{t('footer.contact')}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="text-muted-foreground hover:text-secondary-foreground transition-colors">{t('footer.privacy')}</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-secondary-foreground transition-colors">{t('footer.terms')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/20 mt-8 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} পাঠশালা AI. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
