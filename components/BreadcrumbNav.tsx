import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function BreadcrumbNav() {
  return (
    <nav className="w-full max-w-[1530px] mx-auto px-4 py-4" dir="rtl">
      <div className="flex items-center justify-end gap-2 text-sm">
        <Link 
          href="/"
          className="text-[#FF735D] hover:text-[#ff8d7c] transition-colors"
        >
          الرئيسية
        </Link>
        <ChevronLeft className="w-4 h-4 text-[#595959]" />
        <Link 
          href="/projects/alfalah"
          className="text-[#595959] hover:text-[#444444] transition-colors"
        >
          مشروع الفلاح للإسكان
        </Link>
        <ChevronLeft className="w-4 h-4 text-[#595959]" />
        <span className="text-[#595959]">شقة 6</span>
      </div>
    </nav>
  );
} 