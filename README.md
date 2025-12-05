# Cherry Hill Restaurant Feedback System

## Project Details
- Author: Harry Joseph
- Course: System Design CPAN 209
- Created: 2025-12-05
- Platform: Expo (React Native + TypeScript + Expo Router)
- Package Manager: npm
- Minimum React Native version (from scaffold): 0.81.x
- Routing: File‑based via `expo-router`

## Overview
Cherry Hill Restaurant Feedback System is a purpose-built UI/UX demo for Lab #10 All About System Feedback for restaurant owners Josh and Colleen. Action Confirmation, Input Error Messaging, and “Please Wait” Loading States The project Chairs to go farming (Philadelphia/NYC) introduces three main feedback states within their farm to table operation in both Philadelphia and New York City. This system models user interactions for daily produce inventory reporting and payroll software assistance, focusing on clear communication, interactivity and user-first design over full backend implementation, and is presented as a mobile interface via Expo Router. 

## Quick Download

**Get the complete project instantly:**

[![Download CherryHillRestaurantFeedback](https://img.shields.io/badge/Download-CherryHillRestaurantFeedback.zip-blue?style=for-the-badge&logo=download)](https://github.com/hjoseph777/CherryHillRestaurantFeedback/releases/download/v1/CherryHillRestaurantFeedback.zip)

## Live Demo
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://cherry-hill-restaurant-feedback.vercel.app)

*Complete Expo project with restaurant feedback demos ready to run*

## Important: Where your feedback system code lives
- The main dashboard is in [`app/(tabs)/index.tsx`](app/(tabs)/index.tsx) with restaurant branding and demo navigation
- The inventory success screen is in [`app/inventory-success.tsx`](app/inventory-success.tsx) with business intelligence metrics
- The payroll guidance system is in [`app/payroll-guidance.tsx`](app/payroll-guidance.tsx) with processing simulation
- The interactive feedback demo is in [`app/feedback-demo.tsx`](app/feedback-demo.tsx) with all feedback types

## File structure

```text
CherryHillRestaurantFeedback/
├── 📁 app/                          # Route definitions (file-based routing)
│   ├── 🧭 _layout.tsx               # Root layout (stack + theme provider)
│   ├── 🪟 modal.tsx                 # Modal screen example
│   ├── 🍅 inventory-success.tsx     # Produce report success screen
│   ├── 💰 payroll-guidance.tsx      # Payroll processing with guidance
│   ├── ⚡ feedback-demo.tsx         # Interactive feedback demonstrations
│   └── 🗂️ (tabs)/                   # Group (not in URL) for tab routes
│       ├── 🧭 _layout.tsx           # Bottom tab navigator config
│       ├── 🏠 index.tsx             # Main restaurant dashboard
│       └── 🔍 explore.tsx           # Restaurant resources navigation
│
├── 📁 components/                   # Reusable UI components
│   ├── 👋 hello-wave.tsx            # Animated wave / greeting
│   ├── 🖼️ parallax-scroll-view.tsx  # Parallax scroll wrapper
│   ├── ✨ themed-text.tsx           # Theme aware <Text>
│   ├── 🎨 themed-view.tsx           # Theme aware <View>
│   ├── 🔔 haptic-tab.tsx            # Haptic feedback tab item
│   ├── 🔗 external-link.tsx         # External link component
│   └── 📁 ui/                       # Lower-level UI helpers
│       ├── 📂 collapsible.tsx       # Expand / collapse container
│       ├── 🧩 icon-symbol.tsx       # Generic icon symbol
│       └── 🧩 icon-symbol.ios.tsx   # iOS specific icon variant
│
├── 📁 constants/
│   └── 🎛️ theme.ts                 # Color palette & tokens
│
├── 📁 hooks/                        # Hooks for theme & color scheme
│   ├── 🌗 use-color-scheme.ts       # Native color scheme detection
│   ├── 🌐 use-color-scheme.web.ts   # Web override implementation
│   └── 🎛️ use-theme-color.ts        # Themed color resolver
│
├── 📁 assets/
│   └── 🖼️ images/                   # Icons, splash, logos
│
├── 📁 scripts/
│   └── 🛠️ reset-project.js          # Reset scaffold utility
│
├── ⚙️ app.json                      # Expo configuration (name, icons)
├── 📦 package.json                  # Dependencies & scripts
├── 🧾 tsconfig.json                 # TypeScript compiler options
├── 🔍 eslint.config.js              # Lint rules
└── 📝 README.md                     # Documentation (this file)
```
---

*This project demonstrates modern restaurant management feedback patterns with cross-platform React Native implementation.*
