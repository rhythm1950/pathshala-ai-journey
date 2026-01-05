import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: language === 'bn' ? 'বার্তা পাঠানো হয়েছে!' : 'Message Sent!',
      description: language === 'bn' 
        ? 'আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।'
        : 'We will get back to you soon.'
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { 
      icon: Mail, 
      title: language === 'bn' ? 'ইমেইল' : 'Email',
      value: 'support@pathshala.ai',
      desc: language === 'bn' ? '২৪ ঘণ্টার মধ্যে উত্তর' : 'Response within 24 hours'
    },
    { 
      icon: Phone, 
      title: language === 'bn' ? 'ফোন' : 'Phone',
      value: '+880 1234-567890',
      desc: language === 'bn' ? 'সকাল ৯টা - রাত ৯টা' : '9 AM - 9 PM'
    },
    { 
      icon: MapPin, 
      title: language === 'bn' ? 'অফিস' : 'Office',
      value: language === 'bn' ? 'গুলশান, ঢাকা' : 'Gulshan, Dhaka',
      desc: language === 'bn' ? 'বাংলাদেশ' : 'Bangladesh'
    },
    { 
      icon: Clock, 
      title: language === 'bn' ? 'কার্যদিবস' : 'Working Hours',
      value: language === 'bn' ? 'রবি - বৃহস্পতি' : 'Sun - Thu',
      desc: language === 'bn' ? 'সকাল ৯টা - সন্ধ্যা ৬টা' : '9 AM - 6 PM'
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[3px] gradient-primary mb-4">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">
            {language === 'bn' ? 'যোগাযোগ করুন' : 'Contact Us'}
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {language === 'bn' 
              ? 'আমরা আপনার কথা শুনতে চাই। যেকোনো প্রশ্ন বা মতামত জানাতে নিচের ফর্ম পূরণ করুন।'
              : 'We\'d love to hear from you. Fill out the form below for any questions or feedback.'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            {contactInfo.map((info, i) => (
              <Card key={i} className="rounded-[3px]">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[3px] gradient-primary flex items-center justify-center flex-shrink-0">
                    <info.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{info.title}</h3>
                    <p className="text-sm">{info.value}</p>
                    <p className="text-xs text-muted-foreground">{info.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <Card className="md:col-span-2 rounded-[3px]">
            <CardHeader>
              <CardTitle>
                {language === 'bn' ? 'বার্তা পাঠান' : 'Send a Message'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{language === 'bn' ? 'নাম' : 'Name'}</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="rounded-[3px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{language === 'bn' ? 'ইমেইল' : 'Email'}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="rounded-[3px]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">{language === 'bn' ? 'বিষয়' : 'Subject'}</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="rounded-[3px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{language === 'bn' ? 'বার্তা' : 'Message'}</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    required
                    className="rounded-[3px]"
                  />
                </div>
                <Button type="submit" className="gradient-primary rounded-[3px]">
                  <Send className="mr-2 h-4 w-4" />
                  {language === 'bn' ? 'পাঠান' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
