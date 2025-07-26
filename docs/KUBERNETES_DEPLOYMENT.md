# 🚀 Kubernetes Deployment Guide

## 📋 Обзор

Tele•Ga Platform теперь поддерживает полный деплой в Kubernetes с помощью Helm Chart, включая:

- **Helm Chart** для оркестрации всех сервисов
- **Telegram OAuth2** аутентификация
- **Инфраструктурные сервисы** (PostgreSQL, Redis, MinIO)
- **Мониторинг** (Prometheus + Grafana)
- **Логирование** (ELK Stack)
- **SSL сертификаты** (Let's Encrypt)
- **Автомасштабирование** и отказоустойчивость

## 🏗️ Архитектура

```
┌─────────────────────────────────────────────────────────────┐
│                    Kubernetes Cluster                       │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │   Ingress   │  │   Ingress   │  │   Ingress   │       │
│  │  nginx      │  │  nginx      │  │  nginx      │       │
│  └─────────────┘  └─────────────┘  └─────────────┘       │
│         │                │                │               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │   Gateway   │  │  Interface  │  │   Studio    │       │
│  │   (API)     │  │  (Shop)     │  │  (Admin)    │       │
│  └─────────────┘  └─────────────┘  └─────────────┘       │
│         │                │                │               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │ PostgreSQL  │  │    Redis    │  │   MinIO     │       │
│  │  (Database) │  │   (Cache)   │  │ (Storage)   │       │
│  └─────────────┘  └─────────────┘  └─────────────┘       │
│         │                │                │               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │ Prometheus  │  │   Grafana   │  │ Elasticsearch│      │
│  │(Monitoring) │  │ (Dashboard) │  │  (Logs)     │       │
│  └─────────────┘  └─────────────┘  └─────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Установка

### 1. Предварительные требования

```bash
# Kubernetes 1.24+
kubectl version --client

# Helm 3.12+
helm version

# cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# nginx-ingress
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install ingress-nginx ingress-nginx/ingress-nginx
```

### 2. Настройка Secrets

```bash
# Создание namespace
kubectl create namespace telega

# Создание секретов
kubectl create secret generic telega-secrets \
  --from-literal=jwt-secret="your-super-secret-jwt-key-here" \
  --from-literal=jwt-refresh-secret="your-super-secret-refresh-key-here" \
  --from-literal=telegram-bot-token="your-bot-token-here" \
  --from-literal=stripe-secret-key="your-stripe-secret-key" \
  --from-literal=paypal-client-id="your-paypal-client-id" \
  --from-literal=paypal-client-secret="your-paypal-client-secret" \
  -n telega
```

### 3. Установка Helm Chart

```bash
# Клонирование репозитория
git clone https://github.com/your-username/telega-platform-1.git
cd telega-platform-1

# Установка с базовыми настройками
helm install telega ./helm \
  --namespace telega \
  --set global.environment=production

# Или с кастомными значениями
helm install telega ./helm \
  --namespace telega \
  -f helm/values-production.yaml
```

## 🌐 Домены и DNS

### Настройка DNS записей

```bash
# A записи для всех доменов
api.telega.uz     A    YOUR_KUBERNETES_IP
shop.telega.uz    A    YOUR_KUBERNETES_IP  
studio.telega.uz  A    YOUR_KUBERNETES_IP
```

### SSL сертификаты

Chart автоматически запрашивает SSL сертификаты через cert-manager:

```yaml
# В values.yaml
ingress:
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
```

## 📊 Мониторинг

### Prometheus + Grafana

```bash
# Включение мониторинга
helm upgrade telega ./helm \
  --set monitoring.enabled=true \
  --set monitoring.prometheus.enabled=true \
  --set monitoring.grafana.enabled=true \
  -n telega
```

### Доступ к дашбордам

```bash
# Grafana
kubectl port-forward svc/telega-grafana 3001:3000 -n telega
# http://localhost:3001 (admin/admin123456)

# Prometheus
kubectl port-forward svc/telega-prometheus 9090:9090 -n telega
# http://localhost:9090
```

## 📝 Логирование

### ELK Stack

```bash
# Включение логирования
helm upgrade telega ./helm \
  --set logging.enabled=true \
  --set logging.elasticsearch.enabled=true \
  --set logging.kibana.enabled=true \
  -n telega
```

### Доступ к Kibana

```bash
kubectl port-forward svc/telega-kibana 5601:5601 -n telega
# http://localhost:5601
```

## 🔐 Telegram OAuth2

### Настройка бота

1. Создайте бота через @BotFather
2. Получите токен и username
3. Настройте WebApp URL в настройках бота

### Интеграция

```typescript
// На фронтенде
const telegramLogin = async () => {
  const response = await fetch('/api/auth/telegram/login-url');
  const { loginUrl } = await response.json();
  window.location.href = loginUrl;
};

// Обработка callback
const handleTelegramCallback = async (initData: string) => {
  const response = await fetch('/api/auth/telegram/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ initData }),
  });
  const { accessToken, user } = await response.json();
  // Сохраняем токен и данные пользователя
};
```

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Kubernetes

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build and push images
        run: |
          docker build -t your-registry/tele-ga-gateway:${{ github.sha }} ./backend/gateway
          docker build -t your-registry/tele-ga-interface:${{ github.sha }} ./apps/telega-interface
          docker build -t your-registry/tele-ga-studio:${{ github.sha }} ./apps/telega-studio
          docker push your-registry/tele-ga-gateway:${{ github.sha }}
          docker push your-registry/tele-ga-interface:${{ github.sha }}
          docker push your-registry/tele-ga-studio:${{ github.sha }}
      
      - name: Deploy to Kubernetes
        run: |
          helm upgrade telega ./helm \
            --set gateway.image.tag=${{ github.sha }} \
            --set interface.image.tag=${{ github.sha }} \
            --set studio.image.tag=${{ github.sha }} \
            -n telega
```

