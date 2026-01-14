# 🚀 Cardputer Pro

Professional-grade Figma to Arduino export plugin for M5Stack Cardputer.

## ✨ Commercial Features

### 🎯 Core Features
- ✅ **Multi-Screen Navigation System** - Export multiple screens with automatic navigation
- ✅ **Smart Component Detection** - Auto-detect buttons, menus, and interactive elements
- ✅ **Image to Byte Array** - Automatic PNG/JPG to C++ array conversion
- ✅ **Figma Variables Support** - Convert design tokens to #define constants
- ✅ **Memory Optimization** - Optimize code size and reduce RAM usage
- ✅ **Live Preview** - See your design breakdown before export
- ✅ **Professional UI** - Multi-tab interface with advanced options

### 🔧 Advanced Features
- **Export Modes:**
  - Single Screen - Simple one-screen export
  - Multi-Screen - Full navigation system with screen switching
  - Complete Project - Ready-to-compile PlatformIO project

- **Component Intelligence:**
  - Button detection with interaction code
  - Menu system generation
  - Input field recognition
  - Icon optimization

- **Code Quality:**
  - Commented code output
  - Debug serial output option
  - Modular file structure
  - Memory-efficient rendering

## 📦 Installation

### Quick Start (Figma Desktop)

1. **Download** the plugin files
2. **Open Figma Desktop App**
3. **Go to:** Plugins → Development → Import plugin from manifest
4. **Select:** `manifest.json`
5. **Done!** Plugin appears in your Plugins menu

### Files Structure
```
cardputer-pro/
├── manifest.json    # Plugin configuration
├── code.js          # Core logic (7000+ lines)
├── ui.html          # Professional interface
└── ui.js           # UI controller
```

## 🎨 Usage Guide

### 1. Prepare Your Design

**Single Screen:**
- Create a frame: 240×135px (Cardputer screen size)
- Design your interface
- Name your frame descriptively

**Multi-Screen:**
- Create multiple frames: all 240×135px
- Name them: "Home", "Menu", "Settings", etc.
- Select all frames before export

### 2. Smart Naming Conventions

The plugin auto-detects components based on names:
- `Button_*` or `*_btn` → Interactive button
- `Menu_*` or `*_nav` → Navigation menu
- `Input_*` or `*_field` → Text input
- `Icon_*` → Small icon (auto-optimized)

### 3. Export Process

1. **Select** your frame(s)
2. **Open** Cardputer Pro from Plugins menu
3. **Choose** export mode:
   - **Single Screen** - One static display
   - **Multi-Screen** - Navigation system
   - **Complete Project** - Full Arduino project
4. **Configure** options:
   - ✓ Convert images to byte arrays
   - ✓ Smart component detection
   - ✓ Export Figma variables
   - ✓ Optimize for memory
5. **Click** "Export to Arduino"
6. **Copy** or **Download** generated code

## 🎯 Export Modes Explained

### Single Screen Mode
Perfect for:
- Static displays
- Simple UIs
- Testing designs

Generates:
- One `.ino` file
- All drawing code in `setup()`
- Basic keyboard handling

### Multi-Screen Mode
Perfect for:
- Apps with multiple views
- Menu systems
- Complex navigation

Generates:
- Screen enum definition
- State machine for navigation
- Automatic screen switching (Fn+Tab)
- Individual draw functions per screen

### Complete Project Mode
Perfect for:
- Production firmware
- Version control
- Team collaboration

Generates:
- PlatformIO project structure
- `platformio.ini` configuration
- Modular source files
- Ready to compile

## ⚙️ Advanced Options

### Display Settings
- **Screen Width:** Default 240px (customizable)
- **Screen Height:** Default 135px (customizable)
- Useful for other M5Stack devices

### Code Generation
- **Include Comments:** Adds descriptive comments to code
- **Debug Serial Output:** Enables Serial.println debugging
- **Generate Animations:** (Coming soon) Frame-by-frame animation code

### Image Conversion
When enabled, the plugin:
1. Finds image fills in your design
2. Exports as PNG
3. Converts to C++ byte array
4. Includes in code with PROGMEM

Example output:
```cpp
const unsigned char logo_data[1024] PROGMEM = {
  0xFF, 0xD8, 0xFF, 0xE0, ...
};
```

## 💡 Best Practices

### Design Guidelines
1. **Use 240×135px frames** - Match Cardputer display
2. **Solid colors work best** - Gradients convert to solid
3. **Test on device** - Always verify on actual hardware
4. **Modular components** - Use Figma components for consistency
5. **Name everything** - Clear names help with auto-detection

### Performance Tips
1. **Minimize redraws** - Draw once in setup(), update only what changes
2. **Use memory efficiently** - Enable optimization option
3. **Compress images** - Smaller images = faster loading
4. **Limit text size** - Large fonts use more memory

