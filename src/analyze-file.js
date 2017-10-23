const parseData = require('./parse-data');
const columnTypes = require('./column-types');

module.exports = {
  listColumnNamesWithTypes(matrix, columnNames) {
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
  },
};
