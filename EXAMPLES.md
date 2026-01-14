# 🎓 Advanced Examples & Tutorials

## Table of Contents
1. [Smart Button Detection](#smart-button-detection)
2. [Multi-Screen Navigation](#multi-screen-navigation)
3. [Image Integration](#image-integration)
4. [Memory Optimization](#memory-optimization)
5. [Custom Interactions](#custom-interactions)
6. [Production Workflow](#production-workflow)

---

## 1. Smart Button Detection

### Basic Button
The plugin auto-detects components named with "button" or "btn".

**Figma Design:**
```
Frame: Button_Home (80×30px)
├─ Rectangle (rounded corners: 4px)
│  Color: #667eea
├─ Text: "Home"
   Color: white, center aligned
```

**Generated Code:**
```cpp
void drawButton() {
  // Interactive Button: Button_Home
  M5Cardputer.Display.fillRoundRect(10, 50, 80, 30, 4, 0x6B5F);
  M5Cardputer.Display.drawRoundRect(10, 50, 80, 30, 4, 0xFFFF);
  M5Cardputer.Display.setCursor(25, 60);
  M5Cardputer.Display.print("Home");
}
```

### Interactive Button with Handler
**Add to your code:**
```cpp
void handleButton() {
  if (M5Cardputer.Keyboard.isPressed()) {
    Keyboard_Class::KeysState status = M5Cardputer.Keyboard.keysState();
    
    if (status.enter) {
      // Button pressed!
      M5Cardputer.Display.fillScreen(0x0000);
      drawHomeScreen();
    }
  }
}

void loop() {
  M5Cardputer.update();
  handleButton();
  delay(10);
}
```

---

## 2. Multi-Screen Navigation

### Design Structure
```
Project: Dashboard App
├─ Frame: Screen_Home (240×135)
│  └─ Welcome message
├─ Frame: Screen_Menu (240×135)
│  └─ Menu options
├─ Frame: Screen_Settings (240×135)
│  └─ Settings UI
```

### Export Process
1. Select all 3 frames (Shift+Click)
2. Export mode: "Multi-Screen Navigation"
3. Export

### Generated Navigation
```cpp
enum Screen {
  SCREEN_HOME,
  SCREEN_MENU,
  SCREEN_SETTINGS
};

Screen currentScreen = SCREEN_HOME;

void drawCurrentScreen() {
  M5Cardputer.Display.fillScreen(0x0000);
  
  switch (currentScreen) {
    case SCREEN_HOME:
      drawScreenHome();
      break;
    case SCREEN_MENU:
      drawScreenMenu();
      break;
    case SCREEN_SETTINGS:
      drawScreenSettings();
      break;
  }
}

// Navigation in loop()
if (status.fn && status.tab) {
  currentScreen = (Screen)((currentScreen + 1) % 3);
  drawCurrentScreen();
}
```

### Custom Navigation Keys
**Modify the navigation logic:**
```cpp
void loop() {
  M5Cardputer.update();
  
  if (M5Cardputer.Keyboard.isChange()) {
    if (M5Cardputer.Keyboard.isPressed()) {
      Keyboard_Class::KeysState status = M5Cardputer.Keyboard.keysState();
      
      // Right arrow = next screen
      if (status.right) {
        currentScreen = (Screen)((currentScreen + 1) % 3);
        drawCurrentScreen();
      }
      
      // Left arrow = previous screen
      if (status.left) {
        currentScreen = (Screen)((currentScreen - 1 + 3) % 3);
        drawCurrentScreen();
      }
      
      // ESC = back to home
      if (status.esc) {
        currentScreen = SCREEN_HOME;
        drawCurrentScreen();
      }
    }
  }
  
  delay(10);
}
```

---

## 3. Image Integration

### Prepare Images in Figma
1. Import PNG/JPG into Figma
2. Place in 240×135 frame
3. Resize to desired size (recommend max 128×128)
4. Name layer: "Logo" or "Icon_WiFi"

### Export with Images
```
✓ Convert Images to Byte Arrays
```

### Generated Code
```cpp
// Image Data
const unsigned char Logo_data[2048] PROGMEM = {
  0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46,
  // ... more bytes
};
// Logo: 64x64, 2048 bytes

void drawLogo() {
  // Display image at position
  M5Cardputer.Display.drawBitmap(88, 35, Logo_data, 64, 64, 0xFFFF);
}
```

### Optimize Large Images
**For images > 10KB:**
```cpp
// Use compression or split into tiles
const unsigned char tile1[512] PROGMEM = { /* data */ };
const unsigned char tile2[512] PROGMEM = { /* data */ };
const unsigned char tile3[512] PROGMEM = { /* data */ };

void drawLargeImage() {
  M5Cardputer.Display.drawBitmap(0, 0, tile1, 32, 32, 0xFFFF);
  M5Cardputer.Display.drawBitmap(32, 0, tile2, 32, 32, 0xFFFF);
  M5Cardputer.Display.drawBitmap(64, 0, tile3, 32, 32, 0xFFFF);
}
```

---

## 4. Memory Optimization

### Enable in Plugin
```
Settings → Export Options
✓ Optimize for Memory
```

### Manual Optimization Tips

**1. Use PROGMEM for constants:**
```cpp
// Before (uses RAM)
const char* menuItems[] = {
  "Option 1",
  "Option 2",
  "Option 3"
};

// After (uses Flash)
const char menuItem1[] PROGMEM = "Option 1";
const char menuItem2[] PROGMEM = "Option 2";
const char menuItem3[] PROGMEM = "Option 3";
```

**2. Reuse draw buffers:**
```cpp
// Before (multiple buffers)
void drawScreen1() {
  M5Cardputer.Display.fillScreen(0x0000);
  // draw...
}
void drawScreen2() {
  M5Cardputer.Display.fillScreen(0x0000);
  // draw...
}

// After (single clear function)
void clearScreen() {
  M5Cardputer.Display.fillScreen(0x0000);
}

void drawScreen1() {
  clearScreen();
  // draw...
}
```

**3. Compress colors:**
```cpp
// Before (many unique colors)
#define COLOR_1 0x6B5F
#define COLOR_2 0x6B60
#define COLOR_3 0x6B61

// After (palette)
#define COLOR_PRIMARY   0x6B5F
#define COLOR_SECONDARY 0x9CD3
#define COLOR_ACCENT    0xF800
```

---

## 5. Custom Interactions

### Scrollable List
```cpp
int scrollOffset = 0;
const int itemHeight = 20;
const int maxItems = 10;

void drawScrollableList() {
  for (int i = 0; i < 5; i++) {
    int itemIndex = i + scrollOffset;
    if (itemIndex < maxItems) {
      int y = 10 + i * itemHeight;
      M5Cardputer.Display.setCursor(10, y);
      M5Cardputer.Display.print("Item ");
      M5Cardputer.Display.print(itemIndex + 1);
    }
  }
}

void handleScroll() {
  if (M5Cardputer.Keyboard.isPressed()) {
    Keyboard_Class::KeysState status = M5Cardputer.Keyboard.keysState();
    
    if (status.up && scrollOffset > 0) {
      scrollOffset--;
      drawScrollableList();
    }
    
    if (status.down && scrollOffset < maxItems - 5) {
      scrollOffset++;
      drawScrollableList();
    }
  }
}
```

### Toggle Switch
```cpp
bool switchState = false;

void drawToggle(int x, int y, bool state) {
  // Background
  uint16_t bgColor = state ? 0x07E0 : 0xCE79; // Green or Gray
  M5Cardputer.Display.fillRoundRect(x, y, 40, 20, 10, bgColor);
  
  // Knob
  int knobX = state ? x + 22 : x + 2;
  M5Cardputer.Display.fillCircle(knobX + 8, y + 10, 8, 0xFFFF);
}

void handleToggle() {
  if (M5Cardputer.Keyboard.isPressed()) {
    Keyboard_Class::KeysState status = M5Cardputer.Keyboard.keysState();
    
    if (status.space) {
      switchState = !switchState;
      drawToggle(100, 60, switchState);
    }
  }
}
```

### Progress Bar
```cpp
int progress = 0; // 0-100

void drawProgressBar(int x, int y, int width, int height, int percent) {
  // Background
  M5Cardputer.Display.drawRect(x, y, width, height, 0xFFFF);
  
  // Fill
  int fillWidth = (width - 2) * percent / 100;
  M5Cardputer.Display.fillRect(x + 1, y + 1, fillWidth, height - 2, 0x07E0);
  
  // Percentage text
  M5Cardputer.Display.setCursor(x + width + 10, y + 2);
  M5Cardputer.Display.print(percent);
  M5Cardputer.Display.print("%");
}

void updateProgress() {
  progress = (progress + 1) % 101;
  drawProgressBar(20, 60, 200, 15, progress);
  delay(50);
}
```

---

## 6. Production Workflow

### Complete Development Cycle

**1. Design Phase (Figma)**
```
Week 1: Wireframes and mockups
- Create all screens
- Define navigation flow
- Design components
- Establish color palette
```

**2. Export Phase (Plugin)**
```
Day 1: Export and test
- Export all screens
- Test on device
- Fix layout issues
- Re-export if needed
```

**3. Development Phase (Arduino)**
```
Week 2: Add functionality
- Implement data handling
- Add sensor integration
- Connect to WiFi/BLE
- Test features
```

**4. Optimization Phase**
```
Day 3: Polish
- Optimize memory usage
- Improve responsiveness
- Add error handling
- Final testing
```

### Project Structure
```
my-cardputer-project/
├── design/
│   └── figma-export-v1.ino
├── src/
│   ├── main.ino
│   ├── screens.h
│   ├── ui.cpp
│   └── config.h
├── lib/
│   └── M5Cardputer/
└── platformio.ini
```

### Version Control
```bash
# Git workflow
git init
git add design/
git commit -m "Initial Figma export"

# After each re-export
git add design/
git commit -m "Updated UI design from Figma"

# Development
git checkout -b feature/wifi-connection
git add src/
git commit -m "Add WiFi connectivity"
git merge feature/wifi-connection
```

### Testing Checklist
```
□ All screens render correctly
□ Navigation works as expected
□ Buttons respond to input
□ Text is readable
□ Colors match design
□ No memory issues
□ Performance is smooth
□ Battery life acceptable
```

### Deployment
```cpp
// Version info
#define VERSION "1.0.0"
#define BUILD_DATE __DATE__

void setup() {
  M5Cardputer.begin();
  
  Serial.begin(115200);
  Serial.println("Cardputer App v" VERSION);
  Serial.println("Build: " BUILD_DATE);
  
  // Initialize
  drawSplashScreen();
  delay(2000);
  drawMainScreen();
}
```

---

## 🎯 Best Practices Summary

1. **Design First** - Complete all screens in Figma before coding
2. **Test Early** - Export and test frequently
3. **Optimize Later** - Get it working, then optimize
4. **Document Everything** - Comment your code
5. **Version Control** - Git for both design and code
6. **User Feedback** - Test with real users
7. **Iterate Quickly** - Figma → Export → Test → Repeat

---

## 🆘 Common Issues & Solutions

### Issue: Text Too Small
**Solution:** Increase font size in Figma (8px = textSize 1)

### Issue: Colors Look Different
**Solution:** RGB565 has limited colors. Use color picker to verify.

### Issue: Memory Error
**Solution:** Enable memory optimization, reduce image sizes

### Issue: Slow Rendering
**Solution:** Draw once in setup(), only update changed elements

### Issue: Navigation Not Working
**Solution:** Check keyboard library initialization

---

## 📚 Additional Resources

- [Figma Design Patterns](link)
- [Arduino Optimization Guide](link)
- [M5Cardputer Examples](link)
- [Community Showcase](link)

Happy coding! 🚀
