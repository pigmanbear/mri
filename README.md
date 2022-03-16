# Javascript: Image Carousel
Complete a partially completed JavaScript application. Complete the application as shown below in order to pass all the unit tests.

## Environment 

- Node Version: 12(LTS)
- Default Port: 8000

## Application Demo:
![](https://hrcdn.net/s3_pub/istreet-assets/wvnVKubvkl0wA6VMfPi21w/1080335-vanillajs-image-carousel-medium.gif)

## Application description

Implement a carousel for a fixed size image collection.

Requirements:

- Implement a carousel for a collection of 5 images, img-1.png through img-5.png.
- The carousel displays the first image initially, img-1.png.
- Clicking on a prev / next arrow should show the previous or next image.
- Clicking on an image indicator should show the new image. 
- Clicking on next when the last image is shown should display the first image (cycling).
- Clicking on prev when the first image is showing should display the last image (cycling).
- Clicking the checkbox with the label Slide should start an automatic display of the images in the carousel with a 3 second interval between images.
- Unchecking the checkbox with the label Slide should stop an automatic display of the images.

All the markup for the question has been added. As a candidate, you have to complete the Javascript file to implement the above-stated features/functionality.

## Project Specifications

**Read Only Files**
- `test/*`
- `src/index.js`
- `src/index.html`
- `app.js`

**Commands**
- run: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm start
```
- install: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm install
```
- test: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm test
```
