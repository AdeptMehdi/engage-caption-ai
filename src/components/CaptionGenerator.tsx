
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Copy, Instagram, Youtube, Music } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Platform = 'instagram' | 'youtube' | 'tiktok';

interface CaptionResult {
  content: string;
  hashtags: string[];
  platform: Platform;
}

const CaptionGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('instagram');
  const [generatedCaption, setGeneratedCaption] = useState<CaptionResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const platforms = [
    { id: 'instagram' as Platform, name: 'اینستاگرام', icon: Instagram, color: 'from-pink-500 to-purple-500' },
    { id: 'youtube' as Platform, name: 'یوتیوب', icon: Youtube, color: 'from-red-500 to-red-600' },
    { id: 'tiktok' as Platform, name: 'تیک‌توک', icon: Music, color: 'from-black to-gray-800' }
  ];

  const generateCaption = async () => {
    if (!prompt.trim()) {
      toast({
        title: "خطا",
        description: "لطفاً موضوع کپشن را وارد کنید",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate platform-specific content
    const result = generatePlatformContent(prompt, selectedPlatform);
    setGeneratedCaption(result);
    setIsGenerating(false);

    toast({
      title: "کپشن تولید شد! ✨",
      description: "کپشن شما با موفقیت تولید شد"
    });
  };

  const generatePlatformContent = (topic: string, platform: Platform): CaptionResult => {
    // تولید محتوای ساختاریافته فارسی
    
    // پاراگراف اول: شروع قدرتمند
    const powerfulStart = `آیا می‌دانستید که ۹۵٪ افرادی که در زمینهٔ ${topic} فعالیت می‌کنند، تنها به ۵٪ پتانسیل واقعی‌شان دست پیدا می‌کنند؟ 🤔 این آمار شاید شوکه‌کننده باشد، اما حقیقت تلخی است که بسیاری از ما با آن مواجه هستیم. امروز می‌خواهم راز دستیابی به ۱۰۰٪ این پتانسیل را با شما به اشتراک بگذارم.`;
    
    // پاراگراف دوم: داستان یا مثال
    const storyExample = `چند ماه پیش با یکی از دوستانم صحبت می‌کردم که سال‌ها در زمینهٔ ${topic} تلاش کرده بود اما نتیجهٔ دلخواهش را نگرفته بود. 😔 او مثل خیلی از ما فکر می‌کرد که مشکل از خودش است، تا اینکه یک نکتهٔ ساده اما قدرتمند یاد گرفت. همین یک تغییر کوچک، زندگی‌اش را کاملاً متحول کرد و امروز او یکی از موفق‌ترین افراد این حوزه است! ✨`;
    
    // پاراگراف سوم: ارزش‌افزایی
    const valueAddition = `نکتهٔ کلیدی که او کشف کرد این بود: ${topic} تنها یک مهارت نیست، بلکه یک ذهنیت است. 💡 وقتی شما این ذهنیت را تغییر می‌دهید، نه تنها در همین زمینه بلکه در تمام جنبه‌های زندگی‌تان شاهد تحولات شگفت‌انگیزی خواهید بود. حتی اعتماد به نفس، روابط اجتماعی و حتی سلامت جسمی‌تان بهبود پیدا می‌کند!`;
    
    // پاراگراف چهارم: دعوت به تعامل
    const engagement = `حالا نوبت شماست که تجربه‌تان را با ما به اشتراک بگذارید! 💬 در کامنت‌ها بنویسید: شما در زمینهٔ ${topic} چه چالش‌هایی داشته‌اید؟ اگر این پست براتان مفید بود، لطفاً لایک کنید و با دوستان‌تان به اشتراک بگذارید تا آن‌ها هم بتوانند از این اطلاعات بهره‌مند شوند. 🚀`;
    
    // پاراگراف پنجم: خاتمه الهام‌بخش
    const inspiringConclusion = `همان‌طور که مولانا می‌گوید: «تو آن چیزی هستی که به دنبالش می‌گردی.» 🌟 پس امروز همین الان اولین قدم را بردارید و ببینید که چه معجزاتی در انتظارتان است. یادتان باشد، هر متخصصی روزی مبتدی بوده است! 💪`;

    // ترکیب پاراگراف‌ها
    const paragraphs = [powerfulStart, storyExample, valueAddition, engagement, inspiringConclusion];
    const content = paragraphs.join('\n\n');
    
    // هشتگ‌های مخصوص هر پلتفرم
    const platformHashtags = {
      instagram: ['#موفقیت', '#توسعه_فردی', '#انگیزشی', '#زندگی_بهتر', '#الهام', '#تغییر_مثبت', '#محتوای_فارسی'],
      youtube: ['#آموزش', '#ویدیو_آموزشی', '#یادگیری', '#مهارت_زندگی', '#پیشرفت', '#توسعه_مهارت', '#محتوای_کاربردی'],
      tiktok: ['#انگیزه', '#موفقیت', '#زندگی', '#ترند', '#تحول', '#الهام_بخش', '#محتوای_فارسی']
    };

    return {
      content,
      hashtags: platformHashtags[platform],
      platform
    };
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "کپی شد! 📋",
        description: "کپشن در کلیپ‌بورد کپی شد"
      });
    } catch (err) {
      toast({
        title: "خطا",
        description: "امکان کپی وجود ندارد",
        variant: "destructive"
      });
    }
  };

  const getFullCaption = () => {
    if (!generatedCaption) return '';
    return `${generatedCaption.content}\n\n${generatedCaption.hashtags.join(' ')}`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 animate-gradient">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-20 right-40 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '6s'}}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6 font-vazir drop-shadow-2xl">
              ژنراتور کپشن هوشمند ✨
            </h1>
            <p className="text-2xl text-white/90 max-w-2xl mx-auto font-vazir leading-relaxed drop-shadow-lg">
              کپشن‌های جذاب و حرفه‌ای برای پلتفرم‌های مختلف تولید کنید
            </p>
          </div>

          {/* Input Section */}
          <Card className="p-10 mb-10 bg-white/10 backdrop-blur-md border-white/20 shadow-2xl rounded-3xl">
            <div className="space-y-8">
              <div>
                <label className="block text-2xl font-bold text-white mb-4 font-vazir">
                  موضوع کپشن خود را بنویسید:
                </label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="مثال: معرفی کتاب جدید انگیزشی"
                  className="min-h-[120px] text-xl border-2 border-white/30 focus:border-white/60 transition-all duration-300 bg-white/20 text-white placeholder:text-white/70 rounded-2xl font-vazir backdrop-blur-sm"
                  dir="rtl"
                />
              </div>

              {/* Platform Selection */}
              <div>
                <label className="block text-2xl font-bold text-white mb-4 font-vazir">
                  پلتفرم مورد نظر:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {platforms.map((platform) => {
                    const Icon = platform.icon;
                    return (
                      <Card
                        key={platform.id}
                        className={`p-6 cursor-pointer transition-all duration-500 border-2 rounded-2xl backdrop-blur-md ${
                          selectedPlatform === platform.id
                            ? 'border-white/60 shadow-2xl scale-110 bg-white/20'
                            : 'border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/15'
                        }`}
                        onClick={() => setSelectedPlatform(platform.id)}
                      >
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${platform.color} shadow-lg`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <span className="font-bold text-white text-xl font-vazir">{platform.name}</span>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <Button
                onClick={generateCaption}
                disabled={isGenerating}
                className="w-full py-8 text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 rounded-2xl shadow-2xl hover:shadow-purple-500/25 font-vazir"
              >
                {isGenerating ? (
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>در حال تولید...</span>
                  </div>
                ) : (
                  '🚀 تولید کپشن'
                )}
              </Button>
            </div>
          </Card>

          {/* Generated Caption */}
          {generatedCaption && (
            <Card className="p-10 bg-white/10 backdrop-blur-md border-white/20 shadow-2xl rounded-3xl animate-in fade-in duration-500">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-white flex items-center space-x-3 space-x-reverse font-vazir">
                    <span>کپشن تولید شده</span>
                    {platforms.find(p => p.id === generatedCaption.platform) && (
                      (() => {
                        const platform = platforms.find(p => p.id === generatedCaption.platform)!;
                        const Icon = platform.icon;
                        return <Icon className="w-8 h-8 text-purple-300" />;
                      })()
                    )}
                  </h2>
                  <Button
                    onClick={() => copyToClipboard(getFullCaption())}
                    variant="outline"
                    className="flex items-center space-x-3 space-x-reverse border-white/30 text-white hover:bg-white/20 hover:border-white/50 rounded-xl px-6 py-3 font-vazir"
                  >
                    <Copy className="w-5 h-5" />
                    <span>کپی</span>
                  </Button>
                </div>

                <div className="bg-white/20 rounded-2xl p-8 border-r-4 border-purple-400 backdrop-blur-sm">
                  <div className="whitespace-pre-wrap text-white text-xl leading-relaxed font-vazir" dir="rtl">
                    {generatedCaption.content}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 font-vazir">هشتگ‌های پیشنهادی:</h3>
                  <div className="flex flex-wrap gap-3">
                    {generatedCaption.hashtags.map((hashtag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="px-4 py-2 bg-white/20 text-white border-white/30 rounded-xl text-lg font-vazir backdrop-blur-sm hover:bg-white/30 transition-colors"
                      >
                        {hashtag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaptionGenerator;
