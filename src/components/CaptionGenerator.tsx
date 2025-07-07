
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
    // Generate structured Persian content
    const paragraphs = [
      // پاراگراف اول: جملهٔ جذاب یا سؤال هیجان‌برانگیز
      `آیا تا به حال درباره‌ی ${topic} فکر کرده‌اید؟ 🤔 این موضوع یکی از مهم‌ترین مباحثی است که می‌تواند زندگی‌تان را متحول کند. بسیاری از افراد از اهمیت آن غافل هستند، اما امروز می‌خواهم راز موفقیت در این زمینه را با شما به اشتراک بگذارم.`,
      
      // پاراگراف دوم: مثال، داستان کوتاه یا آمار جالب
      `تحقیقات نشان می‌دهد که ۸۰ درصد افرادی که در ${topic} سرمایه‌گذاری می‌کنند، در عرض یک سال تغییرات مثبت قابل توجهی را تجربه می‌کنند. 📊 یکی از دوستان من سال گذشته تصمیم گرفت این مسیر را دنبال کند و نتایج شگفت‌انگیزی دریافت کرد که حتی خودش هم باورش نمی‌شد.`,
      
      // پاراگراف سوم: مزیت یا نکته کلیدی
      `نکته‌ای که بسیاری نمی‌دانند این است که ${topic} نه تنها به شما کمک می‌کند تا اهداف‌تان را محقق کنید، بلکه اعتماد به نفس و انگیزه‌تان را نیز چندین برابر افزایش می‌دهد. ✨ این موضوع مثل یک زنجیره‌ی مثبت عمل می‌کند که تمام جنبه‌های زندگی‌تان را تحت تأثیر قرار می‌دهد.`,
      
      // پاراگراف چهارم: دعوت به تعامل
      `حالا نوبت شماست! در کامنت‌ها بنویسید که آیا تا به حال تجربه‌ای در این زمینه داشته‌اید؟ 💬 اگر این پست برای‌تان مفید بود، لطفاً لایک کنید و با دوستان‌تان به اشتراک بگذارید تا آن‌ها هم از این اطلاعات بهره‌مند شوند.`,
      
      // پاراگراف پنجم: خلاصه یا نقل‌قول الهام‌بخش
      `همان‌طور که می‌گویند: «موفقیت در گام‌های کوچک نهفته است.» 🌟 پس امروز همین حالا اولین قدم را بردارید و ببینید که چه تحولی در انتظار‌تان است!`
    ];

    const content = paragraphs.join('\n\n');
    
    const platformHashtags = {
      instagram: ['#موفقیت', '#انگیزشی', '#زندگی_بهتر', '#توسعه_فردی', '#الهام', '#تغییر_مثبت'],
      youtube: ['#آموزش', '#ویدیو_آموزشی', '#محتوای_مفید', '#یادگیری', '#پیشرفت', '#توسعه_مهارت'],
      tiktok: ['#انگیزه', '#موفقیت', '#زندگی', '#ترند', '#محتوای_فارسی', '#الهام_بخش']
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
