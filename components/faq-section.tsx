import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { JSX } from "react";

export default function FaqSection(): JSX.Element {
  // FAQ data for mapping
  const faqItems = [
    {
      question: "هل يوجـــد عقـــــار للتأجيـــــر ؟",
      answer:
        "نعم، لدينا مجموعة متنوعة من العقارات المتاحة للتأجير. يرجى التواصل معنا لمعرفة التفاصيل.",
    },
    {
      question: "ما هي أسعار الإيجار في المنطقة؟",
      answer:
        "تختلف أسعار الإيجار حسب الموقع والمساحة وعدد الغرف. يمكنك الاطلاع على قائمة الأسعار من خلال التواصل مع فريق المبيعات.",
    },
    {
      question: "كم عدد الغرف المتاحة في العقار؟",
      answer:
        "تتنوع العقارات لدينا من استوديوهات إلى شقق بغرفة نوم واحدة أو غرفتين أو ثلاث غرف، حسب احتياجاتك.",
    },
    {
      question: "هل يشمل الإيجار المرافق العامة؟",
      answer:
        "يعتمد ذلك على نوع العقار والعقد. في بعض الحالات تكون المرافق مشمولة وفي حالات أخرى تكون منفصلة.",
    },
    {
      question: "ما هي مدة العقد المطلوبة للإيجار؟",
      answer:
        "عادة ما تكون مدة العقد سنة واحدة، ولكن يمكننا توفير خيارات مرنة حسب احتياجاتك.",
    },
  ];

  return (
    <section className="w-full py-24 bg-[#f8f8f8] rtl">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-center text-[42px] text-[#262261] font-black mb-16 [font-family:'The_Year_of_Handicrafts-Black',Helvetica]">
          الاسئلـــة الشـــائعـــــة !
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-5">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-[40px] border-none shadow-sm"
            >
              <AccordionTrigger className="px-6 py-8   font-medium text-[22px] hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6   text-lg">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
