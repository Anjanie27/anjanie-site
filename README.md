# 🌐 Anjanie’s Website

Welcome! This is a simple **Next.js** website project.
Next.js is a tool that helps you build fast and modern websites using **React**.

---

## 🧩 What’s Inside

Here’s what the folders and files mean:

anjanie-website/
├── public/ ← Images and icons that show up on the website
├── src/app/ ← The main part of the website (your pages + styles)
│ ├── globals.css ← The file where you add your website’s colors and styles (we can also use tailwind for easier styling)
│ ├── favicon.ico ← The little icon shown in the browser tab
│ ├── layout.js ← Sets up the page layout that wraps around your content
│ └── page.js ← The main homepage code (what happens at the default link i.e. anjanie.ca)
├── package.json ← Lists the tools and libraries your project uses
├── .gitignore ← Tells Git which files to ignore when uploading to GitHub
├── README.md ← This file! Explains what the project is and how to use it

---

## 🚀 How to Run the Project

### 1️⃣ Open the project in VS Code
If you haven’t yet, open the folder called **anjanie-website** in **VS Code**.

### 2️⃣ Install the dependencies
In the VS Code terminal, type this and press Enter:
```bash
npm install
```

This downloads everything the website needs to run.

### 3️⃣ Start the website

Once that’s done, run:

```bash
npm run dev
```

You’ll see something like:
```bash
Local: http://localhost:3000
```
Click that link — your website is now running locally (i.e. only you can access it and only on this particular device)! 🎉

## ✏️ How to Edit the Homepage of the Site

Edit text and content:
Open src/app/page.js — that’s where your homepage lives.

Change the colors or fonts:
Go to src/app/globals.css.

Add images:
Drop them into the public/ folder, then use them in your pages like this:

```bash
<img src="/myphoto.png" alt="My Photo" />
```

## 💡 Helpful Tips

If your page doesn’t update, press Ctrl + S (or Cmd + S) to save your changes — it refreshes automatically.

The browser will usually reload itself when you edit something.

If the site breaks, you can stop the terminal (press Ctrl + C) and re-run npm run dev.

## 🧠 What’s Next

Once you get comfortable, you can try:

Adding more pages by creating new files (like about.js) inside src/app.
Learning basic HTML, CSS, and React — these are what Next.js is built on.

## To push/pull on git:
git status
git add . 
git commit -m "[insert message]"
git push

git pull


## Animated UI refresh

This version adds a more polished, interactive feel across the site:

- animated gradient backgrounds and gradient text
- glassmorphism cards and soft floating background orbs
- improved sticky navbar with active page states and animated mobile menu
- redesigned landing page with interactive spotlight, hover effects, and focus cards
- upgraded experience cards with animated timeline styling
- interactive artwork gallery with flip cards, captions, and hover states
- refreshed blog index and blog post pages
- upgraded contact form styling and feedback states

### Run locally

```bash
npm install
npm run dev
```

For the contact form, copy `.env.example` to `.env.local` and fill in your EmailJS values.

## Trading dashboard

Open `/trading` to use the live intraday workspace. It includes:

- 1-minute TradingView candles with VWAP, EMA, RSI, and MACD
- quick ticker switching and a live US market-gainers screener
- manual high/low logging saved in the browser with CSV export
- an on-page dashboard manual
- a charting-signal cheat sheet for trend, momentum, volume, breakouts, and risk checks
