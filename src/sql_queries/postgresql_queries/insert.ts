function insertPostgreSql(tableName: string, columns: string[]): string {
  let insert: string = "insert into " + tableName + " (";
  for (let index = 0; index < columns.length; index++) {
    if (index === columns.length - 1) {
      insert += columns[index];
    } else {
      insert += columns[index] + ",";
    }
  }
  insert += ") values (";
  for (let index = 1; index <= columns.length; index++) {
    if (index === columns.length) {
      insert += "$" + index;
    } else {
      insert += "$" + index + ",";
    }
  }
  insert += ")";

  return insert;
}

export default insertPostgreSql;
