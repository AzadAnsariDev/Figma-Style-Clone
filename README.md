# Figma Lite – A Simple Figma-Like Editor

This is a lightweight Figma-like design editor built using **HTML, Tailwind CSS, and Vanilla JavaScript**.  
The goal of this project was to understand how real design tools work internally, like canvas handling, layers, drag, resize, and export.

No frameworks, no external heavy libraries – everything is written from scratch.

---

## ✨ Features

- Create **Rectangles, Circles, Ovals, and Text**
- Select, drag, resize, and rotate elements
- Move elements using **mouse or arrow keys**
- Double click text to edit
- Change background color and text color
- Control text size from properties panel
- Layer panel for selecting elements
- Save canvas data in **localStorage**
- Reload keeps your previous work
- Export design as:
  - SVG
  - JSON
  - HTML
- Fake login system (for flow only)
- Custom cursor like Figma
- Fully responsive layout

---

## 🧠 Why this project

I built this project to:
- Learn how design tools like Figma actually work
- Practice DOM manipulation and state handling
- Understand canvas-style editors without using libraries
- Improve logical thinking and clean JavaScript

This is **not a clone**, it is a learning-focused implementation.

---

## 🛠 Tech Stack

- HTML
- Tailwind CSS
- Vanilla JavaScript
- LocalStorage
- Vercel (for deployment)

---

## 📁 Project Structure
FIGMA-LITE
│
├── index.html
├── style.css
├── script.js
│
├── images
│   ├── figmaCursor.svg
│   └── handCursor.svg
│
├── FigmaDesignPage
│   ├── figma.html
│   ├── figma.css
│   └── figma.js
│
└── tailwind.config.js

---

## 🚀 How to run locally

1. Clone the repo
2. Open `index.html` in browser
3. Click **Products → Figma Design**
4. Login with any email & password
5. Start designing

No build step required.

---

## ⚠️ Notes

- Login system is **fake**, only for UI flow
- This project focuses on **logic**, not production security

---

## 🙌 Final words

This project helped me understand how complex tools can be broken down into simple logic.  
Every feature was built step by step with clear intention.

If you are learning frontend or JavaScript, try building something like this once – it teaches a lot.

---

**Made with focus, mistakes, fixes, and learning.**
