"use client";

import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StarIcon = ({ filled, onClick }: { filled: boolean; onClick?: () => void }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    className="cursor-pointer"
  >
    <path
      d="M9 1.5L11.3175 6.195L16.5 6.9525L12.75 10.605L13.635 15.765L9 13.3275L4.365 15.765L5.25 10.605L1.5 6.9525L6.6825 6.195L9 1.5Z"
      fill={filled ? "#FFC253" : "none"}
      stroke={filled ? "#FFC253" : "black"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const currentDate = new Date().toLocaleDateString('en-US');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle review submission here
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative flex w-full max-w-[562px] flex-col items-center justify-center gap-[30px] rounded-[20px] bg-white p-5 sm:p-[50px_75px]">
          {/* Header Section */}
          <div className="flex w-full max-w-[412px] flex-col items-center justify-center gap-[22px]">
            <div className="flex w-full max-w-[138px] flex-col items-center justify-center gap-[15px]">
              <h2 className="text-right  text-xl sm:text-2xl font-bold leading-[36px] text-[#375A64]">
                تم إرسال الطلب
              </h2>
            </div>
            <p className="text-right  text-sm font-normal leading-[21px] text-[#363636]">
              قيم بتقييم التجربه في الموقع
            </p>
          </div>

          {/* Rate Card */}
          <div className="flex w-full max-w-[412px] flex-col items-center justify-center gap-5 rounded-[20px] bg-[rgba(238,238,238,0.4)] p-5">
            {/* Name */}
            <div className="flex w-full max-w-[372px] flex-row items-center justify-center p-[10px]">
              <h3 className="text-center  text-base sm:text-lg font-medium leading-[18px] text-black">
                أحمد عبدالله
              </h3>
            </div>

            {/* Star Rating */}
            <div className="flex items-center justify-center gap-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  filled={rating >= star}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            {/* Input Fields */}
            <div className="flex w-full max-w-[372px] flex-col items-start gap-[10px]">
              <div className="flex h-[54px] w-full items-center justify-end gap-[10px] rounded-xl bg-white px-5 py-[10px]">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border-0 text-right  text-sm font-normal text-[#595959] outline-none"
                  placeholder="العنوان"
                />
              </div>

              <div className="flex h-[150px] w-full items-start justify-end gap-[10px] rounded-xl bg-white px-5 py-5">
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="h-full w-full resize-none border-0 text-right  text-sm font-normal text-[#595959] outline-none"
                  placeholder="المراجعـــه"
                />
              </div>
            </div>

            {/* Date */}
            <div className="flex flex-row items-center justify-center p-[10px]">
              <span className="text-center  text-xs font-medium leading-[12px] text-[#595959]">
                {currentDate}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full max-w-[412px] flex-col sm:flex-row items-start gap-[10px]">
            <Button
              onClick={onClose}
              className="flex h-[55px] flex-1 flex-row items-center justify-between gap-[10px] rounded-[40px] bg-black px-[25px] py-[10px] shadow-[10px_10px_50px_rgba(45,79,70,0.1)] hover:bg-black/90 transition-colors"
            >
              <span className="mx-auto flex h-[18px] flex-row items-center justify-center gap-[15px]  text-xs font-bold leading-[18px] text-white">
                إلغاء
              </span>
            </Button>

            <Button
              onClick={handleSubmit}
              className="flex h-[55px] flex-1 flex-row items-center justify-between gap-[10px] rounded-[40px] bg-[#FF735D] px-[25px] py-[10px] shadow-[10px_10px_50px_rgba(45,79,70,0.1)] hover:bg-[#FF735D]/90 transition-colors"
            >
              <span className="mx-auto flex h-[18px] flex-row items-center justify-center gap-[15px]  text-xs font-bold leading-[18px] text-white">
                إرسال
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}