# DEPLOYMENT GUIDE - GoDaddy cPanel

## Pre-Deployment Checklist

### 1. Update WhatsApp Number
Replace `YOUR_WHATSAPP_NUMBER` in all files with your actual number:
- Format: `919876543210` (country code + number, no spaces or symbols)
- Files to update:
  - `components/Header.tsx`
  - `components/Footer.tsx`
  - `app/page.tsx`
  - `app/services/page.tsx`
  - `app/contact/page.tsx`

### 2. Update Contact Details
- Phone: `+91 XXXX XXXXXX` → Your actual number
- Email: `info@pankh.tech` (already set)
- Verify office hours in `app/contact/page.tsx`

---

## Deployment Steps

### Step 1: Build the Website

On your local machine (requires Node.js installed):

```bash
# Navigate to project folder
cd pankh-website

# Install dependencies (first time only)
npm install

# Build the static site
npm run build
```

This creates an `out/` folder with all static files.

### Step 2: Prepare Files for Upload

Option A - Create a ZIP file:
```bash
cd out
zip -r pankh-website.zip *
```

Option B - Use the `out/` folder directly

### Step 3: Login to GoDaddy cPanel

1. Go to your GoDaddy account
2. Navigate to cPanel for pankh.tech
3. Click "File Manager"

### Step 4: Upload Files

**Method 1: Using ZIP (Recommended)**
1. Navigate to `public_html/` directory
2. Click "Upload" button
3. Select `pankh-website.zip`
4. Wait for upload to complete
5. Right-click the zip file → Extract
6. Delete the zip file after extraction

**Method 2: Direct Upload**
1. Navigate to `public_html/` directory
2. Upload all files and folders from the `out/` directory
3. Maintain the folder structure

### Step 5: Set Up Clean URLs (Optional but Recommended)

Create a `.htaccess` file in `public_html/` with:

```apache
# Redirect to HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove .html extension
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([^\.]+)$ $1.html [NC,L]

# Custom error pages (optional)
ErrorDocument 404 /404.html
```

### Step 6: Verify Deployment

1. Visit https://pankh.tech
2. Check all pages load correctly:
   - Home: https://pankh.tech/
   - About: https://pankh.tech/about/
   - Services: https://pankh.tech/services/
   - Contact: https://pankh.tech/contact/
3. Test WhatsApp buttons
4. Test contact form
5. Check mobile responsiveness

---

## File Structure After Upload

Your `public_html/` should look like:

```
public_html/
├── index.html
├── about.html
├── services.html
├── contact.html
├── _next/
│   └── static/
│       ├── css/
│       └── chunks/
├── images/
│   └── logo.png
└── .htaccess (if created)
```

---

## Troubleshooting

### Issue: Pages show 404 errors
**Solution:** 
- Ensure all HTML files are in root `public_html/`
- Check `.htaccess` configuration
- Try accessing with .html extension first

### Issue: WhatsApp button doesn't work
**Solution:**
- Verify phone number format: `919876543210`
- Check for proper encoding in URL
- Test on mobile device

### Issue: Images not loading
**Solution:**
- Verify `images/` folder is uploaded
- Check file names match (case-sensitive)
- Ensure `logo.png` exists in `images/` folder

### Issue: Styles not applying
**Solution:**
- Check `_next/static/` folder is uploaded completely
- Clear browser cache
- Verify all CSS files are present

---

## Updating the Website

To make changes:

1. Edit source files locally
2. Run `npm run build`
3. Upload only changed files from `out/` folder
4. OR replace entire `public_html/` content

---

## Performance Tips

1. **Enable Compression** in cPanel:
   - Go to "Optimize Website"
   - Enable "Compress All Content"

2. **Enable Browser Caching** via `.htaccess`:
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

3. **Use CDN** (optional):
   - Consider Cloudflare for additional speed
   - Free plan available

---

## Security Recommendations

1. Keep cPanel password secure
2. Enable SSL certificate (free via GoDaddy)
3. Regular backups through cPanel
4. Monitor access logs

---

## Support Contacts

- GoDaddy Support: https://www.godaddy.com/help
- Technical Issues: Check browser console for errors
- Domain Issues: Verify DNS settings in GoDaddy

---

## Next Steps After Deployment

1. ✅ Verify all pages work
2. ✅ Test WhatsApp integration
3. ✅ Test on mobile devices
4. ✅ Submit to Google Search Console
5. ✅ Set up Google Analytics (if needed)
6. ⏳ Build retirement calculator
7. ⏳ Add blog/content section (future)

---

**Deployment Date:** _________  
**Deployed By:** _________  
**Version:** 1.0.0
