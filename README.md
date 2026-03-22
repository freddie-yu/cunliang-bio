<div align="center">

# Welcome to Cunliang Bio!

### *A Multi-Theme Personal Website*
[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://your-deployment-url.vercel.app)
[![React](https://img.shields.io/badge/react-19.2.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/typescript-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/tailwind-css-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

---

### 🎭 What is This?

A fully interactive web-based OS simulator that serves as my personal portfolio. Three distinct themes, one chill experience:

- **🎨 Retro/Indie** - Hand-drawn aesthetic with personality
- **🍎 macOS** - Sleek, glassy, and familiar
- **🐧 Linux** - Terminal-first minimalism

Choose your vibe at boot, explore projects, contact me, or mess around in a functional terminal. It's a portfolio, but make it *fun*.

---

## ✨ Features That Actually Work

### Core Systems
- **Multi-boot selector** with three distinct OS themes
- **Authentic boot sequences** (macOS progress bar, Linux systemd logs, retro terminal lock)
- **Draggable, resizable windows** with proper z-index management
- **Functional terminal** with file system, command history, tab completion, and easter eggs
- **Spotlight search** (⌘K) for quick app launching
- **Persistent storage** using in-memory state 

### Apps & Content
- **About Me** - Three different layouts per theme
- **Projects** - Showcase with tech stacks and live links
- **Contact** - Theme-aware mail composer
- **Settings** - Theme switcher + wallpaper gallery (macOS only)
- **Terminal** - Full interactive shell with `ls`, `cd`, `cat`, `neofetch`, `cmatrix`, and more

### Visual Goodies
- CRT screen effects (power on/off animations)
- Matrix rain Easter egg (`cmatrix` command)
- Smooth Framer Motion animations
- Responsive design (mobile-friendly windows)
- Custom scrollbars per theme
- Toast notifications with sass

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (because we're not living in 2019)
- npm or yarn

### Installation

```bash
# Clone this bad boy
git clone https://github.com/freddie-yu/cunliang-bio.git
cd cunliang-bio

# Install dependencies
npm install

# Fire it up locally
npm run dev
```

Visit `http://localhost:3000` and prepare for the boot selector.

### Build for Production

```bash
npm run build
```

Outputs to `dist/` - ready for Vercel, Netlify, or wherever you host your digital masterpieces.

---

## 🎮 User Guide

### Boot Process
1. **Select your OS** - Retro, macOS, or Linux
2. **Watch the boot sequence** (or skip with a click on Linux)
3. **Explore the desktop** - double-click apps, drag windows, use the dock

### Keyboard Shortcuts
- `⌘/Ctrl + K` - Open Spotlight search
- `Escape` - Close Spotlight or menus
- `Arrow Keys` - Navigate terminal command history
- `Tab` - Autocomplete terminal commands

### Terminal Commands
Try these in the Terminal app:

```bash
help           # List all commands
ls             # List directory contents
cd [dir]       # Navigate folders
cat [file]     # Read file contents
neofetch       # System information (with ASCII art)
cmatrix        # Wake up, Neo
open [app]     # Launch apps (e.g., open contact)
clear          # Clear terminal
whoami         # Who are you, really?
```

### Hidden Features
- Click the power button in Retro theme for CRT shutdown effect
- Try `sudo rm -rf /` in the terminal (don't worry, it's safe)
- Hold down arrow keys in terminal to cycle command history
- "About This Mac" menu item in macOS theme

---

## 🏗️ Project Structure

```
cunliang-bio/
├── components/
│   ├── apps/              # Individual applications
│   │   ├── AboutApp.tsx
│   │   ├── ProjectsApp.tsx
│   │   ├── ContactApp.tsx
│   │   ├── SettingsApp.tsx
│   │   └── TerminalApp.tsx
│   ├── OS/                # Operating system components
│   │   ├── Window.tsx     # Window manager
│   │   └── Spotlight.tsx  # Search interface
│   ├── BootSelector.tsx   # Theme selection screen
│   ├── BootSequence.tsx   # Boot animations
│   ├── Desktop.tsx        # Main desktop environment
│   └── TerminalLock.tsx   # Retro boot screen
├── utils/
│   └── assetPaths.ts      # Asset management
├── App.tsx                # Main app logic
├── config.ts              # User profile & content
├── types.ts               # TypeScript definitions
└── index.css              # Global styles
```

---

## 🎨 Customization

### Update Your Info

Edit `config.ts` to personalize:

```typescript
export const userProfile = {
  name: "Your Name",
  role: "Your Title",
  email: "your@email.com",
  // ... more fields
};

export const projects = [
  {
    title: "Cool Project",
    description: "What it does",
    tags: ["React", "TypeScript"],
    link: "https://github.com/...",
    color: "bg-blue-100"
  },
  // Add more projects
];
```

### Change Wallpapers

Add wallpaper URLs in `components/apps/SettingsApp.tsx`:

```typescript
const WALLPAPERS = [
  { name: 'Your Wallpaper', url: 'https://...' },
  // Add more
];
```

### Modify Terminal File System

Edit the mock file system in `components/apps/TerminalApp.tsx`:

```typescript
const fileSystem: Record<string, FileSystemItem> = {
  'root': {
    name: 'root',
    type: 'folder',
    children: [
      // Customize folders and files
    ]
  }
};
```

---

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Vite** - Build tool
- **Lucide React** - Icons

---

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

The `vercel.json` config is already set up for SPA routing.

### Other Platforms

Build first, then deploy the `dist/` folder:

```bash
npm run build
# Upload dist/ to your hosting
```

---


## 🤝 Contributing

Found a bug? Want to add a feature? Cool.

1. Fork the repo
2. Create a branch (`git checkout -b feature/your-thing`)
3. Commit changes (`git commit -m 'Add your thing'`)
4. Push (`git push origin feature/your-thing`)
5. Open a PR

---


## 🙏 Acknowledgments

- Inspired by every OS simulator that came before
- Built with too much coffee and not enough sleep
- Special thanks to the React, Tailwind, and Framer Motion teams
- ASCII art generated by yours truly

---


<div align="center">
  
**Made with ☕ and keyboard violence**

*Version 1.0.5 - "It Works On My Machine"*

</div>
