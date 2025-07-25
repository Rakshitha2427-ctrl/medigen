# Database Documentation

This directory contains the SQL export of the MySQL database used for the Medingen application.

## Database Export

- **medingen_db_export.sql**: This file contains the SQL commands to create the necessary tables and insert sample data for the application. It includes tables for:
  - Product Content
  - Salt Content
  - Reviews
  - Descriptions

## Importing the Database

To set up the database, follow these steps:

1. Ensure you have MySQL installed and running on your local machine.
2. Create a new database in MySQL (e.g., `medingen_db`).
3. Use the following command to import the SQL file:

   ```sql
   SOURCE path/to/medingen_db_export.sql;
   ```

   Replace `path/to/` with the actual path to the `medingen_db_export.sql` file.

4. Verify that the tables have been created and populated with sample data.

## Notes

- Ensure that your Flask API is configured to connect to the database you created.
- Modify any connection settings in the `backend/config.py` file as necessary to match your database setup.