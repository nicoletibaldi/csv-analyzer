module.exports = {
  createMatrix(data) {
    // remove the last trailing comma, which causes parsing issues
    const newData = data.slice(0, -1);
    // create an array of arrays using our csv data.
    // split on comma followed by newline, because
    // each csv row ends with a comma
    const rows = newData.split(',\n');
    return rows.map(row => (
      // when we split, ignore commas inside double quotes
      row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
    ));
  },

  getColumnNames(matrix) {
    // the first row of the matrix holds our column names
    return matrix.shift();
  },

  getColumnData(matrix, columnNumber) {
    const columnData = [];
    for (let i = 0; i < matrix.length; i++) {
      columnData.push(matrix[i][columnNumber]);
    }
    return columnData;
  },
};
