# LetsSnap frontend

## Requirements
Install npm, [polymer 2.0](https://www.polymer-project.org/2.0/start/install-2-0)

## Install dependencies
`bower install && npm install`

## Serve locally
`polymer serve --open`

## Deploying to firebase

### Dependencies
1. Install [firebase cli](https://firebase.google.com/docs/functions/get-started) with `npm install -g firebase-tools`
2. Create firebase account online and login on console using `firebase login`
3. Ask for permission from ck

### Deploy
`polymer build && firebase deploy`