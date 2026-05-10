🚀 Instalación y Ejecución Local
1. Clonar el repositorio:
git clone [https://github.com/alexmp0925/trading-app.git](https://github.com/alexmp0925/trading-app.git)
cd trading-app

2. Instalar las dependencias:
npm install

3. Iniciar el servidor de desarrollo:
npx expo start

Opciones de visualización:
Presiona w para abrir la versión Web en tu navegador
O escanea el código QR en la terminal con la app Expo Go desde tu dispositivo físico.

🛠️ Tecnologías Utilizadas
React Native: Framework principal.
Expo: Herramientas y ecosistema (incluyendo Expo Router).
Lightweight Charts: Librería de gráficos financieros de TradingView.
React Native WebView: Para inyectar el código del gráfico en las apps móviles.
Binance API & WebSockets: Proveedor de datos de mercado en tiempo real.
React Native Reanimated: Para animaciones fluidas en el hilo de UI.

```
trading-app
├─ app_trading
│  ├─ .expo
│  │  ├─ devices.json
│  │  ├─ README.md
│  │  ├─ types
│  │  │  └─ router.d.ts
│  │  └─ web
│  │     └─ cache
│  │        └─ production
│  │           └─ images
│  │              └─ favicon
│  │                 └─ favicon-a4e030697a7571b3e95d31860e4da55d2f98e5e861e2b55e414f45a8556828ba-contain-transparent
│  │                    └─ favicon-48.png
│  ├─ app
│  │  ├─ (tabs)
│  │  │  ├─ explore.tsx
│  │  │  ├─ index.tsx
│  │  │  └─ _layout.tsx
│  │  ├─ modal.tsx
│  │  └─ _layout.tsx
│  ├─ app.json
│  ├─ assets
│  │  └─ images
│  │     ├─ android-icon-background.png
│  │     ├─ android-icon-foreground.png
│  │     ├─ android-icon-monochrome.png
│  │     ├─ favicon.png
│  │     ├─ icon.png
│  │     ├─ partial-react-logo.png
│  │     ├─ react-logo.png
│  │     ├─ react-logo@2x.png
│  │     ├─ react-logo@3x.png
│  │     └─ splash-icon.png
│  ├─ components
│  │  ├─ external-link.tsx
│  │  ├─ green.btn.tsx
│  │  ├─ haptic-tab.tsx
│  │  ├─ hello-wave.tsx
│  │  ├─ parallax-scroll-view.tsx
│  │  ├─ red_btn.tsx
│  │  ├─ themed-text.tsx
│  │  ├─ themed-view.tsx
│  │  └─ ui
│  │     ├─ collapsible.tsx
│  │     ├─ icon-symbol.ios.tsx
│  │     └─ icon-symbol.tsx
│  ├─ constants
│  │  └─ theme.ts
│  ├─ eslint.config.js
│  ├─ expo-env.d.ts
│  ├─ hooks
│  │  ├─ use-color-scheme.ts
│  │  ├─ use-color-scheme.web.ts
│  │  └─ use-theme-color.ts
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ scripts
│  │  └─ reset-project.js
│  └─ tsconfig.json
└─ README.md

```
```
trading-app
├─ app_trading
│  ├─ .expo
│  │  ├─ devices.json
│  │  ├─ README.md
│  │  ├─ types
│  │  │  └─ router.d.ts
│  │  └─ web
│  │     └─ cache
│  │        └─ production
│  │           └─ images
│  │              └─ favicon
│  │                 └─ favicon-a4e030697a7571b3e95d31860e4da55d2f98e5e861e2b55e414f45a8556828ba-contain-transparent
│  │                    └─ favicon-48.png
│  ├─ app
│  │  ├─ (tabs)
│  │  │  ├─ markets.tsx
│  │  │  ├─ profile.tsx
│  │  │  ├─ trading.tsx
│  │  │  └─ _layout.tsx
│  │  ├─ coin
│  │  │  └─ [symbol].tsx
│  │  ├─ index.tsx
│  │  └─ _layout.tsx
│  ├─ app.json
│  ├─ assets
│  │  └─ images
│  │     ├─ android-icon-background.png
│  │     ├─ android-icon-foreground.png
│  │     ├─ android-icon-monochrome.png
│  │     ├─ partial-react-logo.png
│  │     ├─ react-logo.png
│  │     ├─ react-logo@2x.png
│  │     ├─ react-logo@3x.png
│  │     └─ splash-icon.png
│  ├─ components
│  │  ├─ external-link.tsx
│  │  ├─ green.btn.tsx
│  │  ├─ haptic-tab.tsx
│  │  ├─ red_btn.tsx
│  │  ├─ themed-text.tsx
│  │  ├─ themed-view.tsx
│  │  └─ ui
│  │     └─ icon-symbol.tsx
│  ├─ constants
│  │  └─ theme.ts
│  ├─ eslint.config.js
│  ├─ expo-env.d.ts
│  ├─ hooks
│  │  ├─ use-color-scheme.ts
│  │  ├─ use-color-scheme.web.ts
│  │  ├─ use-theme-color.ts
│  │  └─ useBinance.ts
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ scripts
│  │  └─ reset-project.js
│  └─ tsconfig.json
└─ README.md

```
```
trading-app
├─ app_trading
│  ├─ .expo
│  │  ├─ devices.json
│  │  ├─ README.md
│  │  ├─ types
│  │  │  └─ router.d.ts
│  │  └─ web
│  │     └─ cache
│  │        └─ production
│  │           └─ images
│  │              └─ favicon
│  │                 └─ favicon-a4e030697a7571b3e95d31860e4da55d2f98e5e861e2b55e414f45a8556828ba-contain-transparent
│  │                    └─ favicon-48.png
│  ├─ app
│  │  ├─ (tabs)
│  │  │  ├─ markets.tsx
│  │  │  ├─ profile.tsx
│  │  │  ├─ trading.tsx
│  │  │  └─ _layout.tsx
│  │  ├─ coin
│  │  │  └─ [symbol].tsx
│  │  ├─ index.tsx
│  │  └─ _layout.tsx
│  ├─ app.json
│  ├─ assets
│  │  └─ images
│  │     ├─ android-icon-background.png
│  │     ├─ android-icon-foreground.png
│  │     ├─ android-icon-monochrome.png
│  │     ├─ partial-react-logo.png
│  │     ├─ react-logo.png
│  │     ├─ react-logo@2x.png
│  │     ├─ react-logo@3x.png
│  │     └─ splash-icon.png
│  ├─ components
│  │  ├─ external-link.tsx
│  │  ├─ green.btn.tsx
│  │  ├─ haptic-tab.tsx
│  │  ├─ red_btn.tsx
│  │  ├─ themed-text.tsx
│  │  ├─ themed-view.tsx
│  │  └─ ui
│  │     └─ icon-symbol.tsx
│  ├─ constants
│  │  └─ theme.ts
│  ├─ eslint.config.js
│  ├─ expo-env.d.ts
│  ├─ hooks
│  │  ├─ use-color-scheme.ts
│  │  ├─ use-color-scheme.web.ts
│  │  ├─ use-theme-color.ts
│  │  └─ useBinance.ts
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ scripts
│  │  └─ reset-project.js
│  └─ tsconfig.json
└─ README.md

```
```
trading-app
├─ app_trading
│  ├─ .expo
│  │  ├─ devices.json
│  │  ├─ README.md
│  │  ├─ types
│  │  │  └─ router.d.ts
│  │  └─ web
│  │     └─ cache
│  │        └─ production
│  │           └─ images
│  │              └─ favicon
│  │                 └─ favicon-a4e030697a7571b3e95d31860e4da55d2f98e5e861e2b55e414f45a8556828ba-contain-transparent
│  │                    └─ favicon-48.png
│  ├─ app
│  │  ├─ (tabs)
│  │  │  ├─ markets.tsx
│  │  │  ├─ profile.tsx
│  │  │  ├─ trading.tsx
│  │  │  └─ _layout.tsx
│  │  ├─ coin
│  │  │  └─ [symbol].tsx
│  │  ├─ index.tsx
│  │  └─ _layout.tsx
│  ├─ app.json
│  ├─ assets
│  │  └─ images
│  │     ├─ android-icon-background.png
│  │     ├─ android-icon-foreground.png
│  │     ├─ android-icon-monochrome.png
│  │     ├─ partial-react-logo.png
│  │     ├─ react-logo.png
│  │     ├─ react-logo@2x.png
│  │     ├─ react-logo@3x.png
│  │     └─ splash-icon.png
│  ├─ components
│  │  ├─ external-link.tsx
│  │  ├─ green.btn.tsx
│  │  ├─ haptic-tab.tsx
│  │  ├─ red_btn.tsx
│  │  ├─ themed-text.tsx
│  │  ├─ themed-view.tsx
│  │  └─ ui
│  │     └─ icon-symbol.tsx
│  ├─ constants
│  │  └─ theme.ts
│  ├─ eslint.config.js
│  ├─ expo-env.d.ts
│  ├─ hooks
│  │  ├─ use-color-scheme.ts
│  │  ├─ use-color-scheme.web.ts
│  │  ├─ use-theme-color.ts
│  │  └─ useBinance.ts
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ scripts
│  │  └─ reset-project.js
│  └─ tsconfig.json
└─ README.md

```
```
trading-app
├─ app_trading
│  ├─ .expo
│  │  ├─ devices.json
│  │  ├─ README.md
│  │  ├─ types
│  │  │  └─ router.d.ts
│  │  └─ web
│  │     └─ cache
│  │        └─ production
│  │           └─ images
│  │              └─ favicon
│  │                 └─ favicon-a4e030697a7571b3e95d31860e4da55d2f98e5e861e2b55e414f45a8556828ba-contain-transparent
│  │                    └─ favicon-48.png
│  ├─ app
│  │  ├─ (tabs)
│  │  │  ├─ markets.tsx
│  │  │  ├─ profile.tsx
│  │  │  ├─ trading.tsx
│  │  │  └─ _layout.tsx
│  │  ├─ coin
│  │  │  └─ [symbol].tsx
│  │  ├─ index.tsx
│  │  └─ _layout.tsx
│  ├─ app.json
│  ├─ assets
│  │  └─ images
│  │     ├─ android-icon-background.png
│  │     ├─ android-icon-foreground.png
│  │     ├─ android-icon-monochrome.png
│  │     ├─ partial-react-logo.png
│  │     ├─ react-logo.png
│  │     ├─ react-logo@2x.png
│  │     ├─ react-logo@3x.png
│  │     └─ splash-icon.png
│  ├─ components
│  │  ├─ external-link.tsx
│  │  ├─ green.btn.tsx
│  │  ├─ haptic-tab.tsx
│  │  ├─ red_btn.tsx
│  │  ├─ themed-text.tsx
│  │  ├─ themed-view.tsx
│  │  └─ ui
│  │     └─ icon-symbol.tsx
│  ├─ constants
│  │  └─ theme.ts
│  ├─ eslint.config.js
│  ├─ expo-env.d.ts
│  ├─ hooks
│  │  ├─ use-color-scheme.ts
│  │  ├─ use-color-scheme.web.ts
│  │  ├─ use-theme-color.ts
│  │  └─ useBinance.ts
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ scripts
│  │  └─ reset-project.js
│  └─ tsconfig.json
└─ README.md

```
```
trading-app
├─ app_trading
│  ├─ .expo
│  │  ├─ devices.json
│  │  ├─ README.md
│  │  ├─ types
│  │  │  └─ router.d.ts
│  │  └─ web
│  │     └─ cache
│  │        └─ production
│  │           └─ images
│  │              └─ favicon
│  │                 └─ favicon-a4e030697a7571b3e95d31860e4da55d2f98e5e861e2b55e414f45a8556828ba-contain-transparent
│  │                    └─ favicon-48.png
│  ├─ app
│  │  ├─ (tabs)
│  │  │  ├─ markets.tsx
│  │  │  ├─ profile.tsx
│  │  │  ├─ trading.tsx
│  │  │  └─ _layout.tsx
│  │  ├─ coin
│  │  │  └─ [symbol].tsx
│  │  ├─ index.tsx
│  │  └─ _layout.tsx
│  ├─ app.json
│  ├─ assets
│  │  └─ images
│  │     ├─ android-icon-background.png
│  │     ├─ android-icon-foreground.png
│  │     ├─ android-icon-monochrome.png
│  │     ├─ partial-react-logo.png
│  │     ├─ react-logo.png
│  │     ├─ react-logo@2x.png
│  │     ├─ react-logo@3x.png
│  │     └─ splash-icon.png
│  ├─ components
│  │  ├─ external-link.tsx
│  │  ├─ green.btn.tsx
│  │  ├─ haptic-tab.tsx
│  │  ├─ red_btn.tsx
│  │  ├─ themed-text.tsx
│  │  ├─ themed-view.tsx
│  │  └─ ui
│  │     └─ icon-symbol.tsx
│  ├─ constants
│  │  └─ theme.ts
│  ├─ eslint.config.js
│  ├─ expo-env.d.ts
│  ├─ hooks
│  │  ├─ use-color-scheme.ts
│  │  ├─ use-color-scheme.web.ts
│  │  ├─ use-theme-color.ts
│  │  └─ useBinance.ts
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ scripts
│  │  └─ reset-project.js
│  └─ tsconfig.json
└─ README.md

```