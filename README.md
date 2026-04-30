# What to eat
## Overview
This webapp is used to view, manage and vote for recipes for a weekly meal plan.

## Installation
Clone:
`git clone https://github.com/cuds9896/what-to-eat.git`

Install dependencies:
`npm install`

## Framework
What To Eat uses a React tech stack with Vite, TypeScript, and TailwindCSS. Notable plugins include React-router for navigation, Redux for state management, and react-use-websocket for websocket connection handling.

## Current Features
Currently, the app features: 
1. A "login" page, allowing the user to enter a display name for the web socket (note: no auth is required as everything is run locally on the same network)
2. A landing page, which currently only contains placeholder information, but will be a dashboard of information once other features are built out. Descriptions of these will be described below.
3. A recipes page, which displays all recipes currently stored on the database (locally hosted) and allows the user to add new recipes, and edit/remove existing recipes. The list of recipes currently displays the title and the instructions and link to the video, where applicable. The list can be filtered based on ingredients used.

## Upcoming features
Features that are currently being developed are:
1. Additional recipe details, such as calories and other macros, country of origin, and key ingredients (such as protein) available to view.
2. Ability to vote on recipes for the week, can be done concurrently on separate devices using web sockets.
3. Generate a shopping list of ingredients required for the weekly meals.
4. An ingredient management screen that allows for the categorisation of recorded ingredients eg protein, carb etc.
5. Expand the filter feature so that ingredients are categorized and allow for selection of multiple ingredients.
6. Add a sort feature so list of recipes can be sorted based on categories such as name, calories etc.
7. Expansion of the web socket system, display a list of users that are online and info such as vote progress etc.

## Future plans
These additional features are potential additions that could be made to further develop the app, but currently are not being developed.
1. Display images of each dish for faster recognition.
2. A new database table that lists all ingredients already available to use, and subtract them from the generated shopping list to minimise food waste by preventing buying duplicate ingredients
3. Use OCR to read a shopping receipt and automatically populate the new "stored ingredients" table with the correct ingredients, streamlining the process.
4. Populate the landing page with dashboard-like modules, displaying things like today's recipe, ingredients that are running low.

## Decisions made
This section will provide some explanation on why certain decisions were made such as choice of technology etc.

### Locally hosting
I made the decision to host the system locally as I am already planning on running a home server for a number of other purposes. Examples include: a media server, home automation/smart device control etc. Running this locally also allowed me to learn more about basic SQL and databases without the additional features provided by external cloud tools such as AWS or Supabase, which would be overkill for the purposes of this app.

### React tech stack
React is the framework I am most familiar with, and it is what I use professionally, so it made sense to use a framework I am more confident in, as it allows me to focus more on the architecture of the app, rather than having to also learn a new framework, like flutter. I am aware of plugins like cordova that allows React apps to be installed and run on mobile devices, should I ever decide to release this in the (distant) future.

### Web sockets
Using web sockets to provide a real-time voting systemis probably not a necessary solution, but in my attempt to learn more about the backend side of development, I thought this was an appropriate way to incorporate the use of webSockets into the development.

### Other apps
I am sure there are many other apps that do the same, or at least very similar, to what this app does, but a lot of these apps seem to (understandably) operate on some sort of subscription model. I thought this would be a great opportunity to create something specifically tailored to my use-case, with the capacity to modify and configure it to suit my needs, should they change over time. Gaining experience with tools like web sockets is not something I get much opportunity to do at my job, and it can be quite daunting when looking at a production level codebase with limited experience.
