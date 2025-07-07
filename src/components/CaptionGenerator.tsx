
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
    const templates = {
      instagram: {
        content: `✨ ${topic} ✨\n\nآیا شما هم این موضوع رو دوست دارید؟ 🤔\n\nدر کامنت‌ها نظرتون رو بنویسید! 👇\n\n#محتوای_ایرانی`,
        hashtags: ['#ایران', '#محتوا', '#اینستاگرام', '#لایک', '#کامنت', '#پست_جدید']
      },
      youtube: {
        content: `📺 ${topic}\n\nدر این ویدیو درباره این موضوع صحبت کردیم. اگر این محتوا براتون مفید بود، حتماً لایک کنید و کانال رو سابسکرایب کنید! 🔔\n\nلینک‌های مفید در توضیحات 👇`,
        hashtags: ['#یوتیوب', '#ویدیو', '#محتوا', '#سابسکرایب', '#لایک']
      },
      tiktok: {
        content: `🔥 ${topic} 🔥\n\nنظرتون چیه؟ کامنت بذارید! 👇`,
        hashtags: ['#تیک_توک', '#ترند', '#ویدیو_کوتاه', '#محتوا']
      }
    };

    return {
      content: templates[platform].content,
      hashtags: templates[platform].hashtags,
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            ژنراتور کپشن هوشمند ✨
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            کپشن‌های جذاب و حرفه‌ای برای پلتفرم‌های مختلف تولید کنید
          </p>
        </div>

        {/* Input Section */}
        <Card className="p-8 mb-8 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                موضوع کپشن خود را بنویسید:
              </label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="مثال: معرفی کتاب جدید انگیزشی"
                className="min-h-[100px] text-lg border-2 border-gray-200 focus:border-purple-400 transition-colors"
                dir="rtl"
              />
            </div>

            {/* Platform Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                پلتفرم مورد نظر:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {platforms.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <Card
                      key={platform.id}
                      className={`p-4 cursor-pointer transition-all duration-300 border-2 ${
                        selectedPlatform === platform.id
                          ? 'border-purple-400 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPlatform(platform.id)}
                    >
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${platform.color}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-semibold text-gray-700">{platform.name}</span>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            <Button
              onClick={generateCaption}
              disabled={isGenerating}
              className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            >
              {isGenerating ? (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
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
          <Card className="p-8 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2 space-x-reverse">
                  <span>کپشن تولید شده</span>
                  {platforms.find(p => p.id === generatedCaption.platform) && (
                    (() => {
                      const platform = platforms.find(p => p.id === generatedCaption.platform)!;
                      const Icon = platform.icon;
                      return <Icon className="w-6 h-6 text-purple-600" />;
                    })()
                  )}
                </h2>
                <Button
                  onClick={() => copyToClipboard(getFullCaption())}
                  variant="outline"
                  className="flex items-center space-x-2 space-x-reverse"
                >
                  <Copy className="w-4 h-4" />
                  <span>کپی</span>
                </Button>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-r-4 border-purple-400">
                <div className="whitespace-pre-wrap text-gray-800 text-lg leading-relaxed" dir="rtl">
                  {generatedCaption.content}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">هشتگ‌های پیشنهادی:</h3>
                <div className="flex flex-wrap gap-2">
                  {generatedCaption.hashtags.map((hashtag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-purple-200"
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
  );
};

export default CaptionGenerator;
