# meetup.Map

## What?
* Shows all the meetups within a one mile radius of any location clicked on the map.
* Gives detail about each meetup marker displayed on the map.

## When?
* Got a free evening? Want some intellectual stimulation? Click meetup.Map.

## Why?
* It's often tedious to fill in your post-code to find the meetups nearest to you on meetup.com.
* With meetup.Map, you don't have to go far to bring up the meetUps nearest to you.
* The app also enables the user to browse with ease while in the same window.

## How?
* Coordinates are collected from the on-click event using the Google Maps API.
* These are passed in a call to the MeetUp API to return all the meetups within a one mile radius.
* Authorization and authentication is done through OAUTH.
* Handlebars is used to display the data in the html.
* Cookies send data collected from the API calls between the front and back ends.
