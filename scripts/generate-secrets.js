#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

// Функция для кодирования строки в base64
function encodeBase64(str) {
  return Buffer.from(str).toString('base64');
}

// Функция для генерации случайного секрета
function generateSecret(length = 32) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Основные секреты для генерации
const secrets = {
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || 'your_bot_token_here',
  JWT_SECRET: process.env.JWT_SECRET || generateSecret(64),
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || generateSecret(64),
  DATABASE_URL:
    process.env.DATABASE_URL ||
    'postgresql://telega_user:supersecurepassword@postgres:5432/telega_db',
  REDIS_URL: process.env.REDIS_URL || 'redis://redis:6379',
  MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY || 'minioadmin',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || 'sk_test_your_stripe_secret_key_here',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'your_paypal_client_id_here',
  PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET || 'your_paypal_client_secret_here',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || 'your_openai_api_key_here',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'supersecurepassword',
  GRAFANA_PASSWORD: process.env.GRAFANA_PASSWORD || 'grafana_password',
};

// Генерация k8s/secrets.yaml
function generateK8sSecrets() {
  const k8sSecrets = `apiVersion: v1
kind: Secret
metadata:
  name: telega-secrets
  namespace: telega
type: Opaque
data:
  # Base64 encoded values - replace with your actual values
  TELEGRAM_BOT_TOKEN: ${encodeBase64(secrets.TELEGRAM_BOT_TOKEN)}
  JWT_SECRET: ${encodeBase64(secrets.JWT_SECRET)}
  JWT_REFRESH_SECRET: ${encodeBase64(secrets.JWT_REFRESH_SECRET)}
  DATABASE_URL: ${encodeBase64(secrets.DATABASE_URL)}
  REDIS_URL: ${encodeBase64(secrets.REDIS_URL)}
  MINIO_ACCESS_KEY: ${encodeBase64(secrets.MINIO_ACCESS_KEY)}
  MINIO_SECRET_KEY: ${encodeBase64(secrets.MINIO_SECRET_KEY)}
  STRIPE_SECRET_KEY: ${encodeBase64(secrets.STRIPE_SECRET_KEY)}
  PAYPAL_CLIENT_ID: ${encodeBase64(secrets.PAYPAL_CLIENT_ID)}
  PAYPAL_CLIENT_SECRET: ${encodeBase64(secrets.PAYPAL_CLIENT_SECRET)}
  OPENAI_API_KEY: ${encodeBase64(secrets.OPENAI_API_KEY)}
  POSTGRES_PASSWORD: ${encodeBase64(secrets.POSTGRES_PASSWORD)}
  GRAFANA_PASSWORD: ${encodeBase64(secrets.GRAFANA_PASSWORD)}
`;

  const k8sPath = path.join(__dirname, '..', 'k8s', 'secrets.yaml');
  fs.writeFileSync(k8sPath, k8sSecrets);
  console.log('✅ Generated k8s/secrets.yaml');
}

