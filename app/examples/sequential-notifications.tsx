"use client";

import React, { useState } from "react";
import { useNotifications } from "../context/NotificationContext";

export default function SequentialNotificationsExample() {
  const { addNotification } = useNotifications();
  const [currentStep, setCurrentStep] = useState(0);

  // Example notification content for a multi-step process
  const notificationSteps = [
    {
      stepNumber: 1,
      title: "الخطــوه الاولــى : اختيــار المشــروع",
      subtitle: "رسالـــة توجيــــــــه !",
      content: "قم باختيــار المشــروع الــذي ترغــب بــه مــن قائمــة المشاريــع المتاحــة",
      durationInSeconds: 10,
    },
    {
      stepNumber: 2,
      title: "الخطــوه الثانيــه : اختيــار الشقــه",
      subtitle: "رسالـــة توجيــــــــه !",
      content: "قم باختيــار الشقــة المناسبــة لــك مــن قائمــة الشقــق المتاحــة",
      durationInSeconds: 10,
    },
    {
      stepNumber: 3,
      title: "الخطــوه الثالثــه : معلومــات الحجــز",
      subtitle: "رسالـــة توجيــــــــه !",
      content: "قم بإدخــال المعلومــات المطلوبــة لإتمــام عمليــة الحجــز",
      durationInSeconds: 10,
    },
    {
      stepNumber: 4,
      title: "الخطــوه الرابعــه : تأكيــد الحجــز",
      subtitle: "رسالـــة توجيــــــــه !",
      content: "راجــع معلومــات الحجــز وقــم بالتأكيــد للمتابعــة",
      durationInSeconds: 10,
    },
  ];

  // Function to start the sequential notifications
  const startSequentialNotifications = () => {
    // Reset to the first step
    setCurrentStep(0);
    
    // Show the first notification
    showNextNotification(0);
  };

  // Show the next notification in sequence
  const showNextNotification = (index: number) => {
    if (index >= notificationSteps.length) {
      // End of sequence
      setCurrentStep(0);
      return;
    }

    // Update the current step
    setCurrentStep(index + 1);

    // Add a callback for when the notification is closed (either by timer or manual close)
    const nextIndex = index + 1;
    
    // Show the current notification
    const currentNotification = notificationSteps[index];
    addNotification({
      ...currentNotification,
      onClose: () => {
        // When this notification closes, show the next one after a small delay
        if (nextIndex < notificationSteps.length) {
          setTimeout(() => {
            showNextNotification(nextIndex);
          }, 500); // Small delay between notifications
        }
      }
    });
  };

  return (
    <div className="container mx-auto py-10 text-right" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">مثال الإشعارات المتسلسلة</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">كيفية استخدام الإشعارات المتسلسلة</h2>
        <p className="text-gray-700 mb-4">
          هذا المثال يوضح كيفية عرض سلسلة من الإشعارات بشكل متتابع، حيث يظهر كل إشعار بعد إغلاق الإشعار السابق.
        </p>
        
        <div className="mt-6">
          <button
            onClick={startSequentialNotifications}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            بدء الإشعارات المتسلسلة
          </button>
        </div>
      </div>
      
      <div className="bg-gray-100 rounded-lg p-6">
        <h3 className="font-semibold mb-2">الخطوة الحالية: {currentStep > 0 ? currentStep : 'لم يتم البدء'}</h3>
        <p className="text-sm text-gray-600">
          انقر على الزر أعلاه لبدء تسلسل الإشعارات. ستظهر كل رسالة تلقائيًا بعد إغلاق الرسالة السابقة.
        </p>
      </div>
    </div>
  );
} 