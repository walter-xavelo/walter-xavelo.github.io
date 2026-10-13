# walter-xavelo.github.io

Public GitHub Pages site for `walter-xavelo`. It hosts no binaries.

## futbot-app/

Landing page for the Futbot Android app: https://walter-xavelo.github.io/futbot-app/

It links to the latest EAS build and documents how to install it.

### Releasing a new build

After each EAS build:

1. Edit `futbot-app/index.html`: set the new version in the `.version` paragraph (`<span id="v">`).
2. Replace the button `href` with the new EAS build URL.
3. Commit and push to `main`; Pages redeploys.

Only public information belongs here. Never commit secrets or APK files.
