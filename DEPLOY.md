# Deployment Guide — nandaredoine.com

## 1. Google Sheets RSVP Setup

### Step 1: Create the spreadsheet

1. Go to [Google Sheets](https://sheets.google.com) logged in as `bengelouneredoine@gmail.com`
2. Create a new spreadsheet, name it **"Wedding RSVP"**
3. In row 1, add these headers:

| A | B | C | D | E |
|---|---|---|---|---|
| Date | Name | Email | Presence | Message |

### Step 2: Create the Apps Script

1. In the spreadsheet, go to **Extensions > Apps Script**
2. Delete the default code and paste this:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date().toLocaleString('en-GB'),
    data.name || '',
    data.email || '',
    data.presence || '',
    data.message || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Save** (Ctrl+S), name the project "Wedding RSVP Script"

### Step 3: Deploy as Web App

1. Click **Deploy > New deployment**
2. Click the gear icon, select **Web app**
3. Set:
   - **Description**: "Wedding RSVP"
   - **Execute as**: Me (bengelouneredoine@gmail.com)
   - **Who has access**: Anyone
4. Click **Deploy**
5. Authorize the app when prompted
6. **Copy the Web app URL** (looks like `https://script.google.com/macros/s/AKfy.../exec`)

### Step 4: Update the site config

Open `app/config.ts` and replace the placeholder:

```typescript
googleSheets: {
  endpoint: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
},
```

---

## 2. Personalized Invitations

Send each guest a personalized link using the `?n=` parameter:

```
https://nandaredoine.com/?n=Fatima
https://nandaredoine.com/?n=Ahmed%20et%20Sarah
https://nandaredoine.com/?n=Uncle%20Mohamed
```

The name appears in the greeting on the first slide.

---

## 3. DNS Configuration

At your domain registrar (where you bought nandaredoine.com), add these DNS records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | YOUR_VPS_IP | 3600 |
| A | www | YOUR_VPS_IP | 3600 |

Replace `YOUR_VPS_IP` with the IP address of your OVH VPS.

DNS propagation can take up to 24-48 hours.

---

## 4. VPS Server Setup (OVH)

### Step 1: Connect via SSH

```bash
ssh root@YOUR_VPS_IP
```

### Step 2: Install Docker

```bash
apt update && apt upgrade -y
apt install -y ca-certificates curl gnupg
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null

apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### Step 3: Install Nginx + Certbot

```bash
apt install -y nginx certbot python3-certbot-nginx
```

### Step 4: Transfer the project

Option A — Git (recommended):
```bash
cd /opt
git clone YOUR_REPO_URL wedding
cd wedding
```

Option B — SCP from your machine:
```bash
# Run this from your local machine (PowerShell)
scp -r "c:\Users\redoi\sites web\Wedding_Nanda" root@YOUR_VPS_IP:/opt/wedding
```

### Step 5: Build and start the container

```bash
cd /opt/wedding
docker compose up -d --build
```

Verify it runs (le conteneur tourne sur le port hôte 3002, sans conflit avec les autres services) :
```bash
curl http://localhost:3002
```

### Step 6: Configure Nginx

```bash
cp nginx.conf /etc/nginx/sites-available/nandaredoine.com
ln -s /etc/nginx/sites-available/nandaredoine.com /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

### Step 7: Get SSL certificate (HTTPS)

First, temporarily comment out the `listen 443` server block in the Nginx config, or use this simpler initial config:

```bash
cat > /etc/nginx/sites-available/nandaredoine.com << 'EOF'
server {
    listen 80;
    server_name nandaredoine.com www.nandaredoine.com;

    location / {
        proxy_pass http://127.0.0.1:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

nginx -t && systemctl reload nginx
```

Then run Certbot:
```bash
certbot --nginx -d nandaredoine.com -d www.nandaredoine.com
```

Certbot will automatically update the Nginx config to add SSL.

### Step 8: Verify

Open https://nandaredoine.com in your browser. You should see your wedding site with HTTPS.

---

## 5. Updating the site

When you make changes:

```bash
ssh root@YOUR_VPS_IP
cd /opt/wedding
git pull                         # if using git
docker compose up -d --build     # rebuild and restart
```

---

## 6. Useful commands

```bash
# View logs
docker compose logs -f wedding

# Restart
docker compose restart

# Stop
docker compose down

# Rebuild from scratch
docker compose up -d --build --force-recreate

# Renew SSL (auto, but manual if needed)
certbot renew
```
