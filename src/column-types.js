const moment = require('moment');

const constants = require('./constants');

module.exports = {
  getColumnTypesAndWordFreq(column) {
    // iterating over these multiple times would be more expensive, so
    // i decided to create both objects in the same function
    const typeObj = {};
    const wordFreq = {};
    for (let i = 0; i < column.length; i++) {
      const currentValue = column[i];
      // create an object detailing the frequency of words in order to
      // later determine if the column is multiple choice
      if (wordFreq[currentValue]) {
        wordFreq[currentValue]++;
      } else {
        wordFreq[currentValue] = 1;
      }
      // if our value can be parsed as a moment, it is not simply a string,
      // it is a datetime. however, we need to give moment a format for our
      // dates. moment can parse some non-date strings containing a number
      // as a date, which we don't want.
      if (moment(currentValue, 'MM/DD/YYYY').isValid()) {
        if (typeObj[constants.DATE_TIME]) {
          typeObj[constants.DATE_TIME]++;
        } else {
          typeObj[constants.DATE_TIME] = 1;
        }
        // if our value is an empty string, there is no value, so for our
        // purposes, the type is null
      } else if (currentValue === '') {
        if (typeObj[constants.NULL]) {
          typeObj[constants.NULL]++;
        } else {
          typeObj[constants.NULL] = 1;
        }
        // if all of the other conditions fail, and the value's type is string,
        // we can safely assume it is 'text' (for our purposes)
      } else if (typeof currentValue === 'string') {
        if (typeObj[constants.TEXT]) {
          typeObj[constants.TEXT]++;
        } else {
          typeObj[constants.TEXT] = 1;
        }
      }
    }
    return [typeObj, wordFreq];
  },

  orderColumnTypes(columnTypes) {
    // sort the types from most to least frequent
    const sortedTypes = Object.keys(columnTypes).sort((a, b) => (
      columnTypes[b] - columnTypes[a]
    ));
    return sortedTypes;
  },

  getMostFrequentType(typeArray) {
    return typeArray[0];
  },

  isMultipleChoice(wordFreq, columnLength) {
    // we can conclude if a column is multiple choice by determining the
    // following: the minimum percentage frequency of any multiple choice
    // value is the number of unique values divided by the column's length
    const keys = Object.keys(wordFreq);
    const numUniqueValues = keys.length;
    const minPercentage = numUniqueValues / columnLength;
    for (let i = 0; i < numUniqueValues; i++) {
      const currentValue = keys[i];
      const wordFreqPercentage = wordFreq[currentValue] / columnLength;
      if (wordFreqPercentage >= minPercentage) {
        // if ANY of the values meet this condition, the column is MC
        return true;
      }
    }
    return false;
  },

  assignType(multipleChoice, wordFreq, mostFreq) {
    let type;
    if (multipleChoice) {
      type = {
        type: constants.MULTIPLE_CHOICE,
        choices: Object.keys(wordFreq),
      };
    } else {
      type = { type: mostFreq };
    }
    return type;
  },
};
