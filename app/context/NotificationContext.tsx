"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the notification type
export interface NotificationType {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  content: string;
  durationInSeconds?: number;
  onClose?: () => void;
}

// Define the context shape
interface NotificationContextType {
  notifications: NotificationType[];
  addNotification: (notification: Omit<NotificationType, "id">) => void;
  removeNotification: (id: string) => void;
}

// Create the context with default values
const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
});

// Hook for using the notification context
export const useNotifications = () => useContext(NotificationContext);

// Provider component
export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const addNotification = (notification: Omit<NotificationType, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { ...notification, id }]);
  };

  const removeNotification = (id: string) => {
    // Find notification to trigger its onClose callback if it exists
    const notificationToRemove = notifications.find(n => n.id === id);
    if (notificationToRemove?.onClose) {
      notificationToRemove.onClose();
    }
    
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}; 