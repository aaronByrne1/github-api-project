# github-api-project

This project utilises the Github API to pull and display data of users.


https://user-images.githubusercontent.com/65355719/149763347-6a709dbb-b2f2-4d72-a40f-2015fe727861.mp4

# About this Project:
This project gets the inputted users amount of followers and the amount of followers their followers have. It displays this data in two graphs. A pie chart and bar chart. Within the pie chart you can filter out certain people to get a more focused view on other users and how they compare against the rest.

It also goes through every public repository the user has and finds their most used language by adding the scores up. By pressing the change dataset button, it switches from followers data to the languages data and displays this in a pie and bar chart also.

Any github user can be analysed. 

# To download this project
```
yarn install
```
```
cd client
```
```
yarn install
```
```
cd ..
```
```
yarn dev
```
This should download all packages needed and run the development environment to view the web page.
This uses the octokit.js library so a personal access token is needed.

