# Changelog - Cardputer Pro

All notable changes to the Cardputer Pro plugin will be documented in this file.

## [2.0.0] - 2025-01-15 - COMMERCIAL RELEASE 🚀

### 🎉 Major Features
- **Multi-Screen Navigation System** - Export multiple screens with automatic state machine
- **Smart Component Detection** - Auto-detect buttons, menus, inputs, and interactive elements
- **Image to Byte Array Conversion** - Automatic PNG/JPG to C++ PROGMEM arrays
- **Professional Multi-Tab UI** - Export, Settings, Preview, and About tabs
- **Live Preview System** - See detected screens and components before export
- **Memory Optimization** - Toggle to reduce code size and RAM usage
- **Figma Variables Support** - Convert design tokens to #define constants

### ✨ Enhanced Features
- **Three Export Modes:**
  - Single Screen - Simple static export
  - Multi-Screen - Full navigation with Fn+Tab switching
  - Complete Project - PlatformIO ready structure
  
- **Advanced Code Generation:**
  - Optional comments for readability
  - Debug serial output
  - Proper PROGMEM usage for images
  - Modular function structure

- **Intelligent Rendering:**
  - Respects fill and stroke visibility
  - Handles nested frames properly
  - Optimizes rounded rectangles for buttons
  - Efficient color conversion to RGB565

### 🎨 UI Improvements
- Gradient header with branding
- Statistical dashboard (screens, components, code size)
- Export options with descriptions
- Progress bar for exports
- Success/Warning/Error notifications
- Professional color scheme

### 🔧 Settings & Configuration
- Customizable screen dimensions
- Code generation preferences
- Project structure options
- Reset to defaults function

### 📊 Analytics & Stats
- Real-time screen count
- Component detection count
- Generated code size in KB
- Component breakdown by type

### 🐛 Bug Fixes
- Fixed RGB565 color conversion accuracy
- Improved text size estimation
- Better handling of invisible layers
- Proper coordinate calculation for nested elements

### 📚 Documentation
- Comprehensive README.md
- Quick Start Guide
- Best practices guide
- Troubleshooting section

---

## [1.0.0] - 2025-01-14 - Initial Release

### Features
- Basic single-screen export
- Rectangle, circle, text, line support
- Simple color conversion
- Basic UI with export button

### Known Limitations
- Single screen only
- No component detection
- No image support
- Basic UI

---

## Upcoming in v2.1

### Planned Features
- 🔄 Custom Font Support - Import and use custom fonts
- 🔄 Animation Generation - Frame-by-frame animation code
- 🔄 Real-time Preview - See design rendered in simulator
- 🔄 GitHub Integration - Push code directly to repo
- 🔄 Component Library - Pre-built components
- 🔄 Template System - Start from templates
- 🔄 Keyboard Shortcuts - Faster workflow
- 🔄 Export History - Track previous exports

### Improvements
- Faster image processing
- Better component detection
- Enhanced memory optimization
- More export options

---

## Upcoming in v2.2

### Planned Features
- 📋 OTA Update Support - Generate OTA-ready firmware
- 📋 Collaborative Features - Share designs with team
- 📋 Cloud Sync - Save settings across devices
- 📋 Advanced Animations - Transition effects
- 📋 Touch Support - For devices with touch screens
- 📋 Theme System - Dark/light mode support

---

## Version Naming

- **Major (2.x.x)** - Breaking changes, major new features
- **Minor (x.1.x)** - New features, backwards compatible
- **Patch (x.x.1)** - Bug fixes, small improvements

## Feedback & Requests

We love hearing from our users! Request features or report bugs:
- Email: support@cardputer-pro.com
- Discord: [community link]
- GitHub Issues: [issues link]

---

**Current Version: 2.0.0**  
**Release Date: January 15, 2025**  
**License: Commercial**
