# Pankh Technology Website

**Tagline:** Har ummeed ko Pankh, har nivesh mein vishwas!  
**Mission:** Democratizing wealth creation across India — particularly in underserved Tier 2/3 cities.

---

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

### Production Build
```bash
npm run build
```

This creates an optimized static export in the `out/` folder.

---

## 📦 Deployment to GoDaddy cPanel

### Step 1: Build the Static Site
```bash
npm run build
```

This generates a static website in the `out/` directory.

### Step 2: Upload to cPanel

1. **Login to your GoDaddy cPanel**
2. **Open File Manager**
3. **Navigate to `public_html/`** (or your domain's root directory)
4. **Upload all files from the `out/` folder**
   - You can zip the `out/` folder first, upload the zip, then extract it in cPanel
   - OR upload files/folders directly via File Manager

### Step 3: Update WhatsApp Number

Before deploying, replace `YOUR_WHATSAPP_NUMBER` in these files:
- `components/Header.tsx` (2 locations)
- `components/Footer.tsx` (1 location)
- `app/page.tsx` (2 locations)
- `app/services/page.tsx` (2 locations)
- `app/contact/page.tsx` (3 locations)

Replace with your actual WhatsApp number in international format (e.g., `919876543210` for +91 98765 43210)

### Step 4: Update Contact Information

Update the following in `components/Footer.tsx` and `app/contact/page.tsx`:
- Email: `info@pankh.tech` (already correct)
- Phone: Replace `+91 XXXX XXXXXX` with your actual number

---

## 📁 Project Structure

```
pankh-website/
├── app/
│   ├── page.tsx              # Home page
│   ├── about/
│   │   └── page.tsx          # About page
│   ├── services/
│   │   └── page.tsx          # Services page
│   ├── contact/
│   │   └── page.tsx          # Contact page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Header.tsx            # Navigation header
│   └── Footer.tsx            # Footer
├── public/
│   └── images/
│       └── logo.png          # Pankh logo
├── next.config.js            # Next.js config
├── tailwind.config.js        # Tailwind CSS config
└── package.json
```

---

## 🎨 Brand Colors

- **Primary Navy:** `#1A3C6E`
- **Accent Gold:** `#D4A017`
- **Navy Light:** `#2A5088`
- **Gold Light:** `#E4B827`

---

## 📄 Pages Overview

### Home (`/`)
- Hero section with tagline
- Market opportunity stats
- Mission statement
- Core values
- Target audience personas
- CTA sections

### About (`/about`)
- Company overview
- Vision & Mission
- Core values
- Market opportunity
- Competitive positioning

### Services (`/services`)
- Retirement Planning details
- Future Planning details
- How we work process
- Why choose Pankh

### Contact (`/contact`)
- Contact form (integrates with WhatsApp)
- Contact information
- Office hours
- Direct WhatsApp button

---

## ✨ Features

✅ Fully responsive (mobile, tablet, desktop)  
✅ SEO optimized  
✅ Fast loading (static export)  
✅ WhatsApp integration for leads  
✅ Contact form (sends via WhatsApp)  
✅ Hindi-first branding  
✅ Tier 2/3 India focused content  

---

## 🔧 Future Integration Points

### Retirement Calculator (Coming Soon)
The "Retirement Calculator" button is currently disabled with "Coming Soon" text. To integrate:

1. Create the calculator component
2. Replace the button in:
   - `app/page.tsx` (line ~50)
   - `app/services/page.tsx` (line ~103)
3. Add route `/calculator` if standalone page

---

## 📱 WhatsApp Integration

The contact form currently redirects to WhatsApp with pre-filled message. The form data is formatted and sent via WhatsApp Web/App.

**To customize:**
- Edit `app/contact/page.tsx`
- Modify the `whatsappMessage` template
- Update form fields as needed

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** Static Export (for cPanel)
- **Fonts:** Poppins, Noto Sans (Google Fonts)

---

## 📞 Support

For technical issues with the website:
1. Check the browser console for errors
2. Ensure all files are uploaded correctly
3. Verify .htaccess is configured for clean URLs (if needed)

---

## 📝 License

© 2024 Pankh Technology Pvt Limited. All rights reserved.

---

**Built with ❤️ for India's next 100 million investors**
