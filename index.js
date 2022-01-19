// Imports "path" and "fs" modules needed to store images to directory
import fs from 'node:fs';
import path from 'node:path';
// Imports "fetch" module needed to require HTML strings from URL
import fetch from 'node-fetch';
// Imports "request" module needed to require the images from the URL
import request from 'request';

// --------------------------------------------------------
// --------------------------------------------------------

// Fetches HTML strings from desired URL
const response1 = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const htmlString = await response1.text();

// console.log(htmlString); logs out the entire HTML string from the given URL

// Get images from HTML string with RegEx

function getImages(string) {
  const imgRex = /<img[^>]+src="([^">]+)/g; // Defines the regular expression that is used to search for the images
  const images = []; // Creates array where images would get stored
  let img; // The variable that the search with exec() gets stored to
  while ((img = imgRex.exec(string))) {
    // Uses the built-in exec()-method search for the given images
    images.push(img[1]); // Uses the push()-method to add found image to the created array
  }
  return images;
}
// console.log(getImages(htmlString));      // logs out all of the images from the URL, if wished for

const arrayImages = getImages(htmlString); //
for (let i = 0; i < 10; i++) {
  // loops over the array of images
  // console.log(arrayImages[i]);         // logs out the first ten image URL's, if wished for
  request
    .get(arrayImages[i])
    .on('error', function (err) {
      console.log(err);
    })
    .on('response', function (response) {
      if (response.statusCode === 200) {
        console.log(`Successfully retrieved meme_image0${i + 1} from url.`);
      }
    })
    .pipe(fs.createWriteStream(path.join('memes', `meme_image0${i + 1}`))); // stores given image to memes folder, also adds the number of the image index as the filename

  // https://passion-stickers.com/870-large_default/bender-futurama.jpg
}
