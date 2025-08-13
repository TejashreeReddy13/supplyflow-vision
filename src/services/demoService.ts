import { useState, useEffect, useCallback } from 'react';

interface DemoUpdate {
  metric: string;
  oldValue: number;
  newValue: number;
  trend: 'up' | 'down' | 'stable';
}

interface DemoNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info';
  timestamp: Date;
}

class DemoService {
  private updateInterval: NodeJS.Timeout | null = null;
  private isActive = false;
  private callbacks: ((update: DemoUpdate) => void)[] = [];
  private notificationCallbacks: ((notification: DemoNotification) => void)[] = [];

  // Sample realistic updates that could occur in a live environment
  private demoUpdates = [
    {
      metric: 'onTimeDelivery',
      variations: [-2.1, 1.8, -0.5, 3.2, -1.0, 2.5],
      baseValue: 86.2
    },
    {
      metric: 'inventoryTurnover', 
      variations: [-0.3, 0.2, -0.1, 0.4, -0.2, 0.3],
      baseValue: 5.4
    },
    {
      metric: 'defectRate',
      variations: [0.1, -0.2, 0.3, -0.1, 0.2, -0.3],
      baseValue: 2.8
    },
    {
      metric: 'costSavings',
      variations: [5000, -2000, 8000, 3000, -1000, 6000],
      baseValue: 210000
    }
  ];

  private notifications = [
    {
      title: 'Supplier Performance Alert',
      message: 'Global Manufacturing Corp delivery rate dropped to 78%',
      type: 'warning' as const
    },
    {
      title: 'Cost Optimization Opportunity',
      message: 'New supplier identified with 15% cost savings potential',
      type: 'success' as const
    },
    {
      title: 'Inventory Update',
      message: 'Q4 demand forecast updated - 12% increase expected',
      type: 'info' as const
    },
    {
      title: 'Risk Mitigation',
      message: 'Backup supplier activated for Electronics category',
      type: 'info' as const
    },
    {
      title: 'Performance Improvement',
      message: 'Asia Pacific Logistics improved on-time delivery to 94%',
      type: 'success' as const
    }
  ];

  startDemo(updateCallback?: (update: DemoUpdate) => void, notificationCallback?: (notification: DemoNotification) => void) {
    if (this.isActive) return;
    
    this.isActive = true;
    if (updateCallback) this.callbacks.push(updateCallback);
    if (notificationCallback) this.notificationCallbacks.push(notificationCallback);

    // Initial notification
    setTimeout(() => {
      this.triggerNotification('Demo Mode Activated', 'Real-time dashboard simulation started', 'success');
    }, 1000);

    // Start periodic updates
    this.updateInterval = setInterval(() => {
      this.generateRandomUpdate();
    }, 10000); // Update every 10 seconds
  }

  stopDemo() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    this.isActive = false;
    this.callbacks = [];
    this.notificationCallbacks = [];
  }

  private generateRandomUpdate() {
    const updateConfig = this.demoUpdates[Math.floor(Math.random() * this.demoUpdates.length)];
    const variation = updateConfig.variations[Math.floor(Math.random() * updateConfig.variations.length)];
    const newValue = updateConfig.baseValue + variation;
    const oldValue = updateConfig.baseValue;

    const update: DemoUpdate = {
      metric: updateConfig.metric,
      oldValue,
      newValue,
      trend: newValue > oldValue ? 'up' : newValue < oldValue ? 'down' : 'stable'
    };

    // Notify all subscribers
    this.callbacks.forEach(callback => callback(update));

    // Randomly trigger notifications (30% chance)
    if (Math.random() < 0.3) {
      const notification = this.notifications[Math.floor(Math.random() * this.notifications.length)];
      this.triggerNotification(notification.title, notification.message, notification.type);
    }
  }

  private triggerNotification(title: string, message: string, type: 'success' | 'warning' | 'info') {
    const notification: DemoNotification = {
      id: Date.now().toString(),
      title,
      message,
      type,
      timestamp: new Date()
    };

    this.notificationCallbacks.forEach(callback => callback(notification));
  }

  // Get sample datasets for demo mode
  getSampleData() {
    return {
      filters: {
        region: 'all-regions',
        supplier: 'all-suppliers', 
        productCategory: 'all-products',
        timePeriod: 'last-12-months'
      },
      // Additional demo-specific data...
    };
  }

  // Anonymize sensitive data
  anonymizeData(data: any) {
    if (Array.isArray(data)) {
      return data.map(item => this.anonymizeSingleItem(item));
    }
    return this.anonymizeSingleItem(data);
  }

  private anonymizeSingleItem(item: any) {
    const anonymized = { ...item };
    
    // Replace supplier names with generic ones
    if (anonymized.name && typeof anonymized.name === 'string') {
      const genericNames = [
        'Global Manufacturing Corp',
        'Asia Pacific Logistics',
        'European Suppliers Ltd',
        'North American Industries',
        'Advanced Materials Inc',
        'Precision Components Co',
        'International Trade Partners',
        'Supply Chain Solutions LLC'
      ];
      anonymized.name = genericNames[Math.floor(Math.random() * genericNames.length)];
    }

    // Replace any email or contact info
    if (anonymized.email) {
      anonymized.email = 'demo@company.com';
    }

    // Replace specific addresses with generic ones
    if (anonymized.address) {
      anonymized.address = '123 Business District, Demo City';
    }

    return anonymized;
  }

  getIsActive() {
    return this.isActive;
  }
}

export const demoService = new DemoService();

// React hook for demo mode
export const useDemoMode = () => {
  const [isActive, setIsActive] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<DemoUpdate | null>(null);
  const [notifications, setNotifications] = useState<DemoNotification[]>([]);

  const startDemo = useCallback(() => {
    setIsActive(true);
    demoService.startDemo(
      (update) => setLastUpdate(update),
      (notification) => {
        setNotifications(prev => [notification, ...prev.slice(0, 4)]); // Keep last 5
      }
    );
  }, []);

  const stopDemo = useCallback(() => {
    setIsActive(false);
    demoService.stopDemo();
    setLastUpdate(null);
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    isActive,
    lastUpdate,
    notifications,
    startDemo,
    stopDemo,
    clearNotifications
  };
};