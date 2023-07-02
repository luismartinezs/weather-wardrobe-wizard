# Weather Wardrobe Wizard

## Quick start

Run the development server:

```bash
pnpm dev # Warning: this will connect to production backend
```

Run project with emulated backend:

```bash
pnpm emu:dev
(cd functions && pnpm i && pnpm setupEnvVars) && (cd functions && pnpm build) # Setup cloud functions
pnpm emu:start # In separate terminal
```


## Playwright

```sh
pnpm exec playwright test
# Runs the end-to-end tests.

pnpm exec playwright test --ui
# Starts the interactive UI mode.

pnpm exec playwright test --project=chromium
# Runs the tests only on Desktop Chrome.

pnpm exec playwright test example
# Runs the tests in a specific file.

pnpm exec playwright test --debug
# Runs the tests in debug mode.

pnpm exec playwright codegen
# Auto generate tests with Codegen.

npx playwright show-report
# Shows the report of the last test run.
```

## Run locally as a dev

### Initial setup (only needed the first time)

- Prerequisites: `node`, `pnpm`, `firebase cli`
- Clone project to your local machine
- Install dependencies `pnpm i`
- Initialize firebase project and emulators `firebase init`
  - Do not override any local files
  - Accept to download the emulators
- Initialize cloud functions `(cd functions && pnpm i && pnpm setupEnvVars)`
- Build cloud functions `(cd functions && pnpm build)`
- To run the UI against the production backend, you will need to set a new `FIREBASE_APPCHECK_DEBUG_TOKEN` in the Firebase Console ([Use App Check with the debug provider in web apps  |  Firebase App Check](https://firebase.google.com/docs/app-check/web/debug-provider))

### After initial setup

- If you changed the cloud functions code since you last built them, rebuild them `(cd functions && pnpm build)`
- Run firebase emulators `pnpm emu:start`
- In a separate shell, run the UI in "emulator mode" `pnpm emu:dev`

## References

- Implement react-query in NextJS: https://codesandbox.io/s/fetching-data-on-server-final-stl70?file=/pages/pokemon/%5Bid%5D.tsx
- Chakra UI / NextJS setup reference https://chakra-ui.com/getting-started/nextjs-guide
- Figma board: https://www.figma.com/file/5xJJxyBBjKqJpycZRNJ4tF/Weather-app?node-id=0%3A1&t=UW37yMJfACT8f4FK-0

## Dev tasks

MVP:

- [x] Write down user stories
- [x] Determine dev tasks from user stories (planning dev tasks)
- [x] User should find widget visually appealing and beautiful
  - [x] Create mood dashboard figma
    - [x] Compile inspirational designs from dribbble and midjourney in Figma board
    - [x] Determine a general visual direction
    - [x] beautiful layout / UI for components
- [x] User can search for a location by name in a search input, and receives autosuggestions of specific places that he needs to select
  - [x] Style input
  - [x] Search autosuggestions endpoint
  - [x] Typing on input shows autosuggestions. User picks one
  - [x] Style dropdown (?)
  - [x] On clicking a button, location is selected
  - [x] Input shows currently selected location
  - [x] Input has close button
  - [x] User clicks on "Get weather" button
  - [x] Style button
  - [x] Loading state
  - [x] Error state
  - [x] Responsive
- [x] Given a location, user gets:
  - [x] Weather forecast for the next 5 days
    - [x] Day card
      - [x] daily av. temperature, min T and max T
      - [x] User can toggle between metric and imperial units
        - [x] styled switch
        - [x] compute units based on context value
      - [x] weather for each day (rain, sunny, cloudy, etc)
      - [x] Show icon with weather forecast for that day
      - [x] Styled card layout
  - [x] Cards form a responsive layout
  - [x] List of recommended clothing to pack for those 5 days
    - [x] Logic to generate clothing "tokens" from weather report
    - [x] Convert clothing "tokens" into a list of items that is visually meaningful and readable
    - [x] Responsive
    - [x] Style list
    - [x] Filters
      - [x] Add clothing id to each clothing item
      - [x] Store array of checked ids rather than array of booleans
      - [x] Use id to determine what to filter
- [x] Move all state to store so that components are completely presentational and no prop drilling is needed
  - [x] App state (zustand)
    - [x] units
    - [x] selected location
    - [x] checked clothing items + filter
  - [x] Server state (react-query)
    - [x] forecast
    - [x] location
  - [x] Computed state
    - [x] clothing suggestions
- [x] Reusable component that takes care of loading and error states
- [x] ci/cd pipeline that checks
  - [x] Unused imports and exports
  - [x] typescript errors
- [x] Turn it into a PWA
- [-] Emulate max calls to openweather API and handle this case
- [x] Implement CORS (https://github.com/vercel/next.js/blob/canary/examples/api-routes-cors/pages/api/cors.ts)

<!-- test pipeline -->

Post MVP:

- [x] E2E / Functional Tests
- [ ] Extended Weather Information, av.wind force, av. humidity...
- [ ] User Profile and Personalization
- [ ] More Detailed Clothing Suggestions: sunglasses, hats, or umbrellas, "light jeans for warm weather" or "thick jeans for cold weather", ...
- [ ] Weather Alerts
- [ ] Premium Paid Version That Shows Data for More Days
- [ ] Premium Feature That Shows AI Generated Description of the Clothes to Pack
- [ ] Advanced Search: search by zip code, autocomplete...
- [ ] Nicer icons: those look really good: https://www.figma.com/file/sz4DRhCqCRfbBCbhkRfcjy/Frosted-Glass-Weather-Icons-(Community)?node-id=2-2&t=4j1KNueeupVcUdaQ-0
- [ ] Localization
- [ ] Accessibility
- [ ] Color modes (light, dark)
- [ ] Footer
  - [ ] Feature request
  - [ ] Report issue

E2e Tests:

- [x] **Input and Selection of Location**
  - [x] Test that the user can enter a location name in the input field and that it populates a dropdown with up to 5 options.
  - [x] Test that the dropdown options are correctly formatted as "location name (country acronym)".
  - [x] Test that the user can select an option from the dropdown.
  - [x] Test that the "Get weather in {location}" button becomes enabled once an option is selected.
- [x] **Weather Forecast Widget**
  - [x] Test that the weather forecast widget loads after the user clicks the "Get weather in {location}" button.
  - [x] Test that the widget shows a forecast for the next 5 days.
  - [x] Test that each day's forecast includes a day label, a date label, a weather icon, a weather text label, and two lines representing the max and min temperatures.
  - [x] Test that the user can scroll horizontally through the forecast.
  - [x] Test that the user can toggle between metric and imperial units and that the temperature values update accordingly.
- [x] **Clothing Suggestions Widget**
  - [x] Test that the clothing suggestions widget loads after the user clicks the "Get weather in {location}" button.

## Firebase references

- https://firebase.google.com/docs/auth/web/google-signin
- https://medium.com/@monkeyscript/google-authentication-using-firebase-in-next-js-f83954b4b63d
- https://www.freecodecamp.org/news/create-full-stack-app-with-nextjs13-and-firebase/

## Development trouble shooting

- Q: While emulating, firestore rules keep erroring out although they seem correct
- A: Try restarting the emulator

- Q: Locally run Playwright tests fail after `page.goto('/')`
- A: Try restarting the local server

## Project structure

- File names and folder names are kebab-cased, except for react component folders and files, which are PascalCased
- `pages` folder is as determined by Next.js
- Each feature has its own folder inside `src/features`, a feature, loosely speaking, might be something that brings a new specific functionality to the app
- Inside each feature, you might find folders such as `components`, `hooks`, `store`, `api`, `types`, `utils`, etc.
- Each file related to a specific feature goes in the corresponding subfolder inside that feature's folder
- Files which contain "common" code, or code related to multiple features, go in the appropriate subfolder directly inside the `src` folder
- Besides "features", we might have "services", e.g. firebase. In this case, there is a `src/firebase/` folder which contains code related to interacting with the firebase instance
- New components / features can be added with `pnpm plop`