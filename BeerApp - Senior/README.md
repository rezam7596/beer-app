# Interview requirements

This repository contains the base code for recruitment exercise. Complete the tasks listed below and publish the solution on your github. Send us a link to your repository at least 1 day before the interview. 
We will discuss the proposed solution during the interview. You should be ready to present the working application on your local machine.

## Recruitment Task

- Beer page ~ style a cool beer page
- Home page favourites ~ add a list of favourite beers, do not clean after page reload
- Beer list filtering + pagination + sorting
- Progressive Web App, offline

## Task Implementation Considerations
Demo is available at https://beer-wiki.pages.dev/

### Tasks Overview
- **Beer Page Styling**
    - Used animations to improve visual appeal
    - Optimized for mobile, laptop screens, and large monitors.
<details style="margin-left: 20px">
  <summary>Screenshot</summary>

![image](https://github.com/rezam7596/beer-app/assets/13423390/23ea3603-0a23-4d6f-bc2c-0240fdf1ee20)

</details>

- **Home Page Favorites**
    - Utilizes local storage for persistence.
    - Syncs across multiple tabs or windows.
    - Implements home page search functionality.
<details style="margin-left: 20px">
  <summary>Screenshot</summary>

![image](https://github.com/rezam7596/beer-app/assets/13423390/6e4c74d8-1f5a-48fe-8629-326c28571e30)

</details>


- **Beer List Filtering + Pagination + Sorting**
    - Allows filtering and sorting by name and type.
    - Displays 10 items per page.
    - Uses URL search parameters for state persistence.
<details style="margin-left: 20px">
  <summary>Screenshot</summary>

![image](https://github.com/rezam7596/beer-app/assets/13423390/9ac02453-da57-4f83-8826-c1c0aef0da78)

</details>

- **Progressive Web App (PWA) + Offline Support**
    - Installable as a PWA.
    - Optimized caching for SPA.
    - Works offline; retains the latest 100 API call responses.
    - Limitation: Searching uncached APIs in offline mode.
<details style="margin-left: 20px">
  <summary>Screenshot</summary>

![image](https://github.com/rezam7596/beer-app/assets/13423390/806d5bb5-80f5-4f44-8fd8-9f633c2b9ac4)

</details>

### Other Considerations
- Handles loading states appropriately.
- Logs errors in the console during error scenarios (requires improvement).

### Technical Notes

- Performance checked using both Lighthouse and React Profiler.
- Full accessibility compliance.
- Complete responsiveness across devices.
- Component testing with Cypress conducted for the favorite feature. Test coverage is low and needs improvement.