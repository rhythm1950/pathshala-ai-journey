import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Shield, ExternalLink, CheckCircle, Clock } from 'lucide-react';

const credentials = [
  { 
    id: 1, 
    titleBn: 'গণিত বিশেষজ্ঞ - লেভেল ১', 
    titleEn: 'Math Expert - Level 1', 
    issuer: 'Pathshala AI',
    date: '2024-01-15',
    hash: '0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    verified: true 
  },
  { 
    id: 2, 
    titleBn: 'প্রোগ্রামিং ফান্ডামেন্টালস', 
    titleEn: 'Programming Fundamentals', 
    issuer: 'Pathshala AI',
    date: '2024-02-20',
    hash: '0x2c624232cdd221771294dfbb310aca000a0df6ac8b66b696d90ef06fdefb64a3',
    verified: true 
  },
  { 
    id: 3, 
    titleBn: 'ডাটা অ্যানালাইসিস', 
    titleEn: 'Data Analysis', 
    issuer: 'Pathshala AI',
    date: null,
    hash: null,
    verified: false 
  },
];

export function MicroCredentials() {
  const { language } = useLanguage();
  const [verifying, setVerifying] = useState<number | null>(null);
  const [showHash, setShowHash] = useState<number | null>(null);

  const handleVerify = (id: number) => {
    setVerifying(id);
    setTimeout(() => {
      setVerifying(null);
      setShowHash(id);
    }, 1500);
  };

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5 text-primary" />
        {language === 'bn' ? 'মাইক্রো-ক্রেডেনশিয়াল ও ব্যাজ' : 'Micro-Credentials & Badges'}
      </h3>

      <div className="space-y-4">
        {credentials.map((cred) => (
          <div 
            key={cred.id}
            className={`p-4 rounded-xl border ${
              cred.verified 
                ? 'border-primary/30 bg-gradient-to-r from-primary/5 to-transparent' 
                : 'border-border/50 bg-muted/20'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                cred.verified 
                  ? 'bg-gradient-to-br from-primary to-secondary text-white' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {cred.verified ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <Clock className="w-6 h-6" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">
                  {language === 'bn' ? cred.titleBn : cred.titleEn}
                </p>
                <p className="text-sm text-muted-foreground">
                  {cred.issuer} {cred.date && `• ${cred.date}`}
                </p>
                
                {cred.verified && (
                  <div className="mt-2">
                    {showHash === cred.id ? (
                      <div className="animate-fade-in">
                        <p className="text-xs text-muted-foreground mb-1">
                          {language === 'bn' ? 'ব্লকচেইন হ্যাশ:' : 'Blockchain Hash:'}
                        </p>
                        <code className="text-xs bg-muted px-2 py-1 rounded break-all block">
                          {cred.hash}
                        </code>
                      </div>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleVerify(cred.id)}
                        disabled={verifying === cred.id}
                        className="h-7 px-2 text-xs"
                      >
                        {verifying === cred.id ? (
                          <>
                            <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin mr-1" />
                            {language === 'bn' ? 'যাচাই হচ্ছে...' : 'Verifying...'}
                          </>
                        ) : (
                          <>
                            <Shield className="w-3 h-3 mr-1" />
                            {language === 'bn' ? 'ব্লকচেইনে যাচাই' : 'Verify on Blockchain'}
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                )}
                
                {!cred.verified && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {language === 'bn' ? '🔒 সম্পূর্ণ করার পর ব্যাজ পাবেন' : '🔒 Complete to earn this badge'}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
