# Copilot Instructions for Spin Master Rewards App

## Architecture Overview

This is a **Capacitor hybrid mobile app** (Android target) with a React web frontend. The app wraps a React + TypeScript web UI using Capacitor's bridge to access native Android capabilities. Build outputs from `npm run build` (Vite produces `dist/`) are embedded as web assets in the Android app.

**Key distinction**: Web code lives in the root (`src/`), while Android code lives in `android/`. The web UI is served from `dist/` during Android builds.

## Core Project Structure

```
src/
├── App.tsx              # Main React component (reward list + filtering)
├── types.ts             # Shared TypeScript interfaces (RewardItem, RewardType, ClaimState)
├── constants.tsx        # MOCK_REWARDS data (Vietnamese reward titles)
├── services/
│   └── rewardService.ts # Service layer: API calls, localStorage for claim state
└── components/
    ├── Header.tsx       # Fixed navigation header
    ├── RewardCard.tsx   # Reusable reward item card with claim/share actions
    └── Skeleton.tsx     # Loading skeleton UI
```

## Data Flow & State Management

1. **App.tsx** fetches rewards via `rewardService.getRewards()` on mount
2. **RewardCard** displays each reward; claim button updates UI immediately and persists state to localStorage
3. **ClaimState** (claim tracking) is hydrated from localStorage at startup and kept in sync
4. No external API integration yet—data is mocked; wire to real backend by updating `rewardService.getRewards()`

**Key pattern**: Immediate UI updates → Persist to localStorage → Open deeplinks in new tab

## Critical Developer Workflows

### Local Development
```bash
npm install          # Install web dependencies
npm run dev         # Start Vite dev server (port 3000)
npm run build       # Build Vite bundle → dist/
```

### Android Build & Deploy
```bash
npm run build                           # Generate dist/
npx capacitor sync android             # Copy dist/ to Android assets
cd android && ./gradlew installDebug   # Build and deploy to device/emulator
```

### Adding New Reward Fields
1. Update `RewardItem` interface in [types.ts](types.ts)
2. Update mock data in [constants.tsx](constants.tsx)
3. Update `RewardCard` rendering logic if UI changes needed
4. No schema migration needed for localStorage—JSON is flexible

## Project-Specific Conventions

- **Language**: All UI text is Vietnamese (see [constants.tsx](constants.tsx) reward titles)
- **Styling**: Tailwind CSS with custom utilities (`safe-top`, `grayscale-[0.3]`); no CSS files—inline class names
- **Deeplink format**: Rewards open via `coinmaster://` deeplinks to the native CoinMaster app (see [constants.tsx](constants.tsx) `link` field)
- **Icons**: From `lucide-react` library; emoji fallback for reward types (🌀 spin, 💰 coin, 🎁 both)
- **Timestamps**: Vietnamese date format (e.g., "Hôm nay, 24 Tháng 5")

## Integration Points

### Capacitor Bridge
- **Not actively used yet** for native calls, but framework is in place
- To add native features (camera, notifications, files): install Capacitor plugin via npm → run `npx capacitor sync android` → call plugin from web code
- Example: `const result = await Camera.getPhoto({...})`

### External Dependencies
- **React 19.2.3** + React DOM
- **Vite 6.2.0** for bundling
- **Capacitor 8.0.1** for native bridge
- **Tailwind CSS** (via build; check `index.html` for `@tailwind` imports)
- **lucide-react** for icons

## Build System Notes

- **TypeScript target**: ES2022 (modern browsers/Android WebView)
- **Vite server**: Runs on 0.0.0.0:3000 (accessible from Android emulator via 10.0.2.2:3000)
- **Capacitor webDir**: Points to `dist/`—Vite build output must be committed/synced before Android builds
- **Android target**: SDK 36 (Android 14); minimum SDK 24 (Android 7)

## Common Tasks

| Goal | Command |
|------|---------|
| Add new reward type | Extend `RewardType` enum in [types.ts](types.ts), add rendering in [RewardCard.tsx](components/RewardCard.tsx) |
| Change reward mock data | Edit [constants.tsx](constants.tsx) `MOCK_REWARDS` array |
| Integrate real API | Update `rewardService.getRewards()` to call backend endpoint |
| Deploy to Android | `npm run build` → `npx capacitor sync android` → `cd android && ./gradlew installDebug` |
| Clear claimed rewards in dev | Open browser DevTools → Application → Local Storage → delete `cm_claimed_rewards` key |
| Test deeplinks locally | Click "Nhận ngay" to open link in browser (emulator will not have CoinMaster app) |

## Code Patterns to Follow

- **Service layer**: Keep API/localStorage logic in `rewardService`; components call only service methods
- **TypeScript strict mode**: Use explicit types for all state and props (no `any`)
- **Hooks pattern**: Use `useCallback` for memoized handlers, `useEffect` for side effects
- **Accessibility**: Buttons include `active:scale-95` feedback; semantic HTML (no div-buttons)
- **Responsive design**: Tailwind breakpoints; header uses `safe-area-inset-top` for notch devices
