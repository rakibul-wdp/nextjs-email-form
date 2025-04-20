# 📬 Contact Form (Next.js + EmailJS)

A simple, modern contact form built with **Next.js**, **EmailJS**, and **TypeScript**. Users can send messages directly to your email using EmailJS without a backend server.

---

## ✨ Features

- ✅ Client-side form validation
- 📩 Email delivery via [EmailJS](https://www.emailjs.com/)
- 🔥 Toast notifications for success & error

---

## 🛠️ Technologies

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- EmailJS
- React Toastify

---

## ⚙️ Environment Variables

Create a `.env` file in the root and add:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev
```

---

## 📁 Folder Structure

```
components/
  ├── ContactForm.tsx
  ├── FormField.tsx
  └── SubmitButton.tsx
app/
  └── page.tsx
```

---

## 🧠 Author

**Md. Rakibul Islam**  
[🔗 YouTube Channel](https://www.youtube.com/@rakibul-wdp) | [🌐 Portfolio](https://rakibul-wdp.vercel.app)
