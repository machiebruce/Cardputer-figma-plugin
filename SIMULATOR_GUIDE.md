# 🎮 Simulatore Interattivo - Guida Completa

## 🌟 Novità: Preview Visiva Real-Time!

Il plugin ora include un **simulatore interattivo** che mostra il tuo design esattamente come apparirà sul Cardputer!

---

## 🎨 Cosa Vedrai

### Display Virtuale
```
┌────────────────────────────┐
│   ┌──────────────────┐     │  ← Mockup Cardputer
│   │                  │     │
│   │  240 x 135 px    │     │  ← Il tuo design qui!
│   │   Display        │     │
│   │                  │     │
│   └──────────────────┘     │
│   [▢▢▢▢▢▢▢▢▢▢]            │  ← Tastiera stilizzata
└────────────────────────────┘
```

---

## 🚀 Come Usare il Simulatore

### Step 1: Seleziona un Frame
1. In Figma, seleziona il frame che vuoi vedere
2. Idealmente 240×135px per risultati perfetti

### Step 2: Apri il Tab Preview
1. Apri **Cardputer Pro** plugin
2. Click sul tab **"Preview"**
3. Vedi il mockup del Cardputer

### Step 3: Carica la Preview
1. Click sul bottone **"📸 Load Preview"**
2. Aspetta 1-2 secondi
3. Il tuo design appare sul display virtuale! ✨

---

## 📊 Cosa Mostra il Simulatore

### 1. Display Realistico
- **Sfondo nero** - Come il vero Cardputer
- **Dimensioni reali** - 240×135 pixel
- **Bordo display** - Simula il bezel fisico
- **Pixelated rendering** - Effetto retro autentico

### 2. Mockup Dispositivo
- **Case grigio scuro** - Realismo estetico
- **Tastiera QWERTY** - Rappresentazione visiva
- **Status indicator** - Feedback in tempo reale

### 3. Feedback Visivo
- **Loading...** - Durante caricamento (blu)
- **✅ Preview loaded** - Successo (verde)
- **❌ Failed to load** - Errore (rosso)

---

## 🎯 Casi d'Uso

### Design Validation
```
Prima dell'export → Vedi se tutto è leggibile
Colori OK? → Contrasto sul display nero
Testo leggibile? → Dimensioni corrette
Layout OK? → Spazio ben utilizzato
```

### Rapid Prototyping
```
1. Design in Figma
2. Load Preview (2 sec)
3. Valuta
4. Modifica in Figma
5. Load Preview (2 sec)
6. Ripeti!
```

### Client Presentations
```
"Ecco come apparirà sul dispositivo reale"
→ Mostra il simulatore
→ Effetto WOW garantito! 🎉
```

### Multi-Screen Testing
```
Frame 1 → Load Preview → OK
Frame 2 → Load Preview → Testo troppo piccolo
Frame 3 → Load Preview → Perfetto!
```

---

## 💡 Tips & Tricks

### Tip 1: Screenshot Perfetti
```
Il simulatore cattura lo screenshot
esattamente come appare in Figma
→ Colori
→ Effetti
→ Opacità
→ Tutto!
```

### Tip 2: Dimensioni Consigliate
```
Frame: 240×135px
→ Preview perfetta 1:1
→ Nessuna distorsione
→ Pixel-perfect rendering
```

### Tip 3: Contrasto Check
```
Sfondo scuro del simulatore
= Come il vero display Cardputer
→ Verifica contrasto colori
→ Testo bianco su sfondo scuro = ✅
→ Grigio su sfondo scuro = ❌
```

### Tip 4: Quick Comparison
```
Apri più plugin windows:
1. Frame A in finestra 1
2. Frame B in finestra 2
3. Compara preview side-by-side
```

### Tip 5: Export Ready Check
```
Preview looks good?
✅ Tutto chiaro e leggibile
✅ Colori hanno buon contrasto
✅ Layout non troppo compresso
→ Ready per export! 🚀
```

---

## 🔧 Troubleshooting

### "Please select a frame to preview"
**Problema:** Nessun frame selezionato
**Soluzione:** Seleziona un frame/component in Figma

### "Failed to generate preview"
**Problema:** Export screenshot fallito
**Soluzione:** 
- Frame troppo grande? (max ~2000×2000)
- Layer locked? Unlock
- Hidden layer? Make visible

### Preview è sfocata/distorta
**Problema:** Dimensioni frame non standard
**Soluzione:** 
- Usa 240×135px per preview perfetta
- Altri size funzionano ma vengono scalati

### Niente appare sul display
**Problema:** Sfondo trasparente?
**Soluzione:** Aggiungi un rettangolo di background

### Loading infinito
**Problema:** Frame molto complesso
**Soluzione:** 
- Semplifica il frame
- Riduci numero di layer
- Riprova

---

## 🎨 Best Practices

### 1. Test Early, Test Often
```
Non aspettare di finire tutto il design
→ Load preview ogni 5-10 minuti
→ Catch issues early
→ Iterate faster
```

### 2. Use Dark Backgrounds
```
Cardputer ha display su sfondo nero
→ Design con sfondi scuri
→ Testo bianco/chiaro
→ Preview realistico
```

### 3. Check Readability
```
Font size 8px = textSize 1 (piccolo!)
Font size 16px = textSize 2 (buono)
Font size 24px = textSize 3 (ottimo)
→ Verifica nel simulatore
```

### 4. Color Contrast
```
RGB565 ha colori limitati
→ Preview mostra conversione
→ Alcuni colori cambiano leggermente
→ Controlla nel simulatore!
```

### 5. Pixel Perfect
```
Allinea elementi a pixel interi
→ x: 10, y: 20 ✅
→ x: 10.5, y: 20.3 ❌
→ Preview mostra artefatti
```

---

## 🚀 Workflow Professionale

### Step-by-Step Design Process

**1. Sketch Layout (Figma)**
```
10 min → Layout base
↓
Load Preview → Check proportions
```

**2. Add Content (Figma)**
```
20 min → Text, icons, images
↓
Load Preview → Check readability
```

**3. Style & Polish (Figma)**
```
15 min → Colors, spacing, details
↓
Load Preview → Final check
```

**4. Export (Plugin)**
```
30 sec → Generate Arduino code
✅ Production ready!
```

**Total: 45 minutes** (vs 4-6 hours manual coding!)

---

## 📸 Screenshot Gallery (Coming Soon)

Il simulatore può anche:
- Salvare screenshot del display
- Esportare preview come PNG
- Share con il team
- Include nella documentazione

*(Features in v2.1)*

---

## 🎓 Video Tutorial

**Coming Soon:**
- Basic preview tutorial (2 min)
- Design tips for Cardputer (5 min)
- Professional workflow (10 min)

---

## 💬 Feedback

Usi il simulatore? Facci sapere cosa ne pensi!
- Email: feedback@cardputer-pro.com
- Discord: [community]
- Twitter: @CardputerPro

---

## 🎉 Conclusione

Il simulatore interattivo ti permette di:
✅ Vedere il design in real-time
✅ Validare prima dell'export
✅ Iterare velocemente
✅ Impressionare i clienti
✅ Produrre design migliori

**Design confidently. Export perfectly. Ship faster.**

---

**Cardputer Pro v2.0**  
*Now with Interactive Simulator!*
