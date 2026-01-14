// Cardputer Pro - Commercial Plugin Core
// Advanced Figma to Arduino Export System

figma.showUI(__html__, { width: 480, height: 640 });

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Convert RGB to RGB565 hex
function rgbToHex565(r, g, b) {
  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);
  
  const r5 = (r >> 3) & 0x1F;
  const g6 = (g >> 2) & 0x3F;
  const b5 = (b >> 3) & 0x1F;
  const rgb565 = (r5 << 11) | (g6 << 5) | b5;
  
  return `0x${rgb565.toString(16).toUpperCase().padStart(4, '0')}`;
}

// Get node color
function getNodeColor(node) {
  if ('fills' in node && Array.isArray(node.fills) && node.fills.length > 0) {
    const fill = node.fills[0];
    if (fill.type === 'SOLID') {
      const { r, g, b } = fill.color;
      return rgbToHex565(r, g, b);
    }
  }
  return '0xFFFF';
}

// Get stroke color
function getStrokeColor(node) {
  if ('strokes' in node && Array.isArray(node.strokes) && node.strokes.length > 0) {
    const stroke = node.strokes[0];
    if (stroke.type === 'SOLID') {
      const { r, g, b } = stroke.color;
      return rgbToHex565(r, g, b);
    }
  }
  return '0xFFFF';
}

// Sanitize name for C++ function
function sanitizeName(name) {
  return name.replace(/[^a-zA-Z0-9]/g, '');
}

// ============================================================================
// COMPONENT DETECTION
// ============================================================================

function detectComponentType(node) {
  const name = node.name.toLowerCase();
  
  // Button detection
  if (name.includes('button') || name.includes('btn')) {
    return { type: 'Button', interactive: true };
  }
  
  // Menu detection
  if (name.includes('menu') || name.includes('nav')) {
    return { type: 'Menu', interactive: true };
  }
  
  // Input field detection
  if (name.includes('input') || name.includes('field') || name.includes('textbox')) {
    return { type: 'Input', interactive: true };
  }
  
  // Icon detection
  if (name.includes('icon') || (node.type === 'COMPONENT' && node.width < 50 && node.height < 50)) {
    return { type: 'Icon', interactive: false };
  }
  
  // Card detection
  if (name.includes('card') && node.type === 'FRAME') {
    return { type: 'Card', interactive: false };
  }
  
  return { type: 'Generic', interactive: false };
}

// ============================================================================
// IMAGE CONVERSION
// ============================================================================

async function convertImageToByteArray(node) {
  try {
    const bytes = await node.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 1 } });
    const uint8Array = new Uint8Array(bytes);
    
    // Convert to C++ byte array format
    let arrayStr = '{\n  ';
    for (let i = 0; i < uint8Array.length; i++) {
      arrayStr += `0x${uint8Array[i].toString(16).padStart(2, '0')}`;
      if (i < uint8Array.length - 1) arrayStr += ', ';
      if ((i + 1) % 16 === 0) arrayStr += '\n  ';
    }
    arrayStr += '\n}';
    
    return {
      name: sanitizeName(node.name),
      size: uint8Array.length,
      width: Math.round(node.width),
      height: Math.round(node.height),
      data: arrayStr
    };
  } catch (error) {
    return null;
  }
}

// ============================================================================
// CODE GENERATION - BASIC SHAPES
// ============================================================================

function generateRectCode(node, parentX = 0, parentY = 0, options = {}) {
  const x = Math.round(node.x + parentX);
  const y = Math.round(node.y + parentY);
  const w = Math.round(node.width);
  const h = Math.round(node.height);
  const color = getNodeColor(node);
  
  let code = [];
  if (options.comments) {
    code.push(`  // Rectangle: ${node.name}`);
  }
  
  const hasFill = node.fills && node.fills.length > 0 && node.fills[0].type === 'SOLID' && node.fills[0].visible !== false;
  const hasStroke = node.strokes && node.strokes.length > 0 && node.strokes[0].visible !== false;
  
  if (hasFill) {
    code.push(`  M5Cardputer.Display.fillRect(${x}, ${y}, ${w}, ${h}, ${color});`);
  }
  if (hasStroke) {
    const strokeColor = getStrokeColor(node);
    code.push(`  M5Cardputer.Display.drawRect(${x}, ${y}, ${w}, ${h}, ${strokeColor});`);
  }
  
  return code.join('\n');
}

