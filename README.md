# walter-xavelo.github.io

Public GitHub Pages site for `walter-xavelo`. It hosts no binaries.

## futbot-app/

Landing page for the Futbot mobile app: https://walter-xavelo.github.io/futbot-app/

It provides separate Android and iOS choices in English, Spanish and Catalan. Both link to
platform-specific EAS builds using active green cards. Android has APK sideload instructions;
iOS users follow the instructions on its Expo build page. The page also highlights
team following, Premium player tracking and optional Android final-result notification settings.

### Releasing a new build

After each EAS build:

1. Edit `futbot-app/index.html`: set the new version in the `.version` paragraph (`<span id="v">`).
2. Replace the Android download link with the new EAS build URL.
3. Update the iOS download link independently when the owner supplies a new iOS EAS build URL.
4. Commit and push to `main`; Pages redeploys.

Only public information belongs here. Never commit secrets or APK files.

The download site has its own SemVer, separate from the displayed Android app version.
Keep `package.json`, `package-lock.json` and the `futbot-site-version` meta tag aligned.
Run `npm run check` before opening a PR.
