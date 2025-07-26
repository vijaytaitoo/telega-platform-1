# 🚀 Tele•Ga Helm Chart

Helm Chart для деплоя платформы Tele•Ga в Kubernetes.

## 📋 Предварительные требования

- **Kubernetes** 1.24+
- **Helm** 3.12+
- **cert-manager** (для SSL сертификатов)
- **nginx-ingress** (для Ingress)
- **StorageClass** с поддержкой ReadWriteOnce

## 🔧 Установка

### 1. Добавление репозитория
```bash
helm repo add telega https://your-registry.com/charts
helm repo update
```

### 2. Создание namespace
```bash
kubectl create namespace telega
```

### 3. Создание Secrets
```bash
# Создайте секреты с чувствительными данными
kubectl create secret generic telega-secrets \
  --from-literal=jwt-secret="your-super-secret-jwt-key" \
  --from-literal=jwt-refresh-secret="your-super-secret-refresh-key" \
  --from-literal=telegram-bot-token="your-bot-token" \
  --from-literal=stripe-secret-key="your-stripe-secret" \
  --from-literal=paypal-client-id="your-paypal-client-id" \
  --from-literal=paypal-client-secret="your-paypal-client-secret" \
  -n telega
```

### 4. Установка Chart
```bash
# Установка с базовыми настройками
helm install telega ./helm \
  --namespace telega \
  --set global.environment=production

# Установка с кастомными значениями
helm install telega ./helm \
  --namespace telega \
  -f values-production.yaml
```

## ⚙️ Конфигурация

### Основные параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| `global.environment` | Окружение (production/staging) | `production` |
| `global.domain` | Основной домен | `telega.uz` |
| `gateway.replicaCount` | Количество реплик Gateway | `2` |
| `interface.replicaCount` | Количество реплик Interface | `2` |
| `studio.replicaCount` | Количество реплик Studio | `1` |

### Ресурсы

```yaml
gateway:
  resources:
    requests:
      memory: "256Mi"
      cpu: "250m"
    limits:
      memory: "512Mi"
      cpu: "500m"
```

### Переменные окружения

```yaml
gateway:
  env:
    NODE_ENV: production
    PORT: 3030
    DATABASE_URL: postgresql://teleuser:telepass@postgres:5432/teledb
    REDIS_URL: redis://redis:6379
```

## 🌐 Домены

Chart автоматически настраивает следующие домены:

- **api.telega.uz** - Backend Gateway
- **shop.telega.uz** - Frontend Interface  
- **studio.telega.uz** - Frontend Studio

## 📊 Мониторинг

### Prometheus + Grafana
```bash
# Включение мониторинга
helm install telega ./helm \
  --set monitoring.enabled=true \
  --set monitoring.prometheus.enabled=true \
  --set monitoring.grafana.enabled=true
```

### Доступ к Grafana
```bash
kubectl port-forward svc/telega-grafana 3001:3000 -n telega
# Откройте http://localhost:3001
# Логин: admin
# Пароль: admin123456
```

## 📝 Логирование

### ELK Stack
```bash
# Включение логирования
helm install telega ./helm \
  --set logging.enabled=true \
  --set logging.elasticsearch.enabled=true \
  --set logging.kibana.enabled=true
```

### Доступ к Kibana
```bash
kubectl port-forward svc/telega-kibana 5601:5601 -n telega
# Откройте http://localhost:5601
```

## 💾 База данных

### PostgreSQL
```bash
# Включение PostgreSQL
helm install telega ./helm \
  --set postgres.enabled=true \
  --set postgres.postgresqlPassword="your-secure-password"
```

### Внешняя база данных
```yaml
gateway:
  env:
    DATABASE_URL: "postgresql://user:pass@external-host:5432/db"
```

## 🔄 Обновление

### Обновление релиза
```bash
helm upgrade telega ./helm \
  --namespace telega \
  -f values-production.yaml
```

### Откат к предыдущей версии
```bash
helm rollback telega 1 -n telega
```

## 🗑️ Удаление

```bash
# Удаление релиза
helm uninstall telega -n telega

# Удаление namespace (осторожно!)
kubectl delete namespace telega
```

## 🔍 Troubleshooting

### Проверка статуса
```bash
# Статус подов
kubectl get pods -n telega

# Логи Gateway
kubectl logs -f deployment/telega-gateway -n telega

# Описание пода
kubectl describe pod <pod-name> -n telega
```

### Проблемы с подключением к БД
```bash
# Проверка PostgreSQL
kubectl exec -it deployment/telega-postgres -n telega -- psql -U teleuser -d teledb

# Проверка Redis
kubectl exec -it deployment/telega-redis -n telega -- redis-cli ping
```

### Проблемы с SSL
```bash
# Проверка сертификатов
kubectl get certificates -n telega

# Проверка cert-manager
kubectl get clusterissuer
```

## 📚 Полезные команды

### Масштабирование
```bash
# Масштабирование Gateway
kubectl scale deployment telega-gateway --replicas=3 -n telega

# Масштабирование Interface
kubectl scale deployment telega-interface --replicas=5 -n telega
```

### Просмотр логов
```bash
# Логи всех подов
kubectl logs -l app.kubernetes.io/name=tele-ga -n telega

# Логи конкретного сервиса
kubectl logs -l component=gateway -n telega
```

### Доступ к сервисам
```bash
# Порт-форвард для Gateway
kubectl port-forward svc/telega-gateway 3030:80 -n telega

# Порт-форвард для Interface
kubectl port-forward svc/telega-interface 5173:80 -n telega
```

## 🚀 Продакшен чеклист

- [ ] Настроены все Secrets
- [ ] Настроены домены и DNS
- [ ] Установлен cert-manager
- [ ] Настроен nginx-ingress
- [ ] Создан StorageClass
- [ ] Настроены мониторинг и логирование
- [ ] Настроены бэкапы
- [ ] Протестированы все сервисы
- [ ] Настроены алерты

## 📞 Поддержка

- **Документация**: https://docs.telega.uz
- **Telegram**: @TeleGaSupportBot
- **GitHub Issues**: https://github.com/your-username/telega-platform-1/issues 