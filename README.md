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

## References

- Implement react-query in NextJS: https://codesandbox.io/s/fetching-data-on-server-final-stl70?file=/pages/pokemon/%5Bid%5D.tsx
- Chakra UI / NextJS setup reference https://chakra-ui.com/getting-started/nextjs-guide
- Figma board: https://www.figma.com/file/5xJJxyBBjKqJpycZRNJ4tF/Weather-app?node-id=0%3A1&t=UW37yMJfACT8f4FK-0

### Stateless components

## Dev tasks

MVP:

- [x] Write down user stories
- [x] Determine dev tasks from user stories (planning dev tasks)
- [ ] User should find widget visually appealing and beautiful
  - [x] Create mood dashboard figma
    - [x] Compile inspirational designs from dribbble and midjourney in Figma board
    - [x] Determine a general visual direction
    - [ ] beautiful layout / UI for components
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
- [ ] Emulate max calls to openweather API and handle this case
- [ ] Footer
  - [ ] Feature request
  - [ ] Report issue
- [ ] Implement CORS (https://github.com/vercel/next.js/blob/canary/examples/api-routes-cors/pages/api/cors.ts)
- [ ] Nicer icons: those look really good: https://www.figma.com/file/sz4DRhCqCRfbBCbhkRfcjy/Frosted-Glass-Weather-Icons-(Community)?node-id=2-2&t=4j1KNueeupVcUdaQ-0

<!-- test pipeline -->

Nice extras

- [ ] Weather card shows
  - [ ] av. wind force each day
  - [ ] av. humidity each day
  - [x] Show T point with relative position based on value
  - [ ] T line fades at the sides
  - [ ] Beautiful icon generated with midjourney
  - [ ] Beautiful background matching weather, generated with midjourney
- [ ] Premium version with more features (because the weather API is not free)
