export function insertWithExist(
  tableName: string,
  columns: string[],
  email: string
) {
  let insert: string = "insert into " + tableName + " (";
  for (let index = 0; index < columns.length; index++) {
    if (index === columns.length - 1) {
      insert += columns[index];
    } else {
      insert += columns[index] + ",";
    }
  }
  insert += ") select ";
  for (let index = 1; index <= columns.length; index++) {
    if (index === columns.length) {
      insert += "$" + index;
    } else {
      insert += "$" + index + ",";
    }
  }
  insert +=
    " where not EXISTS (select 1 from " +
    tableName +
    " where email='" +
    email +
    "')";

  return insert;
}
