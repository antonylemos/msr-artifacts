# The Design System: Kinetic Editorial

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"Kinetic Editorial."** 

In an industry often cluttered with heavy textures and aggressive dark modes, this system takes a high-end, sophisticated approach to fitness. We move away from the "standard app" aesthetic by treating the UI as a premium lifestyle magazine. The experience is defined by breathable white space (using the cream-based `surface` tokens), bold typographic scales, and intentional asymmetry that mimics the movement of an athlete. 

We break the "template" look through:
- **Tonal Sectioning:** Eliminating borders in favor of subtle background shifts.
- **Aggressive Scale:** High-contrast typography that makes a statement.
- **Layered Depth:** Treating components as physical sheets of material rather than flat pixels.

## 2. Colors & Surface Philosophy
The palette balances high-energy "performance" colors with a "premium wellness" background. 

### The "No-Line" Rule/Users/raiane/Desktop/TCC/UX/kinetic_velocity/DESIGN.md
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. Boundaries must be defined solely through background color shifts. A `surface-container-low` section sitting on a `surface` background is the standard for separation.

### Surface Hierarchy & Nesting
Treat the UI as a series of nested physical layers. Use the `surface-container` tiers to create organic depth:
- **Base Level:** `surface` (#fff8f1) for the main page canvas.
- **Secondary Level:** `surface-container-low` (#fcf2e4) for large content blocks.
- **Tertiary Level:** `surface-container-highest` (#eae1d4) for high-priority interactive cards.

### Glass & Gradient Rule
To move beyond a generic flat look:
- **Glassmorphism:** Use semi-transparent variants of `surface` with a `backdrop-blur-xl` for floating navigation bars or action overlays.
- **Signature Textures:** Main CTAs should utilize a subtle linear gradient from `primary` (#b61b47) to `primary_container` (#d8385e) at a 135-degree angle to provide "visual soul."

## 3. Typography
We use **Inter** not as a standard sans-serif, but as a bold, architectural tool.

- **Display (lg/md/sm):** Heavy weights (700-800) with tight letter spacing (-0.02em). These are used for hero headers and workout titles to convey strength.
- **Headline & Title:** Used for section headers. Always paired with generous top-margin spacing to allow the "Editorial" feel to breathe.
- **Body:** Kept clean and functional. `body-lg` is the default for readability in high-movement environments (e.g., a user looking at their phone while on a treadmill).
- **Labels:** `label-md` should always be uppercase with a +0.05em letter-spacing to act as a sophisticated "tag" for metadata.

## 4. Elevation & Depth
Depth is achieved through **Tonal Layering**, not structural lines.

### The Layering Principle
Place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#fcf2e4) section. This creates a natural, soft lift that feels integrated into the environment.

### Ambient Shadows
When a "floating" element (like a FAB or a modal) is required:
- **Shadow Color:** Must be a tinted version of `on-surface` (#1f1b13) at 6% opacity.
- **Blur:** Use extra-diffused values (e.g., `box-shadow: 0 20px 40px rgba(31, 27, 19, 0.06)`).

### The "Ghost Border" Fallback
If accessibility requires a container definition (e.g., in a high-glare outdoor setting), use a "Ghost Border": `outline_variant` (#e1bec1) at **15% opacity**. Never use 100% opaque borders.

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`), `rounded-full`, `text-on-primary`. High-energy and "clickable."
- **Secondary:** `surface-container-highest` background with `on-surface` text. No border.
- **Tertiary:** `secondary` (#6a4fa0) text with no background, used for low-priority actions like "View History."

### Cards & Lists
- **Rule:** Forbid the use of divider lines. 
- **Style:** Use a `surface-container` background. Separate list items using `my-2` (vertical spacing) or a subtle color shift on hover.
- **Gym Cards:** Should use `surface-container-low` with a large, high-quality image mask.

### Input Fields
- **Style:** Minimalist. A simple `surface-container-highest` fill with a bottom-only "focus" bar in `primary`. 
- **States:** Error states use `error` (#ba1a1a) text but the input background shifts to `error_container` (#ffdad6) rather than gaining a thick red border.

### Specialized: Performance Chips
- **Selection:** Use `tertiary_fixed` (#cdf06c) for "active" workout filters. The high-contrast lime-green creates an immediate "active" mental model for the user.

## 6. Do’s and Don’ts

### Do
- **Do** use intentional asymmetry. A header might be left-aligned while the supporting sub-text is indented to the right to create visual flow.
- **Do** use the `tertiary` lime color for data visualization (progress bars, heart rate graphs) to signal vitality.
- **Do** allow the `background` cream to dominate the layout. It feels more "boutique" than pure white.

### Don’t
- **Don't** use standard 1px borders. If you feel you need a border, increase your white space instead.
- **Don't** use pure black for text. Always use `on-surface` (#1f1b13) to maintain the sophisticated tonal palette.
- **Don't** crowd the screen. This system is designed for "glanceability" during a workout. If it feels tight, remove an element.
