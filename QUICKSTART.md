# ⚡ Quick Start Guide - Cardputer Pro

## 🚀 5-Minute Setup

### Step 1: Install Plugin (2 min)
1. Download plugin files
2. Open **Figma Desktop App**
3. **Right-click** → Plugins → Development → **Import plugin from manifest**
4. Select `manifest.json`
5. ✅ Done!

### Step 2: Create First Design (2 min)
1. Create **Frame**: 240×135px
2. Name it "Dashboard"
3. Add:
   - Rectangle background (purple: #667eea)
   - Text "Hello Cardputer" (white, 24px)
   - Circle for icon (red)
4. Select frame

### Step 3: Export (1 min)
1. **Plugins → Cardputer Pro**
2. Click **"Export to Arduino"**
3. Click **"Copy Code"**
4. ✅ Done!

## 📱 Test on Cardputer

### Arduino IDE Setup
```bash
1. Open Arduino IDE
2. Install M5Cardputer library:
   Sketch → Include Library → Manage Libraries
   Search: "M5Cardputer"
   Install latest version
3. Select board: "M5Stack-STAMP-S3"
4. Select port
```

### Load Code
1. Paste copied code into Arduino IDE
2. Click **Upload** (→ button)
3. Wait for upload
4. See your design on Cardputer! 🎉

## 🎯 First Multi-Screen App

### Design
1. Create 3 frames (all 240×135):
   - `Home` - Welcome screen
   - `Menu` - Options list
   - `About` - Info screen

### Export
1. **Select all 3 frames** (Shift+Click)
2. **Plugins → Cardputer Pro**
3. **Export mode:** "Multi-Screen Navigation"
4. **Export**

### Navigate
On Cardputer:
- Press **Fn + Tab** to switch screens
- Cycles through: Home → Menu → About → Home

## ⚡ Pro Tips

### Tip 1: Quick Buttons
Name any frame "Button_*" and it becomes interactive:
```
Button_Home    → Auto-detected as button
Button_Start   → Rounded corners + centered text
Menu_Settings  → Menu component
```

### Tip 2: Optimize Images
For images:
1. Export as PNG from Figma
2. Resize to max 128×128
3. Use in design with ✓ "Convert Images" enabled
4. Plugin creates byte array automatically

### Tip 3: Test Fast
Quick iteration:
1. Design in Figma
2. Export → Copy
3. Paste → Upload
4. **Total: 30 seconds!**

## 🎨 Example Projects

### 1. Weather Dashboard
```
Frame: 240×135 "Weather"
- Background gradient
- Text: "Milan, 22°C"
- Icon: Sun (circle + rays)
- Time display

Export: Single Screen
Time: 2 minutes
```

### 2. Music Player
```
Frames: "Player", "Playlist", "Settings"
Components:
- Buttons: Play, Pause, Next, Previous
- Text: Song title, artist
- Progress bar

Export: Multi-Screen
Navigation: Fn+Tab
Time: 5 minutes
```

### 3. System Monitor
```
Frame: "Monitor"
Real-time data display:
- CPU usage bar
- Memory gauge
- Temperature text
Smart components:
- Auto-refresh button
- Alert indicators

Export: Complete Project
Features: Debug output, optimization
Time: 10 minutes
```

## 🔧 Common Settings

### Display Quality
```
Settings → Display Settings
Width: 240px  (default)
Height: 135px (default)
```

### Code Style
```
Settings → Code Generation
✓ Include Comments   → Readable code
✓ Debug Serial       → Easy debugging
✗ Generate Animations → Keep simple (for now)
```

### Export Options
```
Export Tab
✓ Convert Images      → Auto-convert PNGs
✓ Smart Components    → Auto-detect buttons
✓ Export Variables    → Design tokens
✓ Optimize Memory     → Smaller code
```

## ❓ FAQ

### Q: Can I use custom fonts?
A: Current version estimates font size. Custom fonts coming in v2.1!

### Q: Maximum image size?
A: Keep images under 50KB for best performance.

### Q: Works with other M5Stack devices?
A: Yes! Just adjust width/height in settings.

### Q: Can I edit generated code?
A: Absolutely! Code is yours to modify.

### Q: How to add custom interactions?
A: Edit the `loop()` function in generated code.

## 🎓 Next Steps

### Learn More
- Read full [README.md](README.md)
- Check [Examples](#) folder
- Join [Discord](#) community

### Try Advanced Features
- Multi-screen navigation
- Component detection
- PlatformIO projects
- Memory optimization

### Share Your Work
- Post screenshots
- Share code examples
- Help other users

## 🆘 Need Help?

### Quick Fixes
- **Plugin won't load:** Restart Figma
- **Code won't compile:** Check M5Cardputer library
- **Display looks wrong:** Verify 240×135 frame size

### Get Support
- Email: support@cardputer-pro.com
- Discord: [community link]
- Docs: [full documentation]

---

**Happy Creating!** 🚀

Build amazing UIs for your Cardputer in minutes, not hours.
