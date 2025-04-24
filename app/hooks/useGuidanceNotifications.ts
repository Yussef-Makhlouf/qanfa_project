"use client";

import { useEffect } from "react";
import { useNotifications } from "../context/NotificationContext";

// Define the guidance steps
export const guidanceSteps = {
  APARTMENT_SELECTION: "apartment_selection",
  BOOKING_PROCESS: "booking_process",
  PAYMENT_OPTIONS: "payment_options",
  CONTACT_SUPPORT: "contact_support",
  // Add more steps as needed
};

interface GuidanceNotificationsConfig {
  // Only show notifications for first-time visitors if true
  onlyFirstTime?: boolean;
  // Delay in milliseconds before showing the first notification
  initialDelay?: number;
}

export const useGuidanceNotifications = (
  step: string,
  config: GuidanceNotificationsConfig = {}
) => {
  const { onlyFirstTime = true, initialDelay = 1000 } = config;
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Check if this notification has already been shown (if onlyFirstTime is true)
    const storageKey = `guidance_notification_${step}`;
    const hasBeenShown = localStorage.getItem(storageKey) === "true";

    if (onlyFirstTime && hasBeenShown) {
      return;
    }

    // Notifications content based on the step
    const notificationContent = {
      [guidanceSteps.APARTMENT_SELECTION]: {
        stepNumber: 1,
        title: "الخطــوه الاولــى : اختيــار الشقــه",
        subtitle: "رسالـــة توجيــــــــه !",
        content:
          "تم اختيــار هــذه الشقــة بنــاء علـى مسحـك لرمـز الـQR. يمكنـك الضغـط عليهـا للاطـلاع علـى التفاصيـل",
        durationInSeconds: 15,
      },
      [guidanceSteps.BOOKING_PROCESS]: {
        stepNumber: 2,
        title: "الخطــوه الثانيــه : عمليــة الحجــز",
        subtitle: "رسالـــة توجيــــــــه !",
        content:
          "يمكنــك اختيــار التاريــخ المناســب للحجــز والضغــط علــى زر الحجــز لإتمــام العمليــة",
        durationInSeconds: 15,
      },
      [guidanceSteps.PAYMENT_OPTIONS]: {
        stepNumber: 3,
        title: "الخطــوه الثالثــه : خيــارات الدفــع",
        subtitle: "رسالـــة توجيــــــــه !",
        content:
          "يمكنــك اختيــار طريقــة الدفــع المناسبــة واتبــاع الخطــوات لإتمــام عمليــة الدفــع",
        durationInSeconds: 15,
      },
      [guidanceSteps.CONTACT_SUPPORT]: {
        stepNumber: 4,
        title: "الخطــوه الرابعــه : التواصــل مــع الدعــم",
        subtitle: "رسالـــة توجيــــــــه !",
        content:
          "فــي حالــة وجــود أي استفســار أو مشكلــة، يمكنــك التواصــل مــع فريــق الدعــم عبــر الضغــط علــى زر المساعــدة",
        durationInSeconds: 15,
      },
    };

    const notification = notificationContent[step];

    if (notification) {
      // Show the notification after the initial delay
      const timer = setTimeout(() => {
        addNotification(notification);
        
        // Mark this notification as shown in localStorage
        if (onlyFirstTime) {
          localStorage.setItem(storageKey, "true");
        }
      }, initialDelay);

      return () => clearTimeout(timer);
    }
  }, [step, onlyFirstTime, initialDelay, addNotification]);

  // Function to reset guidance notifications (for testing or manual reset)
  const resetGuidanceNotifications = () => {
    Object.values(guidanceSteps).forEach((stepKey) => {
      localStorage.removeItem(`guidance_notification_${stepKey}`);
    });
  };

  return { resetGuidanceNotifications };
}; 