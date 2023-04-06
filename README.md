# About

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project is about creating a custom user input height and width to generate a matrix. 

It will have 4 states on each block:
Start: Green
End: Red
Blocked: Black
Path: Yellow

For the shortest path it will do a BFS for traversing and check for blocked block. 

In the render part I wrote a map of map to iterate through rows and cols that user inputed. And for each cell it will have a onClick function to identify which is being clicked and check for start/end/block. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Test Plan

Basic use case demo video.\
https://user-images.githubusercontent.com/18017971/230273403-27a370ca-e998-47a9-9132-d49e7462a416.mov
