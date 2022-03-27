# Tech test assessment

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements

- Mac OS X, Windows, or Linux
- [Yarn](https://yarnpkg.com/) package manager + [Node.js](https://nodejs.org/) v14.0.0 or newer

## Run
To run project on your local machine:
1. Install project dependencies
```shell
yarn install
```
2. Run the appplication
```shell
yarn start
```

## REFLECTION
1. What aspect of this exercise did you find most interesting?

Working on the UX part. I tried to find a balance between good design and the amount of work to implement.
The following aspects were important for me in terms of UX/UI:
   - Minimalism
   - Representing visual data than textual
   - User focus should be on important data
   - Fully responsive design with minimal effort

Considering edge-cases and milestones of my solution.

3. What did you find most cumbersome?

Unit testing, cause faced with some nuances of Chakra UI library, that make trickier component attributes testing.

5. If we were receiving messages from the Websocket Server in much higher rate, what optimization
   techniques could be used on the client side to improve the website’s performance and limit the amount of React re-renders? Include your answer in the reflections.

Memoization and Buffering. Already implemented simple buffering mechanism, and memoized some components. Please check my code.
This is kind of early optimization, but anyway... 
If Websocket Server stream messages more intensively, I would adjust my buffering solution.