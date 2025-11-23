## Notes (Offline Multi-User Notes App)

This is Expo React Native project lets multiple people share a single device while keeping their notes private. Accounts and notes live entirely in `AsyncStorage`, so everything works without a network connection.

### Highlights
- **Offline authentication** – create a username + PIN on the device, switch or sign in to any stored account, and keep each user’s notes isolated.
- **Full CRUD for notes** – add, edit, and delete notes with rich previews and timestamps.
- **Persistent images** – attach photos from the gallery or camera; files are copied into the app sandbox so they remain after restarts.
- **Search & sort** – filter by title/body text and sort by last update time or title (both directions) simultaneously.
- **Session management** – quick logout button, an in-app switcher on the notes screen for hopping between profiles.

### Setup Instructions
1. **Install dependencies**
	```bash
	npm install
	```
2. **Run the Expo server**
	```bash
	npx expo start
	```
3. **Open the app**
	- Press `a` in the Expo CLI to launch Android, `i` for iOS simulator, or scan the QR code with Expo Go on a physical device.
4. **Create accounts & notes**
	- Sign up with a unique username + PIN, then start adding notes. Images can be pulled from the gallery or captured with the camera.

### Libraries Used
- [`expo-router`](https://expo.github.io/router/docs) – file-based navigation and routing.
- [`@react-native-async-storage/async-storage`](https://react-native-async-storage.github.io/async-storage/) – offline persistence for users and notes.
- [`expo-image-picker`](https://docs.expo.dev/versions/latest/sdk/imagepicker/) – gallery/camera access for note images.
- [`expo-file-system`](https://docs.expo.dev/versions/latest/sdk/filesystem/) – stores image copies inside the app sandbox so they survive restarts.
- [`nativewind`](https://www.nativewind.dev/) – Tailwind-style utility classes for styling.
- Core Expo SDK helpers (`expo-font`, `expo-splash-screen`, etc.) that ship with the template remain for fonts and startup polish.

### Project Tips
- All user and note data (including the active session) live in `AsyncStorage`. Clearing the app’s storage resets everything.
- Use the **Switch** button in the notes header to pick another saved account without leaving the notes tab.
- Image permissions are requested on demand and can be managed from the device settings if previously denied.
- Run `npm run lint` to keep the TypeScript and Hooks rules consistent before committing changes.


### Build
- Build link : [a41e61b7-039f-4742-b7e3-3e881e5c7fda — Expo build](https://expo.dev/accounts/bharathkumarreddy2004/projects/notes/builds/a41e61b7-039f-4742-b7e3-3e881e5c7fda)

### Screen Recording
- Screen Recording : [View Here !](https://drive.google.com/file/d/16wbZF3ur9pX_DCGb4rvLqXMSbKo2qR3Y/view?usp=drivesdk)
