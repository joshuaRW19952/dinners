/**
 * Returns a random element from the provided array.
 * @param {array} arr 
 * @returns random array element
 */
export const getRandomElement = arr => arr.length === 0 ? undefined : arr[Math.floor(Math.random() * arr.length)];

/**
 * @param {string} type 
 * @param {array} excludedNames 
 * @returns random entry from dinnersInData
 */
export const getDinnerOfType = (type, excludedNames, data) => {
  const proposedDinner = getRandomElement(data);
  return !excludedNames.includes(proposedDinner.name) && (proposedDinner.type === type || !type) ? proposedDinner : getDinnerOfType(type, excludedNames, data);
};

export const generateDinners = async (dinners = { chicken: null, beef: null, other: null, wildcard: null },  exclusions = [], data) => {
  const dinnerNames = Object.keys(dinners).map(dinner => dinners[dinner] ? dinners[dinner].name : null).filter(el => el);
  const excludedNames = [...exclusions.map(excludedDinner => excludedDinner.name), ...dinnerNames];

  ['chicken', 'beef', 'other', 'wildcard'].reduce((acc, type) => {
    if (!acc[type]) acc[type] = getDinnerOfType(type, excludedNames, data);
    return acc;
  }, dinners);

  return [dinners, exclusions];
};