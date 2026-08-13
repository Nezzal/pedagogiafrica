# Design System - PedagogiAfrica & Pr. Nezzal Abdelmalek

## 1. Vision & Executive Identity
PedagogiAfrica est un hub d'excellence et de mentorat dédié aux médecins du travail, professionnels de santé et éducateurs. Le design doit véhiculer **l'expertise médicale, l'innovation e-learning & IA, la clarté et la confiance**.

## 2. Color Palette (HSL & Gradients)
- **Primary (Royal Medical Blue)**: `hsl(220, 85%, 52%)` / Hex `#1d4ed8`
- **Primary Dark (Navy Depth)**: `hsl(222, 47%, 11%)` / Hex `#0f172a`
- **Accent Cyan (E-Learning Tech)**: `hsl(195, 95%, 48%)` / Hex `#0284c7`
- **Emerald (Health & Active Community)**: `hsl(158, 75%, 40%)` / Hex `#059669`
- **Amber (Warmth & Mentorship)**: `hsl(38, 92%, 50%)` / Hex `#d97706`
- **Background Light**: `hsl(210, 40%, 98%)` / Hex `#f8fafc`
- **Surface Cards**: `hsl(0, 0%, 100%)` / Hex `#ffffff`
- **Border Glass**: `rgba(226, 232, 240, 0.8)`

## 3. Typography & Hierarchy
- **Heading Font**: `'Outfit', sans-serif` (Bold 700/800, tracking -0.02em)
- **Body Font**: `'Plus Jakarta Sans', sans-serif` (Regular 400, Medium 500, SemiBold 600)
- **Scale**:
  - Hero Title: `clamp(2.5rem, 5vw, 3.75rem)`
  - Section Title: `clamp(2rem, 4vw, 2.75rem)`
  - Subtitle: `1.15rem`
  - Body Text: `1rem` / Line-height `1.7`

## 4. Surfaces, Shadows & Glassmorphism
- **Elevated Card**: `box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(226, 232, 240, 0.8)`
- **Hover Glow**: `box-shadow: 0 20px 40px -12px rgba(37, 99, 235, 0.18)`
- **Dark Glass Banner**: `background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); backdrop-filter: blur(16px);`

## 5. UI Components Guidelines
- **Buttons**: Rounded pills (`border-radius: 9999px`), gradient background with subtle hover lift (`translateY(-2px)`).
- **Badges**: Soft background (`rgba(primary, 0.08)`), pulsing status indicator for active hub.
- **Modals**: High z-index with blur backdrop, clear close triggers, accessible focus ring.