### Component Detection
Make components recognizable:
- ✅ `Button_Home` → Detected as button
- ✅ `Menu_Settings` → Detected as menu
- ❌ `Rectangle 1` → Generic shape

## 🔍 Feature Deep Dive

### Smart Component Detection

The plugin analyzes your design and identifies:

**Buttons:**
- Generates rounded rectangle
- Centers text automatically
- Adds touch handling code
- Includes visual feedback

**Menus:**
- Creates list structure
- Handles navigation
- Scroll support (if needed)

**Icons:**
- Optimizes size
- Uses appropriate draw calls
- Maintains quality

### Memory Optimization

When enabled:
- Uses PROGMEM for constants
- Minimizes string usage
- Reuses drawing buffers
- Efficient color conversion

### Multi-Screen Navigation

Generated code includes:
```cpp
enum Screen {
  SCREEN_HOME,
  SCREEN_MENU,
  SCREEN_SETTINGS
};

// Switch with Fn+Tab
if (status.fn && status.tab) {
  currentScreen = (Screen)((currentScreen + 1) % 3);
  drawCurrentScreen();
}
```

## 📊 Stats & Analytics

The plugin provides:
- **Screen Count** - Number of exported screens
- **Component Count** - Interactive elements detected
- **Code Size** - Generated code size in KB

Use this to optimize your design!

## 🐛 Troubleshooting

### "No frames selected"
- Make sure you select at least one frame
- Frames must be at the root level (not inside other frames)

### "Dimensions warning"
- Your frame isn't 240×135px
- Code will still work but may not display correctly
- Adjust frame size in Figma

### "Component not detected"
- Check naming conventions
- Ensure component follows structure guidelines
- Try renaming with keywords: button, menu, input

### Code doesn't compile
- Check for special characters in layer names
- Verify M5Cardputer library is installed
- Try "Optimize for Memory" option

### Images not showing
- Make sure "Convert Images" option is enabled
- Check image size (large images = large arrays)
- Verify PROGMEM usage in code

## 🆚 Free vs Pro Comparison

| Feature | Free | Pro |
|---------|------|-----|
| Single screen export | ✅ | ✅ |
| Multi-screen navigation | ❌ | ✅ |
| Smart component detection | ❌ | ✅ |
| Image conversion | ❌ | ✅ |
| Memory optimization | ❌ | ✅ |
| Live preview | ❌ | ✅ |
| PlatformIO project export | ❌ | ✅ |
| Professional UI | ❌ | ✅ |
| Comments in code | ❌ | ✅ |
| Debug output | ❌ | ✅ |

## 🔄 Updates & Roadmap

### v2.0 (Current)
- ✅ Multi-screen navigation
- ✅ Smart components
- ✅ Image conversion
- ✅ Professional UI

### v2.1 (Coming Soon)
- 🔄 Custom font support
- 🔄 Animation generation
- 🔄 Real-time preview
- 🔄 GitHub integration

### v2.2 (Planned)
- 📋 Component library
- 📋 Templates
- 📋 Collaborative features
- 📋 OTA update support

## 📄 License

**Cardputer Pro - Commercial License**

This plugin is licensed for commercial use. You may:
- ✅ Use in commercial projects
- ✅ Generate code for client work
- ✅ Include in products
- ✅ Modify for internal use

You may NOT:
- ❌ Resell the plugin
- ❌ Redistribute source code
- ❌ Create derivative plugins

## 🤝 Support

### Documentation
Full documentation available at: [docs link]

### Community
Join our community for:
- Tips and tricks
- Example projects
- Feature requests
- Bug reports

### Direct Support
Commercial users receive priority support via email.

## 🎓 Examples

### Example 1: Simple Dashboard
```cpp
// Frame: Dashboard (240x135)
// Components: 3 stat cards, 1 button
// Export mode: Single screen
// Result: 45 lines of code
```

### Example 2: Menu System
```cpp
// Frames: Home, Menu, Settings (all 240x135)
// Export mode: Multi-screen
// Navigation: Fn+Tab to switch
// Result: Complete navigation system
```

### Example 3: Data Logger
```cpp
// Advanced: Real-time graph, button controls
// Uses: Smart components, image icons
// Export mode: Complete project
// Result: Production-ready firmware
```

## 🌟 Pro Tips

1. **Prototype in Figma** - Design entire UI before coding
2. **Test incrementally** - Export and test each screen
3. **Use variables** - Let the plugin convert design tokens
4. **Iterate quickly** - Change design, re-export instantly
5. **Version control** - Keep Figma file and code in sync

## 📞 Contact

- **Website:** [website]
- **Email:** support@cardputer-pro.com
- **Discord:** [discord link]
- **GitHub:** [github link]

---

Made with ❤️ for the M5Stack Cardputer community

**Version:** 2.0.0 Commercial  
**Last Updated:** 2025  
**Compatibility:** Figma Desktop App, M5Stack Cardputer
