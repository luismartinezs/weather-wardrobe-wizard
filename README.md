# Weather Wardrobe Wizard

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
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

## References

- Implement react-query in NextJS: https://codesandbox.io/s/fetching-data-on-server-final-stl70?file=/pages/pokemon/%5Bid%5D.tsx
- Chakra UI / NextJS setup reference https://chakra-ui.com/getting-started/nextjs-guide
- Figma board: https://www.figma.com/file/5xJJxyBBjKqJpycZRNJ4tF/Weather-app?node-id=0%3A1&t=UW37yMJfACT8f4FK-0

### Stateless components

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