## 🔍 Troubleshooting

### Проверка статуса

```bash
# Статус всех ресурсов
kubectl get all -n telega

# Статус подов
kubectl get pods -n telega

# Логи Gateway
kubectl logs -f deployment/telega-gateway -n telega

# Описание пода
kubectl describe pod <pod-name> -n telega
```

### Проблемы с подключением

```bash
# Проверка сервисов
kubectl get svc -n telega

# Проверка Ingress
kubectl get ingress -n telega

# Проверка сертификатов
kubectl get certificates -n telega
```

### Масштабирование

```bash
# Масштабирование Gateway
kubectl scale deployment telega-gateway --replicas=5 -n telega

# Автомасштабирование
kubectl autoscale deployment telega-gateway --min=2 --max=10 --cpu-percent=80 -n telega
```

## 💾 Бэкапы

### Настройка бэкапов

```yaml
# В values.yaml
backup:
  enabled: true
  schedule: "0 2 * * *"  # Ежедневно в 2:00
  retention: 30
  storage:
    type: s3
    bucket: telega-backups
    region: us-east-1
```

### Ручной бэкап

```bash
# Бэкап базы данных
kubectl exec -it deployment/telega-postgres -n telega -- \
  pg_dump -U teleuser teledb > backup.sql

# Бэкап MinIO
kubectl exec -it deployment/telega-minio -n telega -- \
  mc mirror /data backup-bucket/
```

## 🚀 Продакшен чеклист

- [ ] **Кластер**: Kubernetes 1.24+ настроен
- [ ] **Helm**: Версия 3.12+ установлена
- [ ] **cert-manager**: Установлен и настроен
- [ ] **nginx-ingress**: Установлен и настроен
- [ ] **StorageClass**: Создан для персистентных томов
- [ ] **Secrets**: Все секреты созданы
- [ ] **DNS**: Домены настроены и указывают на кластер
- [ ] **SSL**: Сертификаты автоматически запрашиваются
- [ ] **Мониторинг**: Prometheus + Grafana включены
- [ ] **Логирование**: ELK Stack включен
- [ ] **Бэкапы**: Настроены и протестированы
- [ ] **Алерты**: Настроены уведомления
- [ ] **Тестирование**: Все сервисы протестированы
- [ ] **Документация**: Обновлена для команды

## 📞 Поддержка

- **Документация**: https://docs.telega.uz
- **Telegram**: @TeleGaSupportBot
- **GitHub Issues**: https://github.com/your-username/telega-platform-1/issues
- **Helm Chart**: https://github.com/your-username/telega-platform-1/tree/main/helm 