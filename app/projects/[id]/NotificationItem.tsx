"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";

interface NotificationItemProps {
    stepNumber: number;
    title: string;
    subtitle: string;
    content: string;
    durationInSeconds?: number;
    onClose?: () => void;
}

export default function NotificationItem({
    stepNumber,
    title,
    subtitle,
    content,
    durationInSeconds = 10,
    onClose,
}: NotificationItemProps) {
    const [timeLeft, setTimeLeft] = useState(durationInSeconds);
    const [visible, setVisible] = useState(true);
    const hasClosedRef = useRef(false);

    useEffect(() => {
        if (timeLeft <= 0 && !hasClosedRef.current) {
            hasClosedRef.current = true;
            setVisible(false);
            if (onClose) onClose();
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, onClose]);

    const handleClose = () => {
        if (hasClosedRef.current) return;
        hasClosedRef.current = true;
        setVisible(false);
        if (onClose) onClose();
    };

    if (!visible) return null;

    return (
        <Card className="w-[502px] rounded-[30px_30px_30px_10px] bg-[#f6f6f6] border-[0.5px] border-solid shadow-md p-6 relative">
            {/* Close button */}
            <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-3 left-3 h-8 w-8 rounded-full hover:bg-gray-200"
                onClick={handleClose}
            >
                <X className="h-4 w-4" />
            </Button>
            
            {/* Timer indicator */}
            <div className="absolute top-3 left-12  text-xs text-gray-500">
                {timeLeft}s
            </div>
            
            <CardContent className="flex flex-col gap-[38px] p-0">
                {/* Header with step indicator */}
                <div className="flex items-center justify-between w-full">
                    <Badge className="w-[27px] h-[27px] rounded-[13.5px] bg-[#FF735D] p-0 flex items-center justify-center">
                        <span className=" font-medium text-black text-xs">
                            {stepNumber}
                        </span>
                    </Badge>

                    <h2 className=" font-semibold text-black text-base leading-[25.6px] text-right">
                        {title}
                    </h2>
                </div>

                {/* Notification content */}
                <div className="flex flex-col items-end gap-4">
                    <h3 className=" font-bold text-[#375A64] text-sm leading-normal text-right">
                        {subtitle}
                    </h3>

                    <div className="flex justify-end w-full">
                        <p className="w-[382px]  font-normal text-[#595959] text-xs leading-[19.2px] text-right">
                            {content}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 