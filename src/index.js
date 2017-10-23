const fileSystem = require('fs');
const prompt = require('prompt');

const parseData = require('./parse-data');
const columnTypes = require('./column-types');

// const testFile = 'test-contacts.csv';

function listColumnNamesWithTypes(matrix, columnNames) {
  const list = {};
  for (let i = 0; i < columnNames.length; i++) {
    const currentColumn = columnNames[i];
    const columnData = parseData.getColumnData(matrix, i);
    const [typeObj, wordFreq] = columnTypes.getColumnTypesAndWordFreq(columnData);
    const typesArr = columnTypes.orderColumnTypes(typeObj);
    const mostFreq = columnTypes.getMostFrequentType(typesArr);
    const multipleChoice = columnTypes.isMultipleChoice(
      wordFreq,
      columnData.length,
    );
    list[currentColumn] = columnTypes.assignType(
      multipleChoice,
      wordFreq,
      mostFreq,
    );
  }
  return list;
}

function analyzeCsvData(fileName) {
  fileSystem.readFile(fileName, 'utf-8', (err, data) => {
    if (err) throw err;
    const matrix = parseData.createMatrix(data);
    const columnNames = parseData.getColumnNames(matrix);
    return listColumnNamesWithTypes(matrix, columnNames);
  });
}

prompt.start();

prompt.get(['file'], (err, result) => {
  /* eslint-disable no-console */
  console.log(analyzeCsvData(result.file));
  /* eslint-disable no-console */
});
