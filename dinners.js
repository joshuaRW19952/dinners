const fs = require('fs');
const readline = require('readline');

const dinnersInData = JSON.parse(fs.readFileSync('./dinners-in.json', 'utf8'));

const acceptableAnswers = { good: ['y', 'yes'],  bad: ['n', 'no'] };
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

/**
 * Lower level function to handle taking inputs for a question.
 * @param {string} question 
 * @returns string
 */
const askQuestion = question => new Promise((resolve) => rl.question(question, (answer) => resolve(answer)));

/**
 * Higher level function to handle taking inputs for a question. Will repeatedly prompt the question on unacceptable inputs.
 * @param {string} question 
 * @param {array} acceptableInputs 
 * @returns boolean
 */
const handleAskYesOrNoQuestion = async question => {
  // ask question
  let answer = await askQuestion(question);

  // keep taking input until an acceptable value is entered
  while (![...acceptableAnswers.good, ...acceptableAnswers.bad].includes(answer.toLowerCase())) {
    answer = await askQuestion(question);
  }
  
  return acceptableAnswers.good.includes(answer.toLowerCase());
};

/**
 * Returns a random element from the provided array.
 * @param {array} arr 
 * @returns random array element
 */
const getRandomElement = arr => arr.length === 0 ? undefined : arr[Math.floor(Math.random() * arr.length)];

/**
 * @param {string} type 
 * @param {array} excludedNames 
 * @returns random entry from dinnersInData
 */
const getDinnerOfType = (type, excludedNames) => {
  const proposedDinner = getRandomElement(dinnersInData);
  return !excludedNames.includes(proposedDinner.name) && (proposedDinner.type === type || !type) ? proposedDinner : getDinnerOfType(type, excludedNames);
}

const generateDinners = async (dinners = { chicken: null, beef: null, other: null, wildcard: null },  exclusions = []) => {
  // include existing dinner names in exclusion list
  const dinnerNames = Object.keys(dinners).map(dinner => dinners[dinner] ? dinners[dinner].name : null).filter(el => el);
  const excludedNames = [...exclusions.map(excludedDinner => excludedDinner.name), ...dinnerNames];

  // get random dinners of each type
  if (!dinners.chicken) {
    dinners.chicken = getDinnerOfType('chicken', excludedNames);
  }

  if (!dinners.beef) {
    dinners.beef = getDinnerOfType('beef', excludedNames);
  }

  if (!dinners.other) {
    dinners.other = getDinnerOfType('other', excludedNames);
  }

  if (!dinners.wildcard) {
    dinners.wildcard = getDinnerOfType(null, excludedNames);
  }
  
  // log result and prompt user
  console.log('dinners: ', dinners);

  if (await handleAskYesOrNoQuestion('accept dinners? ')) {
    // accepted dinners. stop execution
    console.log('accepted dinner selection...');
    rl.close();
  } else {
    // declined dinners. prompt user for exclusions
    if (await handleAskYesOrNoQuestion(`exclude ${dinners.chicken.name}? `)) {
      exclusions.push(dinners.chicken);
      dinners.chicken = null;
    } 

    if (await handleAskYesOrNoQuestion(`exclude ${dinners.beef.name}? `)) {
      exclusions.push(dinners.beef);
      dinners.beef = null;
    } 

    if (await handleAskYesOrNoQuestion(`exclude ${dinners.other.name}? `)) {
      exclusions.push(dinners.other);
      dinners.other = null;
    } 

    if (await handleAskYesOrNoQuestion(`exclude ${dinners.wildcard.name}? `)) {
      exclusions.push(dinners.wildcard);
      dinners.wildcard = null;
    }

    generateDinners(dinners, exclusions);
  } 
};

const main = async () => generateDinners();

main();
