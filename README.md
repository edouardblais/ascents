# About

Essentially, Ascents is a climbing web app to log and share your rock climbing ascents.

As an analogy, it is the Goodreads or the Letterboxd of the rock climbing world. Rock climbers from all over the world can create a user profile to add climbing routes to the Ascents database,
and then log them with specific details if they have made a successfull free climbing ascent of them.

The climbs and the details about each user's ascents are then available for consultation for all visitors of the app, thus enriching the rock climbing world with useful information. 


More specifically, here are the main functionalities:
	- Create and log in your user's profile
	- Follow other users to grow your Ascents social network
	- Consult and edit your profile info, see all the climbing routes and boulders you've logged, see your followers and who is following you, consult your dream list of climbs
	- Add ascents to existing climbs of Ascents database with details of your ascents
	- Create new climbs if they don't exist already
	- Explore Areas, Crags and climbing routes present in Ascents database
	- Follow Ascents news by consulting the recent ascents by the community and the people you specifically follow
	- Search for inspiring climbing routes to climb or get info on by using search filters
	- Search for specific climbs, crags, areas or users using the search bar
	- Get inspired by top rated climbs of the ascents database
	

# Under the hood

This app was built with React. 
The app uses Firebase as a BaaS, as all the data about climbs and users are stored and fetched from the Firestore. The users are also authenticated using Firebase Authentification.
The styling was done using pure CSS.

# Challenge

This app is definitely my biggest undertaking so far. Biggest in the size of the app itself (number of components, functionalities, lines of code, etc.) but also in complexity. 
From the smallest function to the biggest component, it was a real challenge to link everything together.

I made sure to have a clear architectural plan before starting to write the first line of code. 
It sure helped a ton, but many, many adjustements and new ideas had to be implemented during the development.
Making sure to keep track of everything, to not get lost in the ever growing functionalities was the main challenge.

# Further development

Here are the next steps to be realized on which I will work on:
	- Making the design responsive
	- Testing high functionalities with Jest
	- Implementing Redux to manage State


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
