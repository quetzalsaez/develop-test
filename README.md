# My Application

Considering this is not a real world aplication, I chose to build the home page in plain html+css+js and the cart as a ssmall reactjs app.
I used the environment that was proposed in the test. In the source folder you can find an html document for the home page and another for the cart and in scripts is a general script (app.js), and in the "react-app" folder are the react files.

# Dependancies
> node ^10.15.3

# Get Started

- Fork this repo
- Clone your repo

## Install dependancies
```
npm i
``` 

## Build the app
```
grunt
```

## Start application and server
```
node server.js
```

## Creative assets  
Look in ```./design-assets```

### Fonts
All free to download or include from [https://fonts.google.com/specimen/Libre+Franklin](https://fonts.google.com/specimen/Libre+Franklin) (Regular and ExtraLight)

## Which Browsers/Devices or Virtualisation services did you check the application in?
Mozilla Firefox / Mac computer
Chrome / Mac computer
Chrome / Android emulator


## Anything you want to tell us?
- Assumptions?
I treated this as an exercise, so some desitions are based on showing different approaches and some are made to build in a simpler and quicker way. 
- Decisions?
I put extra focus on the user experience and clean code. 
The cart app is very simple in how it works. If it would be a real project, the ways APIs are called would be from a class in a separate file and folder and probably the whole project would be a Reactjs app. I would have used a state management tool like "Redux" to manage the states of the items in the cart and to show also how much items are on the menu in all pages.
If I had more time for the project I would have done a toggle and management of "dark/light" modus of the page (the variables are defined in this way and there is some commented code for the dark modus), I also would have worked on some small animations/transitions in the cart app when for example a whole row is deleted, so thay it has a transition or fade out and I would have worked more on the experience when the user selects the "Buy now" button.
- What you used to develop and test?
I used the proposed environment with grunt and express.


## What did you think of this test/exercise?
### What did you like?
1. The clarity of the tasks and posibilities.
2. The freedom of approach you could take.
