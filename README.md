# Figma Lite – Web Design Editor

## Project Idea
Figma Lite is a lightweight, browser-based design editor inspired by Figma.  
It allows users to create, select, move, resize, and delete shapes and text
elements inside a canvas using simple mouse interactions.

---

## How the Project Was Built
This project was built using pure HTML, Tailwind CSS, and Vanilla JavaScript.
The application is divided into a landing page and a main editor page to keep
the structure clean and organized.  
JavaScript handles all canvas interactions, tool switching, and state
management, while Tailwind CSS is used for fast and responsive UI styling.

---

## Logic / Approach
A state-based approach was used to manage the editor behavior.  
The state keeps track of the active tool, selected element, dragging and
resizing status, and text editing mode.  
Mouse events (mousedown, mousemove, mouseup) are used to control element
creation, movement, resizing, and selection within canvas boundaries only.
Each element is dynamically created and managed inside the canvas to avoid
unwanted actions outside the editor.

---

## Features
- Rectangle tool (create, move, resize, delete)
- Text tool with edit and save behavior
- Move tool for selecting and dragging elements
- Canvas boundary restrictions
- Layers panel with auto-naming
- Properties panel for width, height, and color
- Keyboard delete support
- Responsive layout

---

## Tech Stack
- HTML
- Tailwind CSS
- JavaScript (Vanilla)
- GitHub (Version Control)
- Vercel (Deployment)

---

## Time Taken
Approximately 2 days to design, develop, test, and refine the project.

---

## AI Tools Used
ChatGPT was used for understanding logic, debugging issues, improving code
structure, and optimizing user interactions. I tried my best to make logics
but canvas was purely new logics for me, so i used Chatgpt to see logic and 
then understand how it will work and then put it in my code.

---

## Live Demo
Deployed on Vercel:  
👉 https://figma-style-clone.vercel.app

---

## GitHub Repository
👉 https://github.com/azadansaridev/figma-style-clone

## 🛠 Tech Stack

- HTML
- Tailwind CSS
- Vanilla JavaScript
- LocalStorage
- Vercel (for deployment)

---

## 📁 Project Structure
```
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
```

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