function generateCircleCode(node, parentX = 0, parentY = 0, options = {}) {
  const centerX = Math.round(node.x + parentX + node.width / 2);
  const centerY = Math.round(node.y + parentY + node.height / 2);
  const radiusX = Math.round(node.width / 2);
  const radiusY = Math.round(node.height / 2);
  const color = getNodeColor(node);
  
  let code = [];
  if (options.comments) {
    code.push(`  // Circle/Ellipse: ${node.name}`);
  }
  
  const hasFill = node.fills && node.fills.length > 0 && node.fills[0].type === 'SOLID';
  
  if (radiusX === radiusY) {
    if (hasFill) {
      code.push(`  M5Cardputer.Display.fillCircle(${centerX}, ${centerY}, ${radiusX}, ${color});`);
    } else {
      code.push(`  M5Cardputer.Display.drawCircle(${centerX}, ${centerY}, ${radiusX}, ${color});`);
    }
  } else {
    if (hasFill) {
      code.push(`  M5Cardputer.Display.fillEllipse(${centerX}, ${centerY}, ${radiusX}, ${radiusY}, ${color});`);
    } else {
      code.push(`  M5Cardputer.Display.drawEllipse(${centerX}, ${centerY}, ${radiusX}, ${radiusY}, ${color});`);
    }
  }
  
  return code.join('\n');
}

