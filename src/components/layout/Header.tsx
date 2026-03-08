import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Globe, User, Bell, Settings, HelpCircle, LogOut, LogIn } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, role, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const getNavLinks = () => {
    const baseLinks = [
      { path: '/', label: t('nav.home') },
      { path: '/courses', label: language === 'bn' ? 'কোর্স' : 'Courses' },
    ];
    if (!user) {
      return [...baseLinks, { path: '/student', label: t('nav.student') }, { path: '/teacher', label: t('nav.teacher') }, { path: '/parent', label: t('nav.parent') }];
    }
    switch (role) {
      case 'student': return [...baseLinks, { path: '/student', label: t('nav.student') }];
      case 'teacher': return [...baseLinks, { path: '/teacher', label: t('nav.teacher') }];
      case 'parent': return [...baseLinks, { path: '/parent', label: t('nav.parent') }];
      default: return baseLinks;
    }
  };

  const navLinks = getNavLinks();
  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getUserInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return user?.email?.slice(0, 2).toUpperCase() || 'U';
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm' : 'bg-background/60 backdrop-blur-md'}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
              <span className="text-primary-foreground font-bold text-lg">প</span>
            </div>
            <span className="font-bold text-lg tracking-tight">
              <span className="text-foreground">পাঠশালা</span>
              <span className="text-primary ml-0.5">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1.5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-sm">
                <DropdownMenuItem onClick={() => setLanguage('bn')} className={`rounded-lg ${language === 'bn' ? 'bg-muted' : ''}`}>
                  বাংলা
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')} className={`rounded-lg ${language === 'en' ? 'bg-muted' : ''}`}>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9 rounded-lg">
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {user ? (
              <>
                <Link to="/notifications">
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
                  </Button>
                </Link>
                <Link to="/help">
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full ml-1">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata?.avatar_url} />
                        <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">{getUserInitials()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-sm p-1.5">
                    <div className="px-3 py-2.5">
                      <p className="text-sm font-semibold truncate">{user.user_metadata?.full_name || user.email}</p>
                      <p className="text-xs text-muted-foreground capitalize">{role || 'User'}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="rounded-lg">
                      <Link to="/profile" className="cursor-pointer"><User className="mr-2 h-4 w-4" />Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-lg">
                      <Link to="/settings" className="cursor-pointer"><Settings className="mr-2 h-4 w-4" />Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer rounded-lg">
                      <LogOut className="mr-2 h-4 w-4" />Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link to="/auth">
                <Button size="sm" className="gap-1.5 rounded-lg ml-2 h-9 px-5 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                  <LogIn className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Sign In</span>
                </Button>
              </Link>
            )}

            <Button variant="ghost" size="icon" className="md:hidden h-9 w-9 rounded-lg" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/30 animate-fade-in space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-sm text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-sm text-sm font-semibold text-primary hover:bg-muted">
                Sign In / Sign Up
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
