# Youssef Mohamed - Personal Portfolio

Welcome to the Youssef Mohamed Portfolio starter project! The HTML and CSS design is fully complete — your task is to bring it to life with JavaScript.

## 🎯 Project Overview

This is a modern, fully responsive personal portfolio website for a Frontend Developer. The HTML structure and Tailwind CSS styling are ready — you need to implement all the interactive JavaScript functionality.

The portfolio includes:

* Animated Hero Section with tech stack badges
* About section with terminal-style code card
* Skills section with progress bars
* Filterable Portfolio/Projects gallery
* Interactive Experience Timeline
* Testimonials Carousel
* Statistics counters
* Contact Form with validation
* Dark/Light Mode toggle
* Customizable Theme Colors & Fonts sidebar
* Scroll-to-Top button
* Fully responsive mobile navigation

## 📁 Project Structure

```text
portfolio/
├── index.html              # Main HTML file (ready)
├── README.md               # This file
├── css/
│   ├── all.min.css         # Font Awesome 7 Icons (ready)
│   └── style.css           # Tailwind CSS v4 + Custom Styles (ready)
├── js/
│   └── index.js            # Main JavaScript (implement here)
└── imgs/
    └── (various images)    # Assets (ready)
```

## 🚀 Getting Started

1. Open `index.html` in your browser to see the static design
2. Start implementing the JavaScript in `js/index.js`
3. Begin with the **Navbar Active Link** and **Theme Toggle**
4. Then implement the **Portfolio Filtering** and **Testimonials Carousel**
5. Finally, add the **Settings Sidebar** and **Contact Form Validation**

## ✅ Tasks to Complete

### Level 1: Core Functionality

* [ ] **Navbar Active Link**: Highlight the current section link while scrolling
* [ ] **Theme Toggle**: Implement Dark/Light mode switch and persist to `localStorage`
* [ ] **Scroll to Top**: Show/hide button based on scroll position using `IntersectionObserver`
* [ ] **Copyright Year**: Auto-update the footer year dynamically

### Level 2: Interactivity

* [ ] **Portfolio Filtering**: Filter projects by category (All, Web, App, Design, E-commerce)
* [ ] **Testimonials Carousel**: Implement next/prev navigation and dot indicators
* [ ] **Mobile Navbar**: Implement hamburger menu toggle for mobile screens
* [ ] **Settings Sidebar**: Open/close the customization panel with gear button

### Level 3: Advanced Features

* [ ] **Contact Form Validation**: Validate name, email, and project details with error messages
* [ ] **Custom Select Dropdowns**: Implement custom styled dropdowns for project type and budget
* [ ] **Theme Color Customizer**: Allow users to switch between 6 color themes (Purple Blue, Pink Orange, Green Emerald, etc.)
* [ ] **Font Switcher**: Allow users to switch between 3 Arabic fonts (Tajawal, Alexandria, Cairo)
* [ ] **Persist Preferences**: Save theme color and font choices to `localStorage`
* [ ] **Reset Settings**: Implement reset button to restore defaults

### Level 4: Polish & Performance

* [ ] **Carousel Resize Handling**: Update carousel calculations on window resize
* [ ] **Form Success Popup**: Show animated success message after form submission
* [ ] **Keyboard Accessibility**: Ensure all interactive elements are keyboard accessible
* [ ] **Reduced Motion**: Respect `prefers-reduced-motion` media query

## 🎨 Key HTML Elements

### Navigation & Theme

| Element ID             | Purpose                     |
| ---------------------- | --------------------------- |
| `#header`              | Fixed navigation bar        |
| `#navToggler`          | Mobile menu toggle button   |
| `#navLinks`            | Navigation links container  |
| `#theme-toggle-button` | Dark/Light mode switch      |
| `#scroll-to-top`       | Back to top floating button |

### Hero Section

| Element ID     | Purpose                        |
| -------------- | ------------------------------ |
| `#heroSection` | Main hero/banner area          |
| `#hero-title`  | Main heading for accessibility |

### Portfolio Section

| Element ID           | Purpose                   |
| -------------------- | ------------------------- |
| `#portfolio-filters` | Filter buttons container  |
| `.portfolio-filter`  | Individual filter buttons |
| `#portfolio-grid`    | Projects grid container   |
| `.portfolio-item`    | Individual project cards  |

### Testimonials Section

| Element ID               | Purpose                      |
| ------------------------ | ---------------------------- |
| `#testimonials-carousel` | Carousel track container     |
| `.testimonial-card`      | Individual testimonial cards |
| `#next-testimonial`      | Next slide button            |
| `#prev-testimonial`      | Previous slide button        |
| `#carouselIndicators`    | Dot indicators container     |
| `.carousel-indicator`    | Individual dot buttons       |

### Settings Sidebar

| Element ID           | Purpose                          |
| -------------------- | -------------------------------- |
| `#settings-toggle`   | Gear icon button to open sidebar |
| `#settings-sidebar`  | Customization panel              |
| `#close-settings`    | Close sidebar button             |
| `#theme-colors-grid` | Color theme buttons container    |
| `#fontOptions`       | Font selection buttons container |
| `#reset-settings`    | Reset to defaults button         |

### Contact Form

| Element ID               | Purpose                   |
| ------------------------ | ------------------------- |
| `#full-name`             | Name input field          |
| `#email`                 | Email input field         |
| `#phone`                 | Phone input field         |
| `#project-details`       | Project details textarea  |
| `#sendBtn`               | Submit button             |
| `.custom-select-wrapper` | Custom dropdown wrappers  |
| `.custom-options`        | Dropdown options lists    |
| `.error-msg`             | Validation error messages |

## 💡 Tips

* **Start Simple**: First implement the navbar active link and theme toggle
* **Use `localStorage`**: Save theme mode (`SideTheme`), colors (`theme`), and font (`font`) preferences
* **CSS Classes**: The project uses Tailwind v4 with custom CSS variables (`--color-primary`, `--color-secondary`, `--color-accent`)
* **Dark Mode**: Toggle the `.dark` class on the `<html>` element
* **Portfolio Animation**: Use `myhidden` (opacity) and `myd-none` (display) classes for filter transitions
* **Carousel Math**: Calculate `itemWidth` from card `offsetWidth`, update on resize
* **Form Validation**: Use blur events for real-time validation and regex for email checking
* **Custom Selects**: Track `activeCustomSelect` globally and close on outside click
* **Check Console**: Look for TODO comments and test your API calls in the console first
* **RTL Support**: The site is Arabic (RTL) — ensure transforms and directions account for this

## 🛠️ Tech Stack

* **HTML5** — Semantic markup with ARIA accessibility labels
* **Tailwind CSS v4** — Utility-first CSS framework
* **Vanilla JavaScript (ES6+)** — No frameworks, pure JS
* **Font Awesome 7** — Icons
* **Google Fonts** — Alexandria, Cairo, Tajawal

## 📝 Notes

* The project uses `type="module"` implicitly via script tags (vanilla JS with modern syntax)
* All animations respect `prefers-reduced-motion` for accessibility
* The design is fully responsive — test on mobile, tablet, and desktop
* Images are optimized WebP format with lazy loading
* The contact form is frontend-only (no backend) — show a success popup on valid submission

---

**Happy Coding! 🚀**

