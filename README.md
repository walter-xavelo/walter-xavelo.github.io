# walter-xavelo.github.io

Public GitHub Pages site for `walter-xavelo`. It hosts no binaries.

## futbot-app/

Landing page for the Futbot mobile app: https://walter-xavelo.github.io/futbot-app/

It provides separate Android and iOS choices in English, Spanish and Catalan. Android links to
the latest EAS build and has sideload instructions. iOS is shown as unavailable and disabled until
a verified distribution link is provided; do not add a placeholder URL.

### Releasing a new build

After each EAS build:

1. Edit `futbot-app/index.html`: set the new version in the `.version` paragraph (`<span id="v">`).
2. Replace the Android download link with the new EAS build URL.
3. Keep iOS disabled until a real, verified distribution URL is available. When one is supplied,
   update the iOS choice independently and review its install instructions before enabling it.
4. Commit and push to `main`; Pages redeploys.

Only public information belongs here. Never commit secrets or APK files.