function generateTextCode(node, parentX = 0, parentY = 0, options = {}) {
  const x = Math.round(node.x + parentX);
  const y = Math.round(node.y + parentY);
  const color = getNodeColor(node);
  const text = node.characters.replace(/"/g, '\\"').replace(/\n/g, '\\n');
  
  let textSize = 1;
  if ('fontSize' in node && typeof node.fontSize === 'number') {
    textSize = Math.max(1, Math.round(node.fontSize / 8));
  }
  
  let code = [];
  if (options.comments) {
    code.push(`  // Text: ${node.name}`);
  }
  code.push(`  M5Cardputer.Display.setTextColor(${color});`);
  code.push(`  M5Cardputer.Display.setTextSize(${textSize});`);
  code.push(`  M5Cardputer.Display.setCursor(${x}, ${y});`);
  code.push(`  M5Cardputer.Display.print("${text}");`);
  
  return code.join('\n');
}

function generateLineCode(node, parentX = 0, parentY = 0, options = {}) {
  const x1 = Math.round(node.x + parentX);
  const y1 = Math.round(node.y + parentY);
  const x2 = Math.round(node.x + parentX + node.width);
  const y2 = Math.round(node.y + parentY + node.height);
  const color = getStrokeColor(node);
  
  let code = [];
  if (options.comments) {
    code.push(`  // Line: ${node.name}`);
  }
  code.push(`  M5Cardputer.Display.drawLine(${x1}, ${y1}, ${x2}, ${y2}, ${color});`);
  
  return code.join('\n');
}

// ============================================================================
// SMART COMPONENT GENERATION
// ============================================================================

function generateButtonCode(node, parentX, parentY, options) {
  const bounds = {
    x: Math.round(node.x + parentX),
    y: Math.round(node.y + parentY),
    w: Math.round(node.width),
    h: Math.round(node.height)
  };
  
  let code = [];
  if (options.comments) {
    code.push(`\n  // Interactive Button: ${node.name}`);
  }
  
  // Draw button background
  const bgColor = getNodeColor(node);
  code.push(`  M5Cardputer.Display.fillRoundRect(${bounds.x}, ${bounds.y}, ${bounds.w}, ${bounds.h}, 4, ${bgColor});`);
  code.push(`  M5Cardputer.Display.drawRoundRect(${bounds.x}, ${bounds.y}, ${bounds.w}, ${bounds.h}, 4, 0xFFFF);`);
  
  // Find text inside button
  if ('children' in node) {
    for (const child of node.children) {
      if (child.type === 'TEXT') {
        const textX = Math.round(bounds.x + bounds.w / 2 - child.width / 2);
        const textY = Math.round(bounds.y + bounds.h / 2 - child.height / 2);
        code.push(`  M5Cardputer.Display.setCursor(${textX}, ${textY});`);
        code.push(`  M5Cardputer.Display.print("${child.characters}");`);
      }
    }
  }
  
  return code.join('\n');
}

// ============================================================================
// NODE PROCESSOR
// ============================================================================

async function processNode(node, parentX = 0, parentY = 0, options = {}, images = [], components = []) {
  if (!node.visible) return { code: [], images, components };
  
  let code = [];
  
  // Detect component type
  const componentInfo = detectComponentType(node);
  if (options.components && componentInfo.interactive) {
    components.push({ name: node.name, type: componentInfo.type });
  }
  
  switch (node.type) {
    case 'RECTANGLE':
      code.push(generateRectCode(node, parentX, parentY, options));
      break;
      
    case 'ELLIPSE':
      code.push(generateCircleCode(node, parentX, parentY, options));
      break;
      
    case 'TEXT':
      code.push(generateTextCode(node, parentX, parentY, options));
      break;
      
    case 'LINE':
      code.push(generateLineCode(node, parentX, parentY, options));
      break;
      
    case 'FRAME':
    case 'GROUP':
    case 'COMPONENT':
    case 'INSTANCE':
      const newParentX = parentX + node.x;
      const newParentY = parentY + node.y;
      
      // Draw frame background if it has fills
      if (node.type === 'FRAME' && node.fills && node.fills.length > 0 && node.fills[0].visible !== false) {
        const bgColor = getNodeColor(node);
        if (options.comments) {
          code.push(`\n  // Frame: ${node.name}`);
        }
        code.push(`  M5Cardputer.Display.fillRect(${Math.round(newParentX)}, ${Math.round(newParentY)}, ${Math.round(node.width)}, ${Math.round(node.height)}, ${bgColor});`);
      }
      
      // Check for smart component generation
      if (options.components && componentInfo.type === 'Button') {
        code.push(generateButtonCode(node, parentX, parentY, options));
      } else if ('children' in node) {
        // Process children
        for (const child of node.children) {
          const result = await processNode(child, newParentX, newParentY, options, images, components);
          code.push(...result.code);
          images = result.images;
          components = result.components;
        }
      }
      break;
      
    default:
      // Handle images
      if (options.images && (node.type === 'RECTANGLE' || node.type === 'FRAME')) {
        if (node.fills && node.fills.length > 0 && node.fills[0].type === 'IMAGE') {
          const imageData = await convertImageToByteArray(node);
          if (imageData) {
            images.push(imageData);
            if (options.comments) {
              code.push(`  // Image: ${node.name} (converted to byte array)`);
            }
          }
        }
      }
  }
  
  return { code: code.filter(c => c), images, components };
}

// ============================================================================
// MAIN CODE GENERATION
// ============================================================================

async function generateSingleScreenCode(node, screenName, options) {
  const result = await processNode(node, 0, 0, options, [], []);
  const drawCommands = result.code;
  
  // Generate image arrays
  let imageArrays = '';
  if (result.images.length > 0) {
    imageArrays = '\n// Image Data\n';
    for (const img of result.images) {
      imageArrays += `const unsigned char ${img.name}_data[${img.size}] PROGMEM = ${img.data};\n`;
      imageArrays += `// ${img.name}: ${img.width}x${img.height}, ${img.size} bytes\n\n`;
    }
  }
  
  const functionName = `draw${sanitizeName(screenName)}`;
  
  const code = `#include <M5Cardputer.h>

// ============================================================================
// ${screenName}
// Generated by Cardputer Pro Plugin
// ============================================================================
${imageArrays}
void setup() {
  M5Cardputer.begin();
  M5Cardputer.Display.setRotation(1);
  ${options.debug ? 'Serial.begin(115200);' : ''}
  ${options.debug ? 'Serial.println("Cardputer initialized");' : ''}
  
  // Draw initial screen
  ${functionName}();
}

void ${functionName}() {
${drawCommands.join('\n')}
}

void loop() {
  M5Cardputer.update();
  
  // Handle keyboard input
  if (M5Cardputer.Keyboard.isChange()) {
    if (M5Cardputer.Keyboard.isPressed()) {
      Keyboard_Class::KeysState status = M5Cardputer.Keyboard.keysState();
      ${options.debug ? 'Serial.println("Key pressed");' : ''}
      // Add your keyboard handling here
    }
  }
  
  delay(10);
}
`;
  
  return { code, stats: { screens: 1, components: result.components.length }, components: result.components };
}

async function generateMultiScreenCode(nodes, options) {
  const screens = [];
  let allComponents = [];
  
  for (const node of nodes) {
    const result = await processNode(node, 0, 0, options, [], []);
    screens.push({
      name: sanitizeName(node.name),
      commands: result.code,
      images: result.images,
      components: result.components
    });
    allComponents = allComponents.concat(result.components);
  }
  
  // Generate navigation system
  let code = `#include <M5Cardputer.h>

// ============================================================================
// Multi-Screen Navigation System
// Generated by Cardputer Pro Plugin
// ============================================================================

// Screen IDs
enum Screen {
`;
  
  screens.forEach((screen, idx) => {
    code += `  SCREEN_${screen.name.toUpperCase()}${idx < screens.length - 1 ? ',' : ''}\n`;
  });
  
  code += `};

Screen currentScreen = SCREEN_${screens[0].name.toUpperCase()};

`;
  
  // Generate draw functions for each screen
  screens.forEach(screen => {
    code += `void draw${screen.name}() {\n`;
    code += `  M5Cardputer.Display.fillScreen(0x0000); // Clear\n`;
    code += screen.commands.join('\n');
    code += `\n}\n\n`;
  });
  
  // Generate screen switcher
  code += `void drawCurrentScreen() {
  switch (currentScreen) {
`;
  
  screens.forEach(screen => {
    code += `    case SCREEN_${screen.name.toUpperCase()}:
      draw${screen.name}();
      break;
`;
  });
  
  code += `  }
}

void setup() {
  M5Cardputer.begin();
  M5Cardputer.Display.setRotation(1);
  ${options.debug ? 'Serial.begin(115200);' : ''}
  
  drawCurrentScreen();
}

void loop() {
  M5Cardputer.update();
  
  if (M5Cardputer.Keyboard.isChange()) {
    if (M5Cardputer.Keyboard.isPressed()) {
      Keyboard_Class::KeysState status = M5Cardputer.Keyboard.keysState();
      
      // Navigation keys
      if (status.fn && status.tab) {
        // Next screen
        currentScreen = (Screen)((currentScreen + 1) % ${screens.length});
        drawCurrentScreen();
        ${options.debug ? 'Serial.println("Screen changed");' : ''}
      }
    }
  }
  
  delay(10);
}
`;
  
  return { 
    code, 
    stats: { screens: screens.length, components: allComponents.length },
    components: allComponents,
    screens: nodes.map(n => ({ name: n.name, width: n.width, height: n.height }))
  };
}

// ============================================================================
// MESSAGE HANDLER
// ============================================================================

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'export') {
    const selection = figma.currentPage.selection;
    
    if (selection.length === 0) {
      figma.ui.postMessage({
        type: 'error',
        message: 'Please select at least one frame to export!'
      });
      return;
    }
    
    const node = selection[0];
    const options = msg.options || {};
    
    // Dimension check
    if ('width' in node && 'height' in node) {
      if (node.width !== options.screenWidth || node.height !== options.screenHeight) {
        figma.ui.postMessage({
          type: 'warning',
          message: `Dimensions: ${node.width}×${node.height}. Recommended: ${options.screenWidth}×${options.screenHeight}px`
        });
      }
    }
    
    let result;
    if (msg.mode === 'multi') {
      // Multi-screen mode - find all frames
      const frames = selection.filter(n => n.type === 'FRAME' || n.type === 'COMPONENT');
      if (frames.length === 0) {
        figma.ui.postMessage({
          type: 'error',
          message: 'No frames selected. Select multiple frames for multi-screen export.'
        });
        return;
      }
      result = await generateMultiScreenCode(frames, options);
      
      if (result.screens) {
        figma.ui.postMessage({
          type: 'screens',
          screens: result.screens
        });
      }
    } else {
      // Single screen mode
      result = await generateSingleScreenCode(node, node.name || 'Screen', options);
    }
    
    figma.ui.postMessage({
      type: 'code',
      code: result.code,
      screenName: node.name || 'Screen',
      stats: result.stats
    });
    
    if (result.components && result.components.length > 0) {
      figma.ui.postMessage({
        type: 'components',
        components: result.components
      });
    }
  }
  
  if (msg.type === 'refresh-preview') {
    const selection = figma.currentPage.selection;
    if (selection.length > 0) {
      const screens = selection
        .filter(n => n.type === 'FRAME')
        .map(n => ({ name: n.name, width: n.width, height: n.height }));
      
      figma.ui.postMessage({
        type: 'screens',
        screens: screens
      });
    }
  }
  
  if (msg.type === 'load-preview') {
    const selection = figma.currentPage.selection;
    
    if (selection.length === 0) {
      figma.ui.postMessage({
        type: 'error',
        message: 'Please select a frame to preview'
      });
      return;
    }
    
    const node = selection[0];
    
    // Export node as PNG and convert to base64
    try {
      const bytes = await node.exportAsync({
        format: 'PNG',
        constraint: { type: 'SCALE', value: 1 }
      });
      
      // Convert to base64
      const base64 = figma.base64Encode(bytes);
      const dataUrl = `data:image/png;base64,${base64}`;
      
      figma.ui.postMessage({
        type: 'preview',
        imageData: dataUrl
      });
    } catch (error) {
      figma.ui.postMessage({
        type: 'error',
        message: 'Failed to generate preview: ' + error.message
      });
    }
  }
  
  if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};
