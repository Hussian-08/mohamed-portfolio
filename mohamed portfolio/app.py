
from flask import Flask, render_template
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

# MySQL database configuration
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "Hussian@2005",
    "database": "mohamed_portfolio"
}


def get_db_connection():
    try:
        connection = mysql.connector.connect(**DB_CONFIG)

        if connection.is_connected():
            return connection

    except Error as error:
        print("MySQL connection error:", error)

    return None


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/test-db")
def test_db():
    connection = get_db_connection()

    if connection is None:
        return "MySQL connection failed. Check your database settings.", 500

    try:
        cursor = connection.cursor()
        cursor.execute("SELECT DATABASE()")
        database_name = cursor.fetchone()[0]

        return f"Successfully connected to database: {database_name}"

    except Error as error:
        return f"Database query failed: {error}", 500

    finally:
        cursor.close()
        connection.close()


if __name__ == "__main__":
    app.run(debug=True)
