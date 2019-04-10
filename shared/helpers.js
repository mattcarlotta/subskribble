const lorem = require('lorem-ipsum');
const moment = require('moment');
const random = require('lodash/random');

const loremipsum = () => lorem({
  count: random(3, 10), // Number of words, sentences, or paragraphs to generate.
  units: 'paragraphs', // Generate words, sentences, or paragraphs.
  sentenceLowerBound: random(5, 20), // Minimum words per sentence.
  sentenceUpperBound: random(5, 20), // Maximum words per sentence.
  paragraphLowerBound: random(5, 20), // Minimum sentences per paragraph.
  paragraphUpperBound: random(5, 20), // Maximum sentences per paragraph.
  format: 'plain', // Plain text or html.
  suffix: '<br />', // The character to insert between paragraphs.
});

const tokenGenerator = (str, tlen) => {
  const arr = [...str];
  const max = arr.length - 1;
  let token = '';
  for (let i = 0; i < tlen; i += 1) {
    const int = random(max);
    token += arr[int];
  }
  return token;
};

const beginofMonth = () => moment().startOf('month');

const convertDateToISO = date => moment(date)
  .utcOffset(-7)
  .toISOString(true);

const createRandomText = () => loremipsum();

const createRandomToken = () => tokenGenerator(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$/.',
  64,
);

const createUniqueTemplateName = name => name
  .trim()
  .toLowerCase()
  .replace(/[^\w\s]/gi, '')
  .replace(/ /g, '-');

const currentDate = () => moment()
  .utcOffset(-7)
  .toISOString(true);

const endofMonth = () => moment().endOf('month');

const parseStringToFloat = str => parseFloat(str);

const parseStringToNum = str => parseInt(str, 10);

const sendError = (err, res, done) => {
  return res.status(400).json({ err: err.toString() });
  done(); /* eslint-disable-line no-unreachable */
};

export {
  beginofMonth,
  convertDateToISO,
  createRandomText,
  createRandomToken,
  createUniqueTemplateName,
  currentDate,
  endofMonth,
  parseStringToFloat,
  parseStringToNum,
  sendError,
};
