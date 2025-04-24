# نظام الإشعارات للمستخدمين الجدد (Notifications System)

هذا المستند يشرح كيفية استخدام نظام الإشعارات للمستخدمين الجدد في منصة قنفه. يمكن استخدام هذا النظام لتوجيه المستخدمين خلال رحلتهم الأولى داخل المنصة.

## المكونات الرئيسية

1. **NotificationItem**: المكون الأساسي الذي يعرض إشعارًا واحدًا مع عداد تنازلي وزر إغلاق.
2. **NotificationContext**: سياق React لإدارة الإشعارات عبر التطبيق.
3. **NotificationsContainer**: حاوية تعرض جميع الإشعارات النشطة.
4. **useGuidanceNotifications**: خطاف مخصص لإدارة إشعارات التوجيه للمستخدمين الجدد.

## كيفية الاستخدام

### 1. إضافة إشعار مباشرة

يمكنك إضافة إشعار مباشرة في أي مكون باستخدام useNotifications hook:

```tsx
import { useNotifications } from "@/app/context/NotificationContext";

function YourComponent() {
  const { addNotification } = useNotifications();

  // إضافة إشعار بطريقة مباشرة
  const handleAddNotification = () => {
    addNotification({
      stepNumber: 1,
      title: "عنوان الإشعار",
      subtitle: "العنوان الفرعي",
      content: "محتوى الإشعار التفصيلي",
      durationInSeconds: 10, // اختياري، الافتراضي 10 ثوانٍ
    });
  };

  return (
    <button onClick={handleAddNotification}>إظهار الإشعار</button>
  );
}
```

### 2. استخدام إشعارات التوجيه للمستخدمين الجدد

لإضافة إشعارات توجيهية للمستخدمين الجدد، استخدم useGuidanceNotifications hook:

```tsx
import { useGuidanceNotifications, guidanceSteps } from "@/app/hooks/useGuidanceNotifications";

function YourPage() {
  // سيتم عرض إشعار اختيار الشقة تلقائيًا للمستخدمين الجدد فقط
  useGuidanceNotifications(guidanceSteps.APARTMENT_SELECTION);

  return (
    <div>محتوى الصفحة</div>
  );
}
```

### 3. إضافة خطوات توجيه جديدة

لإضافة خطوات توجيه جديدة، قم بتحديث ملف `useGuidanceNotifications.ts`:

1. أضف معرّف الخطوة الجديدة في كائن `guidanceSteps`.
2. أضف محتوى الإشعار للخطوة الجديدة في كائن `notificationContent`.

## الخصائص المتاحة

### NotificationItem

| الخاصية | النوع | الوصف |
|---------|------|-------|
| stepNumber | number | رقم الخطوة في التسلسل |
| title | string | عنوان الإشعار |
| subtitle | string | العنوان الفرعي للإشعار |
| content | string | محتوى الإشعار التفصيلي |
| durationInSeconds | number | مدة ظهور الإشعار بالثواني (اختياري، الافتراضي 10) |
| onClose | function | دالة يتم استدعاؤها عند إغلاق الإشعار |

### useGuidanceNotifications

| معلمة | النوع | الوصف |
|-------|------|-------|
| step | string | معرف خطوة التوجيه المطلوب عرضها |
| config | object | إعدادات إضافية |
| config.onlyFirstTime | boolean | عرض الإشعارات للمستخدمين الجدد فقط (اختياري، الافتراضي `true`) |
| config.initialDelay | number | التأخير قبل عرض الإشعار بالميللي ثانية (اختياري، الافتراضي 1000) |

## مثال كامل

```tsx
"use client";

import React from "react";
import { useGuidanceNotifications, guidanceSteps } from "@/app/hooks/useGuidanceNotifications";

export default function BookingPage() {
  // عرض إشعار عملية الحجز بعد 2 ثانية
  useGuidanceNotifications(guidanceSteps.BOOKING_PROCESS, { 
    initialDelay: 2000,
    onlyFirstTime: true 
  });
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-right">صفحة الحجز</h1>
      {/* محتوى الصفحة */}
    </div>
  );
}
```

## تخصيص المظهر

يمكن تخصيص مظهر الإشعارات من خلال تعديل المكون `NotificationItem.tsx`. يستخدم المكون Tailwind CSS للتنسيق، لذا يمكن تغيير الألوان والأحجام وغيرها بسهولة. 