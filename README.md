# About

Essentially, Ascents is a climbing web app to log and share your rock climbing ascents.

See it live: https://ascents-88d37.web.app/

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
	- Testing high functionalities with Jest
	- Implementing Redux to manage State

