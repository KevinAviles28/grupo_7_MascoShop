module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": "mascoshop",
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "port":process.env.DB_PORT

  },
  "test": {
    "username": process.env.DB_USER,
    "password": null,
    "database": "database_test",
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": null,
    "database": "database_production",
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  }
}
