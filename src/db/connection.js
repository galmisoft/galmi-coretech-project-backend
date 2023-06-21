import sql from 'mysql';
export class MysqlConnect {
  static connect() {
    const sqlConnection = sql.createPool(JSON.parse(process.env.MYSQL_URI));
    sqlConnection.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
      return connection;
    });
  }

  static query(sqlQuery) {
    const sqlConnection = MysqlConnect.connect();
    sqlConnection.query(sqlQuery, (err, result) => {
      if (err) {
        throw err;
      }
      return result;
    });
  }
}