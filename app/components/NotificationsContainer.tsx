"use client";

import React from "react";
import { useNotifications } from "../context/NotificationContext";
import NotificationItem from "../projects/[id]/NotificationItem";

export default function NotificationsContainer() {
  const { notifications, removeNotification } = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-4">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          stepNumber={notification.stepNumber}
          title={notification.title}
          subtitle={notification.subtitle}
          content={notification.content}
          durationInSeconds={notification.durationInSeconds}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
} 