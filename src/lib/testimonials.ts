export type Testimonial = {
  id: string;
  name: { fa: string; en: string };
  role: { fa: string; en: string };
  avatar: string;
  content: { fa: string; en: string };
  rating: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: { fa: "علی رضایی", en: "Ali Rezaei" },
    role: { fa: "توسعه‌دهنده فرانت‌اند", en: "Frontend Developer" },
    avatar: "https://i.pravatar.cc/150?img=1",
    content: {
      fa: "لرنینو زندگی حرفه‌ای من رو عوض کرد. دوره‌های عملی و پروژه‌محورش باعث شد فقط بعد از ۶ ماه استخدام شم.",
      en: "Learnino changed my professional life. Practical and project-based courses helped me get hired in just 6 months.",
    },
    rating: 5,
  },
  {
    id: "2",
    name: { fa: "سارا محمدی", en: "Sara Mohammadi" },
    role: { fa: "دانشجوی UI/UX", en: "UI/UX Student" },
    avatar: "https://i.pravatar.cc/150?img=2",
    content: {
      fa: "کیفیت آموزش و پشتیبانی مدرسان لرنینو واقعاً بی‌نظیره. هر سوالی که داشتم به سرعت جواب گرفتم.",
      en: "The quality of teaching and instructor support is truly unmatched. Every question I had was answered quickly.",
    },
    rating: 5,
  },
  {
    id: "3",
    name: { fa: "محمد حسینی", en: "Mohammad Hosseini" },
    role: { fa: "توسعه‌دهنده بک‌اند", en: "Backend Developer" },
    avatar: "https://i.pravatar.cc/150?img=3",
    content: {
      fa: "دوره‌های Node.js لرنینو دقیقاً همون چیزی بود که برای ورود به بازار کار نیاز داشتم.",
      en: "Learnino's Node.js courses were exactly what I needed to enter the job market.",
    },
    rating: 5,
  },
  {
    id: "4",
    name: { fa: "زهرا کریمی", en: "Zahra Karimi" },
    role: { fa: "متخصص هوش مصنوعی", en: "AI Specialist" },
    avatar: "https://i.pravatar.cc/150?img=4",
    content: {
      fa: "مسیر یادگیری AI لرنینو خیلی هدفمند و منظمه. تو ۸ ماه به سطحی رسیدم که با ۳ سال تجربه قابل مقایسه‌ست.",
      en: "Learnino's AI learning path is very targeted. I reached a level comparable to 3 years of experience in 8 months.",
    },
    rating: 5,
  },
];
