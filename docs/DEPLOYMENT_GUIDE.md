# ============================================
# Armenian Anki - Production Deployment Guide
# ============================================
# 
# This file documents how to deploy Armenian Anki to your domain.
# Tested with: Ubuntu 22.04 LTS, Nginx 1.24, PostgreSQL 15, Node.js 20
#

# =====================
# 1. SYSTEM SETUP
# =====================

# Update system
sudo apt update && sudo apt upgrade -y

# Install dependencies
sudo apt install -y nodejs npm postgresql postgresql-contrib nginx certbot python3-certbot-nginx git

# Verify versions
node --version  # v20+
npm --version   # 10+
psql --version  # 15+
nginx -v        # 1.24+

# =====================
# 2. DATABASE SETUP
# =====================

# Login to PostgreSQL as root
sudo -u postgres psql

# Inside psql shell:
CREATE USER anki_user WITH PASSWORD 'your_secure_password_here_min_20_chars!';
CREATE DATABASE armenian_anki OWNER anki_user;
GRANT ALL PRIVILEGES ON DATABASE armenian_anki TO anki_user;
\q

# Test connection
PGPASSWORD='your_secure_password_here_min_20_chars!' psql -h localhost -U anki_user -d armenian_anki -c "SELECT 1;"

# =====================
# 3. GOOGLE OAUTH SETUP
# =====================

# 1. Go to https://console.cloud.google.com
# 2. Create a new project: "Armenian Anki"
# 3. Enable Google+ API
# 4. Create OAuth 2.0 Credentials:
#    - Type: Web application
#    - Authorized JavaScript origins: https://yourdomain.com
#    - Authorized redirect URIs:
#      https://yourdomain.com/api/auth/callback/google
#      http://localhost:3000/api/auth/callback/google (for local dev)
# 5. Copy Client ID and Client Secret for .env below

# =====================
# 4. CLONE & SETUP APP
# =====================

cd /opt
sudo git clone https://github.com/yourusername/armenian-anki.git
sudo chown -R $USER:$USER armenian-anki
cd armenian-anki
npm install

# =====================
# 5. ENVIRONMENT CONFIG
# =====================

# Create .env file (copy from .env.example, replace with real values):

cat > .env << 'EOF'
# Database
DATABASE_URL="postgresql://anki_user:your_secure_password_here_min_20_chars!@localhost:5432/armenian_anki"

# NextAuth
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"

# Google OAuth (from step 3 above)
GOOGLE_CLIENT_ID="123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxx"

# Node environment
NODE_ENV="production"
EOF

# Test database connection
npx prisma db execute --stdin < /dev/null

# Run migrations (creates tables)
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Build Next.js
npm run build

# =====================
# 6. SYSTEMD SERVICE
# =====================

# Create service file
sudo tee /etc/systemd/system/armenian-anki.service > /dev/null << 'EOF'
[Unit]
Description=Armenian Anki - Spaced Repetition App
After=network.target postgresql.service

[Service]
Type=simple
User=$USER
WorkingDirectory=/opt/armenian-anki
Environment="NODE_ENV=production"
EnvironmentFile=/opt/armenian-anki/.env
ExecStart=/usr/bin/npm start
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

# Note: Replace $USER with your actual username above, e.g., 'ubuntu'

# Enable and start service
sudo systemctl daemon-reload
sudo systemctl enable armenian-anki
sudo systemctl start armenian-anki
sudo systemctl status armenian-anki

# View logs
sudo journalctl -u armenian-anki -f

# =====================
# 7. NGINX SETUP
# =====================

# Create nginx config
sudo tee /etc/nginx/sites-available/armenian-anki > /dev/null << 'EOF'
# HTTP to HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS configuration
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL certificates (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # SSL best practices
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Logs
    access_log /var/log/nginx/armenian-anki-access.log;
    error_log /var/log/nginx/armenian-anki-error.log;

    # Proxy to Next.js app
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_cache_bypass $http_upgrade;
        proxy_buffering off;
        proxy_request_buffering off;
    }

    # Next.js static files (cache aggressively)
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    # Public assets
    location /public {
        expires 30d;
        add_header Cache-Control "public";
    }
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/armenian-anki /etc/nginx/sites-enabled/

# Remove default site if present
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx config
sudo nginx -t

# Reload nginx (if test passes)
sudo systemctl reload nginx

# =====================
# 8. SSL CERTIFICATE
# =====================

# Get Let's Encrypt certificate (replace yourdomain.com)
sudo certbot certonly --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal (should be enabled by default)
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Test renewal (dry run)
sudo certbot renew --dry-run

# =====================
# 9. FIREWALL
# =====================

sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable

# =====================
# 10. MONITORING
# =====================

# Check app is running
curl https://yourdomain.com

# Check logs
sudo journalctl -u armenian-anki -n 20

# Monitor database size
du -sh /var/lib/postgresql/14/main

# =====================
# 11. BACKUP STRATEGY
# =====================

# Daily PostgreSQL backup script
sudo tee /usr/local/bin/backup-armenian-anki.sh > /dev/null << 'EOF'
#!/bin/bash
BACKUP_DIR="/backups/armenian-anki"
DATE=$(date +%Y-%m-%d_%H-%M-%S)
mkdir -p $BACKUP_DIR

# Backup database
PGPASSWORD='your_secure_password_here' pg_dump -h localhost -U anki_user armenian_anki | gzip > $BACKUP_DIR/db_${DATE}.sql.gz

# Keep only last 30 days
find $BACKUP_DIR -name "db_*.sql.gz" -mtime +30 -delete

# Optional: Upload to cloud storage
# aws s3 cp $BACKUP_DIR/db_${DATE}.sql.gz s3://your-backup-bucket/
EOF

sudo chmod +x /usr/local/bin/backup-armenian-anki.sh

# Schedule daily at 2 AM
(sudo crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/backup-armenian-anki.sh") | sudo crontab -

# =====================
# 12. UPDATES & MAINTENANCE
# =====================

# To deploy new version:
cd /opt/armenian-anki
git pull origin main
npm install
npm run build
npx prisma migrate deploy
sudo systemctl restart armenian-anki

# Monitor Node.js processes
npm install -g pm2
pm2 list

# Alternative: Use PM2 for process management
# pm2 start npm --name "armenian-anki" -- start
# pm2 startup
# pm2 save

# =====================
# 13. TROUBLESHOOTING
# =====================

# If app fails to start:
sudo systemctl restart armenian-anki
sudo journalctl -u armenian-anki -n 50 --no-pager

# If database connection fails:
PGPASSWORD='your_secure_password_here' psql -h localhost -U anki_user -d armenian_anki -c "SELECT 1;"

# If Google login fails:
# 1. Check NEXTAUTH_URL in .env matches domain
# 2. Verify OAuth redirect URI in Google Cloud Console
# 3. Check browser console for errors (F12)

# If CSV import fails:
# 1. Verify UTF-8 encoding: file -i YourFile.csv
# 2. Check CSV format matches sample
# 3. Look at app logs: sudo journalctl -u armenian-anki -f

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
npx prisma db push

# =====================
# CONTINUOUS DEPLOYMENT
# =====================

# Optional: GitHub Actions for auto-deploy on push to main
# See .github/workflows/deploy.yml template below