// Генерация .env файла
function generateEnvFile() {
  const envContent = `# =============================================================================
# Tele•Ga Platform - Environment Variables
# =============================================================================

# =============================================================================
# TELEGRAM CONFIGURATION
# =============================================================================
TELEGRAM_BOT_TOKEN=${secrets.TELEGRAM_BOT_TOKEN}
TELEGRAM_WEBHOOK_URL=https://api.telega.uz/webhook/telegram
TELEGRAM_WEBHOOK_SECRET=${generateSecret(32)}

# =============================================================================
# JWT AUTHENTICATION
# =============================================================================
JWT_SECRET=${secrets.JWT_SECRET}
JWT_REFRESH_SECRET=${secrets.JWT_REFRESH_SECRET}
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# =============================================================================
# DATABASE CONFIGURATION
# =============================================================================
DATABASE_URL=${secrets.DATABASE_URL}
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=telega_user
POSTGRES_PASSWORD=${secrets.POSTGRES_PASSWORD}
POSTGRES_DB=telega_db

# =============================================================================
# REDIS CONFIGURATION
# =============================================================================
REDIS_URL=${secrets.REDIS_URL}
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# =============================================================================
# MINIO OBJECT STORAGE
# =============================================================================
MINIO_ENDPOINT=minio:9000
MINIO_ACCESS_KEY=${secrets.MINIO_ACCESS_KEY}
MINIO_SECRET_KEY=${secrets.MINIO_SECRET_KEY}
MINIO_BUCKET=telega-bucket
MINIO_REGION=us-east-1
MINIO_USE_SSL=false

# =============================================================================
# PAYMENT PROVIDERS
# =============================================================================
STRIPE_SECRET_KEY=${secrets.STRIPE_SECRET_KEY}
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret_here

PAYPAL_CLIENT_ID=${secrets.PAYPAL_CLIENT_ID}
PAYPAL_CLIENT_SECRET=${secrets.PAYPAL_CLIENT_SECRET}
PAYPAL_MODE=sandbox

# =============================================================================
# SERVER CONFIGURATION
# =============================================================================
NODE_ENV=production
PORT=3000
API_PORT=3001
FRONTEND_PORT=3002
STUDIO_PORT=3003

# =============================================================================
# CORS CONFIGURATION
# =============================================================================
CORS_ORIGIN=https://shop.telega.uz,https://studio.telega.uz,https://api.telega.uz

# =============================================================================
# LOGGING & MONITORING
# =============================================================================
LOG_LEVEL=info
SENTRY_DSN=your_sentry_dsn_here
PROMETHEUS_PORT=9090

# =============================================================================
# EMAIL CONFIGURATION (Optional)
# =============================================================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_here

# =============================================================================
# EXTERNAL SERVICES
# =============================================================================
OPENAI_API_KEY=${secrets.OPENAI_API_KEY}
GOOGLE_ANALYTICS_ID=your_ga_id_here
`;

  const envPath = path.join(__dirname, '..', '.env');
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Generated .env file');
}

