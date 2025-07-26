import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface SyncStatus {
  marketbase: 'idle' | 'syncing' | 'success' | 'error';
  grok: 'idle' | 'syncing' | 'success' | 'error';
  tgstat: 'idle' | 'syncing' | 'success' | 'error';
}

interface SyncResult {
  service: string;
  status: 'success' | 'error';
  message: string;
  data?: any;
  timestamp: Date;
}

export const MarketbaseSync: React.FC = () => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    marketbase: 'idle',
    grok: 'idle',
    tgstat: 'idle',
  });

  const [syncResults, setSyncResults] = useState<SyncResult[]>([]);
  const [isAutoSync, setIsAutoSync] = useState(false);

  const syncService = async (service: keyof SyncStatus) => {
    setSyncStatus(prev => ({ ...prev, [service]: 'syncing' }));

    try {
      let response;
      let data;

      switch (service) {
        case 'marketbase':
          response = await fetch('/api/marketbase/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'sync' }),
          });
          data = await response.json();
          break;

        case 'grok':
          response = await fetch('/api/grok/analytics?storeId=test-store-id');
          data = await response.json();
          break;

        case 'tgstat':
          response = await fetch('/api/tgstat/channel?channelId=test-channel-id');
          data = await response.json();
          break;

        default:
          throw new Error('Unknown service');
      }

      if (response.ok && data.success) {
        setSyncStatus(prev => ({ ...prev, [service]: 'success' }));
        setSyncResults(prev => [...prev, {
          service,
          status: 'success',
          message: `Successfully synced ${service}`,
          data,
          timestamp: new Date(),
        }]);
      } else {
        throw new Error(data.message || 'Sync failed');
      }
    } catch (error) {
      setSyncStatus(prev => ({ ...prev, [service]: 'error' }));
      setSyncResults(prev => [...prev, {
        service,
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date(),
      }]);
    }
  };

  const syncAll = async () => {
    await Promise.all([
      syncService('marketbase'),
      syncService('grok'),
      syncService('tgstat'),
    ]);
  };

  useEffect(() => {
    if (isAutoSync) {
      const interval = setInterval(syncAll, 300000); // 5 minutes
      return () => clearInterval(interval);
    }
  }, [isAutoSync]);

  const getStatusIcon = (status: SyncStatus[keyof SyncStatus]) => {
    switch (status) {
      case 'syncing':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <RefreshCw className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: SyncStatus[keyof SyncStatus]) => {
    switch (status) {
      case 'syncing':
        return 'Синхронизация...';
      case 'success':
        return 'Успешно';
      case 'error':
        return 'Ошибка';
      default:
        return 'Ожидание';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Синхронизация данных
        </h3>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isAutoSync}
              onChange={(e) => setIsAutoSync(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              Автосинхронизация
            </span>
          </label>
          <button
            onClick={syncAll}
            disabled={Object.values(syncStatus).some(s => s === 'syncing')}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Синхронизировать все
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {(['marketbase', 'grok', 'tgstat'] as const).map((service) => (
          <div
            key={service}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              {getStatusIcon(syncStatus[service])}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white capitalize">
                  {service}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {getStatusText(syncStatus[service])}
                </p>
              </div>
            </div>
            <button
              onClick={() => syncService(service)}
              disabled={syncStatus[service] === 'syncing'}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {syncResults.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
            История синхронизации
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {syncResults.slice(-5).reverse().map((result, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg text-sm ${
                  result.status === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {result.status === 'success' ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <span className="capitalize">{result.service}</span>
                  <span>•</span>
                  <span>{result.message}</span>
                </div>
                <span className="text-xs opacity-75">
                  {result.timestamp.toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketbaseSync; 