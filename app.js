const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

/**intergrate LESS in project */


app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});


/**
 * @description  List all anime names on home page.
 * http://localhost:3000/home
*/
app.get('/home', async (req, res) => {
  const url = 'https://zoro.to/home';
  const animeNames = [];

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    $('.dynamic-name').each((i, el) => {
      /***el is every element in JQuery collection that matches dynamic-name */
      let name = $(el).text();
      name = name.replace(/\n/g, '');
      animeNames.push({ rating: i, title: name });
    });

    res.send(animeNames);
  } catch (err) {
    console.error(err);
  }
});


/***Anime names starting with letter A at begining 
 * Hardcoded version


app.get('/startWithA', async (req, res) => {
  const url = 'https://zoro.to/home';
  const animeNames = [];
  let arr = [];

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    $('.dynamic-name').each((i, el) => {

      let name = $(el).text();
      name = name.replace(/\n/g, '');
      animeNames.push({ rating: i, title: name });
    });

    //check if tiltle index at 0 has a character a or A
    //if so store word in new array

    for (let i = 0; i < animeNames.length; i++) {
      if (animeNames[i].title.charAt(0) === ("a") ||
        (animeNames[i].title.charAt(0) === ("A"))) {
        arr.push(animeNames[i]);

      }
    }

    res.send(arr);
  } catch (err) {
    console.error(err);
  }
});*/



/**
 * @title Find anime titles that start with a certain letter
 * @description Returns an array of anime titles from https://zoro.to/home whose first letter matches a specified letter
 * @param {string} letter - the letter to match 
 * Example  http://localhost:3000/startWithLetter?letter=c
 */
app.get('/startWithLetter', async (req, res) => {
  const url = 'https://zoro.to/home';
  const animeNames = [];
  let arr = [];

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    $('.dynamic-name').each((i, el) => {
      let name = $(el).text();
      name = name.replace(/\n/g, '');
      animeNames.push({ rating: i, title: name });
    });

    // check if title index at 0 has the same first letter as the query parameter
    // if so, store the title in the new array
    const queryLetter = req.query.letter;
    if (queryLetter) {
      for (let i = 0; i < animeNames.length; i++) {
        if (animeNames[i].title.charAt(0).toLowerCase() === queryLetter.toLowerCase()) {
          arr.push(animeNames[i]);
        }
      }
    }

    res.send(arr);
  } catch (err) {
    console.error(err);
  }
});


/**
 * @title Find anime titles that end with a certain letter
 * @description Returns an array of anime titles from https://zoro.to/home whose last letter matches a specified letter
 * @param {string} letter - the letter to match (case insensitive)
 * Example http://localhost:3000/endWithLetter?letter=s
 */
app.get('/endWithLetter', async (req, res) => {
  const url = 'https://zoro.to/home';
  const animeNames = [];
  const arrEnd = [];

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    $('.dynamic-name').each((i, el) => {
      let name = $(el).text();
      name = name.replace(/\n/g, '');
      animeNames.push({ rating: i, title: name });
    });

    const queryLetter = req.query.letter;

    if (queryLetter) {
      for (let i = 0; i < animeNames.length; i++) {
        let currTitleLength = animeNames[i].title.length - 1;
        if (animeNames[i].title.charAt(currTitleLength).toLowerCase() === queryLetter.toLowerCase()) {
          arrEnd.push(animeNames[i]);
        }
      }
    }

    res.send(arrEnd);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});




/**
 * @desc Checks if the anime with the given title exists on the zoro.to homepage.
 * @param {string} req.params.title - The title of the anime to search for.
 * @return {boolean} True if the anime exists, false otherwise.
 * Does not work yet
 */
app.get('/hasAnime/:title', async (req, res) => {
  const url = 'https://zoro.to/home';
  const animeNames = [];

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    $('.dynamic-name').each((i, el) => {
      let name = $(el).text().trim();
      animeNames.push({ rating: i, title: name });
    });

    const containName = animeNames.some((anime) => anime.title.toLowerCase().includes(req.params.title.toLowerCase()));

    res.send(containName);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});



/**
 * @description select from anime data where rating >= 0 and within current array length
 * 
 */

/**
 * @description inserts anime name into array.
 * @name will be added to array.
 */


/**
 * @name name of anime tile to be inserted into array
 * @description given rating, change name of anime title
 */


/**
 * @description given rating, delete object
 */









app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
});