// Генерация Helm values с base64 секретами
function generateHelmValues() {
  const helmValues = `# =============================================================================
# Tele•Ga Platform - Production Values
# =============================================================================

# Global settings
global:
  environment: production
  domain: telega.uz
  imageRegistry: ghcr.io/your-username
  imagePullSecrets:
    - name: ghcr-secret

# =============================================================================
# SECRETS (Base64 encoded)
# =============================================================================
secrets:
  telegramBotToken: "${encodeBase64(secrets.TELEGRAM_BOT_TOKEN)}"
  jwtSecret: "${encodeBase64(secrets.JWT_SECRET)}"
  jwtRefreshSecret: "${encodeBase64(secrets.JWT_REFRESH_SECRET)}"
  databaseUrl: "${encodeBase64(secrets.DATABASE_URL)}"
  redisUrl: "${encodeBase64(secrets.REDIS_URL)}"
  minioAccessKey: "${encodeBase64(secrets.MINIO_ACCESS_KEY)}"
  minioSecretKey: "${encodeBase64(secrets.MINIO_SECRET_KEY)}"
  stripeSecretKey: "${encodeBase64(secrets.STRIPE_SECRET_KEY)}"
  paypalClientId: "${encodeBase64(secrets.PAYPAL_CLIENT_ID)}"
  paypalClientSecret: "${encodeBase64(secrets.PAYPAL_CLIENT_SECRET)}"
  openaiApiKey: "${encodeBase64(secrets.OPENAI_API_KEY)}"
  postgresPassword: "${encodeBase64(secrets.POSTGRES_PASSWORD)}"
  grafanaPassword: "${encodeBase64(secrets.GRAFANA_PASSWORD)}"

# =============================================================================
# GATEWAY SERVICE
# =============================================================================
gateway:
  enabled: true
  replicaCount: 3
  image:
    repository: telega-gateway
    tag: "latest"
    pullPolicy: Always
  resources:
    limits:
      cpu: 1000m
      memory: 1Gi
    requests:
      cpu: 500m
      memory: 512Mi
  env:
    NODE_ENV: production
    PORT: 3001
    TELEGRAM_BOT_TOKEN: "{{ .Values.secrets.telegramBotToken }}"
    JWT_SECRET: "{{ .Values.secrets.jwtSecret }}"
    JWT_REFRESH_SECRET: "{{ .Values.secrets.jwtRefreshSecret }}"
    DATABASE_URL: "{{ .Values.secrets.databaseUrl }}"
    REDIS_URL: "{{ .Values.secrets.redisUrl }}"
    CORS_ORIGIN: "https://shop.telega.uz,https://studio.telega.uz,https://api.telega.uz"
    LOG_LEVEL: info

# =============================================================================
# FRONTEND INTERFACE (SHOP)
# =============================================================================
interface:
  enabled: true
  replicaCount: 2
  image:
    repository: telega-interface
    tag: "latest"
    pullPolicy: Always
  resources:
    limits:
      cpu: 500m
      memory: 512Mi
    requests:
      cpu: 250m
      memory: 256Mi
  env:
    NODE_ENV: production
    VITE_API_URL: "https://api.telega.uz"
    VITE_TELEGRAM_BOT_USERNAME: "@TeleGaBot"

# =============================================================================
# FRONTEND STUDIO (ADMIN)
# =============================================================================
studio:
  enabled: true
  replicaCount: 2
  image:
    repository: telega-studio
    tag: "latest"
    pullPolicy: Always
  resources:
    limits:
      cpu: 500m
      memory: 512Mi
    requests:
      cpu: 250m
      memory: 256Mi
  env:
    NODE_ENV: production
    NEXT_PUBLIC_API_URL: "https://api.telega.uz"
    NEXT_PUBLIC_TELEGRAM_BOT_USERNAME: "@TeleGaBot"

# =============================================================================
# TELEGRAM SERVICE
# =============================================================================
telegramService:
  enabled: true
  replicaCount: 2
  image:
    repository: telega-telegram-service
    tag: "latest"
    pullPolicy: Always
  resources:
    limits:
      cpu: 1000m
      memory: 1Gi
    requests:
      cpu: 500m
      memory: 512Mi
  env:
    NODE_ENV: production
    TELEGRAM_BOT_TOKEN: "{{ .Values.secrets.telegramBotToken }}"
    TELEGRAM_WEBHOOK_URL: "https://api.telega.uz/webhook/telegram"
    DATABASE_URL: "{{ .Values.secrets.databaseUrl }}"
    REDIS_URL: "{{ .Values.secrets.redisUrl }}"

# =============================================================================
# AUTH SERVICE
# =============================================================================
authService:
  enabled: true
  replicaCount: 2
  image:
    repository: telega-auth-service
    tag: "latest"
    pullPolicy: Always
  resources:
    limits:
      cpu: 500m
      memory: 512Mi
    requests:
      cpu: 250m
      memory: 256Mi
  env:
    NODE_ENV: production
    JWT_SECRET: "{{ .Values.secrets.jwtSecret }}"
    JWT_REFRESH_SECRET: "{{ .Values.secrets.jwtRefreshSecret }}"
    DATABASE_URL: "{{ .Values.secrets.databaseUrl }}"

# =============================================================================
# PAYMENT SERVICE
# =============================================================================
paymentService:
  enabled: true
  replicaCount: 2
  image:
    repository: telega-payment-service
    tag: "latest"
    pullPolicy: Always
  resources:
    limits:
      cpu: 500m
      memory: 512Mi
    requests:
      cpu: 250m
      memory: 256Mi
  env:
    NODE_ENV: production
    STRIPE_SECRET_KEY: "{{ .Values.secrets.stripeSecretKey }}"
    PAYPAL_CLIENT_ID: "{{ .Values.secrets.paypalClientId }}"
    PAYPAL_CLIENT_SECRET: "{{ .Values.secrets.paypalClientSecret }}"
    DATABASE_URL: "{{ .Values.secrets.databaseUrl }}"

# =============================================================================
# MASS MAILER SERVICE
# =============================================================================
massMailer:
  enabled: true
  replicaCount: 1
  image:
    repository: telega-mass-mailer
    tag: "latest"
    pullPolicy: Always
  resources:
    limits:
      cpu: 500m
      memory: 512Mi
    requests:
      cpu: 250m
      memory: 256Mi
  env:
    NODE_ENV: production
    TELEGRAM_BOT_TOKEN: "{{ .Values.secrets.telegramBotToken }}"
    DATABASE_URL: "{{ .Values.secrets.databaseUrl }}"
    REDIS_URL: "{{ .Values.secrets.redisUrl }}"

# =============================================================================
# INGRESS CONFIGURATION
# =============================================================================
ingress:
  enabled: true
  className: nginx
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
  hosts:
    - host: api.telega.uz
      paths:
        - path: /
          pathType: Prefix
          service:
            name: tele-ga-gateway
            port:
              number: 3001
    - host: shop.telega.uz
      paths:
        - path: /
          pathType: Prefix
          service:
            name: tele-ga-interface
            port:
              number: 3002
    - host: studio.telega.uz
      paths:
        - path: /
          pathType: Prefix
          service:
            name: tele-ga-studio
            port:
              number: 3003
  tls:
    - secretName: telega-tls
      hosts:
        - api.telega.uz
        - shop.telega.uz
        - studio.telega.uz

# =============================================================================
# DATABASE (PostgreSQL)
# =============================================================================
postgres:
  enabled: true
  image:
    repository: postgres
    tag: "15-alpine"
  persistence:
    enabled: true
    size: 20Gi
    storageClass: "standard"
  env:
    POSTGRES_DB: telega_db
    POSTGRES_USER: telega_user
    POSTGRES_PASSWORD: "{{ .Values.secrets.postgresPassword }}"
  resources:
    limits:
      cpu: 1000m
      memory: 2Gi
    requests:
      cpu: 500m
      memory: 1Gi

# =============================================================================
# REDIS
# =============================================================================
redis:
  enabled: true
  image:
    repository: redis
    tag: "7-alpine"
  persistence:
    enabled: true
    size: 5Gi
    storageClass: "standard"
  resources:
    limits:
      cpu: 500m
      memory: 1Gi
    requests:
      cpu: 250m
      memory: 512Mi

# =============================================================================
# MINIO OBJECT STORAGE
# =============================================================================
minio:
  enabled: true
  image:
    repository: minio/minio
    tag: "RELEASE.2023-10-25T16-07-38Z"
  persistence:
    enabled: true
    size: 50Gi
    storageClass: "standard"
  env:
    MINIO_ROOT_USER: "{{ .Values.secrets.minioAccessKey }}"
    MINIO_ROOT_PASSWORD: "{{ .Values.secrets.minioSecretKey }}"
  resources:
    limits:
      cpu: 1000m
      memory: 2Gi
    requests:
      cpu: 500m
      memory: 1Gi

# =============================================================================
# MONITORING (Prometheus + Grafana)
# =============================================================================
monitoring:
  enabled: true
  prometheus:
    enabled: true
    persistence:
      enabled: true
      size: 10Gi
  grafana:
    enabled: true
    persistence:
      enabled: true
      size: 5Gi
    adminPassword: "{{ .Values.secrets.grafanaPassword }}"

# =============================================================================
# LOGGING (ELK Stack)
# =============================================================================
logging:
  enabled: true
  elasticsearch:
    enabled: true
    persistence:
      enabled: true
      size: 20Gi
  kibana:
    enabled: true
    persistence:
      enabled: true
      size: 5Gi

# =============================================================================
# BACKUP CONFIGURATION
# =============================================================================
backup:
  enabled: true
  schedule: "0 2 * * *"  # Daily at 2 AM
  retention: 30  # days
  storage:
    type: s3
    bucket: telega-backups
    region: us-east-1
`;

  const helmPath = path.join(__dirname, '..', 'helm', 'values.production.yaml');
  fs.writeFileSync(helmPath, helmValues);
  console.log('✅ Generated helm/values.production.yaml');
}

// Основная функция
function main() {
  console.log('🔐 Generating secrets and configuration files...\n');

  try {
    generateK8sSecrets();
    generateEnvFile();
    generateHelmValues();

    console.log('\n✅ All files generated successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Review and update the generated files with your actual values');
    console.log('2. Add secrets to GitHub Actions (Settings → Secrets → Actions)');
    console.log('3. Update DNS records to point to your Kubernetes cluster');
    console.log(
      '4. Deploy using: helm upgrade --install telega ./helm -f helm/values.production.yaml',
    );
  } catch (error) {
    console.error('❌ Error generating files:', error.message);
    process.exit(1);
  }
}

// Запуск скрипта
if (require.main === module) {
  main();
}

module.exports = { generateK8sSecrets, generateEnvFile, generateHelmValues };
