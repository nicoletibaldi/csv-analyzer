const fileSystem = require('fs');

const parseData = require('./parse-data');
const analyzeFile = require('./analyze-file');

const testFile = 'test-contacts.csv';

function analyzeCsvData(data) {
  const matrix = parseData.createMatrix(data);
  const columnNames = parseData.getColumnNames(matrix);
  return analyzeFile.listColumnNamesWithTypes(matrix, columnNames);
}

fileSystem.readFile(testFile, 'utf-8', (err, data) => {
  if (err) throw err;
  /* eslint-disable no-console */
  console.log(analyzeCsvData(data));
  /* eslint-disable no-console */
});
