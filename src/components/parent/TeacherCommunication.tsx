import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Send, Plus, Clock, CheckCheck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const teachers = [
  { id: 1, name: 'আমিনা খাতুন', subject: 'গণিত', avatar: '/placeholder.svg', lastSeen: '২ মিনিট আগে' },
  { id: 2, name: 'করিম উদ্দিন', subject: 'বাংলা', avatar: '/placeholder.svg', lastSeen: '১ ঘন্টা আগে' },
  { id: 3, name: 'ফারহানা আক্তার', subject: 'ইংরেজি', avatar: '/placeholder.svg', lastSeen: 'অনলাইন' },
  { id: 4, name: 'মোঃ রফিকুল ইসলাম', subject: 'বিজ্ঞান', avatar: '/placeholder.svg', lastSeen: '৩ ঘন্টা আগে' },
];

const initialConversations = [
  {
    id: 1,
    teacherId: 1,
    messages: [
      { id: 1, sender: 'teacher', text: 'আসসালামু আলাইকুম। রাহুলের গণিতে অগ্রগতি নিয়ে কথা বলতে চাই।', time: '১০:৩০ AM', read: true },
      { id: 2, sender: 'parent', text: 'ওয়ালাইকুম আসসালাম। জি, বলুন।', time: '১০:৩২ AM', read: true },
      { id: 3, sender: 'teacher', text: 'রাহুল বীজগণিতে খুব ভালো করছে। তবে জ্যামিতিতে একটু বেশি মনোযোগ দিতে হবে।', time: '১০:35 AM', read: true },
      { id: 4, sender: 'parent', text: 'ধন্যবাদ জানানোর জন্য। বাড়িতে অতিরিক্ত অনুশীলন করাব।', time: '১০:৪০ AM', read: true },
    ],
    unread: 0,
  },
  {
    id: 2,
    teacherId: 3,
    messages: [
      { id: 1, sender: 'teacher', text: 'রাহুলের ইংরেজি Speaking skills উন্নতি হচ্ছে। Keep encouraging him at home!', time: 'গতকাল', read: true },
      { id: 2, sender: 'teacher', text: 'আগামীকাল একটি special presentation আছে। Please ensure he practices.', time: 'আজ ৯:০০ AM', read: false },
    ],
    unread: 1,
  },
];

export function TeacherCommunication() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [newConversationOpen, setNewConversationOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [initialMessage, setInitialMessage] = useState('');

  const getTeacher = (teacherId: number) => teachers.find(t => t.id === teacherId);

  const currentConversation = conversations.find(c => c.id === selectedConversation);
  const currentTeacher = currentConversation ? getTeacher(currentConversation.teacherId) : null;

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedConversation) {
        return {
          ...conv,
          messages: [...conv.messages, {
            id: conv.messages.length + 1,
            sender: 'parent',
            text: newMessage,
            time: 'এইমাত্র',
            read: true,
          }],
        };
      }
      return conv;
    }));
    setNewMessage('');
    toast({
      title: "মেসেজ পাঠানো হয়েছে",
      description: "আপনার মেসেজ সফলভাবে পাঠানো হয়েছে।",
    });
  };

  const handleStartNewConversation = () => {
    if (!selectedTeacher || !initialMessage.trim()) return;

    const teacherId = parseInt(selectedTeacher);
    const newConv = {
      id: conversations.length + 1,
      teacherId,
      messages: [{
        id: 1,
        sender: 'parent' as const,
        text: initialMessage,
        time: 'এইমাত্র',
        read: true,
      }],
      unread: 0,
    };

    setConversations(prev => [...prev, newConv]);
    setSelectedConversation(newConv.id);
    setNewConversationOpen(false);
    setSelectedTeacher('');
    setInitialMessage('');
    toast({
      title: "নতুন কথোপকথন শুরু হয়েছে",
      description: "শিক্ষকের সাথে আপনার কথোপকথন শুরু হয়েছে।",
    });
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            শিক্ষকদের সাথে যোগাযোগ
          </CardTitle>
          <Dialog open={newConversationOpen} onOpenChange={setNewConversationOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                নতুন মেসেজ
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>নতুন কথোপকথন শুরু করুন</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>শিক্ষক নির্বাচন করুন</Label>
                  <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                    <SelectTrigger>
                      <SelectValue placeholder="শিক্ষক নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id.toString()}>
                          {teacher.name} ({teacher.subject})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>মেসেজ</Label>
                  <Textarea
                    value={initialMessage}
                    onChange={(e) => setInitialMessage(e.target.value)}
                    placeholder="আপনার মেসেজ লিখুন..."
                    rows={4}
                  />
                </div>
                <Button onClick={handleStartNewConversation} className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  মেসেজ পাঠান
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex gap-4 overflow-hidden p-4 pt-0">
        {/* Conversation List */}
        <div className="w-1/3 border-r pr-4">
          <ScrollArea className="h-full">
            <div className="space-y-2">
              {conversations.map((conv) => {
                const teacher = getTeacher(conv.teacherId);
                const lastMessage = conv.messages[conv.messages.length - 1];
                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`w-full p-3 rounded-xl text-left transition-colors ${
                      selectedConversation === conv.id
                        ? 'bg-primary/10 border border-primary/20'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={teacher?.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {teacher?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm truncate">{teacher?.name}</span>
                          {conv.unread > 0 && (
                            <Badge className="bg-primary text-primary-foreground text-xs">
                              {conv.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {lastMessage.text}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation && currentTeacher ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 pb-4 border-b">
                <Avatar>
                  <AvatarImage src={currentTeacher.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {currentTeacher.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{currentTeacher.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {currentTeacher.lastSeen}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 py-4">
                <div className="space-y-4">
                  {currentConversation?.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'parent' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-2xl ${
                          msg.sender === 'parent'
                            ? 'bg-primary text-primary-foreground rounded-br-md'
                            : 'bg-muted rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <div className={`flex items-center gap-1 mt-1 text-xs ${
                          msg.sender === 'parent' ? 'text-primary-foreground/70 justify-end' : 'text-muted-foreground'
                        }`}>
                          <span>{msg.time}</span>
                          {msg.sender === 'parent' && msg.read && (
                            <CheckCheck className="w-3 h-3" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="flex gap-2 pt-4 border-t">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="মেসেজ লিখুন..."
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>একটি কথোপকথন নির্বাচন করুন</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
