# CV Builder Pro - Local Development

Dette prosjektet er klart for videre utvikling i Visual Studio Code. Det er bygget med **React 18**, **Vite**, **TypeScript**, og **Tailwind CSS**.

## Slik kommer du i gang lokalt

### 1. Pakk ut og åpne i VS Code
Last ned prosjektet som ZIP fra AI Studio (Innstillinger -> Last ned som ZIP) og åpne mappen i VS Code.

### 2. Installer avhengigheter
Åpne terminalen i VS Code (`Ctrl+``) og kjør:
```bash
npm install
```

### 3. Start utviklingsserveren
Kjør følgende kommando for å starte appen lokalt:
```bash
npm run dev
```
Appen vil da være tilgjengelig på `http://localhost:3000` (eller den porten Vite tildeler).

## Prosjektstruktur

- `src/App.tsx`: Hovedkomponenten som styrer tilstanden.
- `src/components/CVPreview.tsx`: Selve CV-visningen med det visuelle dra-og-slipp systemet.
- `src/components/CVEditor.tsx`: Kontrollpanelet på venstre side.
- `src/initialData.ts`: Inneholder all CV-data og standardinnstillinger.
- `src/types.ts`: TypeScript-definisjoner for dataen.

## Teknologier som brukes
- **Styling**: Tailwind CSS
- **Animasjoner**: Framer Motion (motion/react)
- **Ikoner**: Lucide React
- **Build Tool**: Vite

## Tips for VS Code
- Installer **Tailwind CSS IntelliSense** utvidelsen for bedre autfullføring av stiler.
- Bruk **ESLint** og **Prettier** for å holde koden ryddig.
