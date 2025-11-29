#!/bin/bash

# Database creation script for Support Haven
# This script helps create the database if it doesn't exist

DB_NAME="support_haven"
DB_USER="${DB_USER:-hduser}"

echo "Creating database: $DB_NAME"

# Try different methods to create the database
if psql -U "$DB_USER" -d template1 -c "CREATE DATABASE $DB_NAME;" 2>/dev/null; then
    echo "✅ Database created successfully using template1"
elif psql -U postgres -c "CREATE DATABASE $DB_NAME;" 2>/dev/null; then
    echo "✅ Database created successfully using postgres user"
elif createdb -U "$DB_USER" "$DB_NAME" 2>/dev/null; then
    echo "✅ Database created successfully using createdb"
else
    echo "❌ Could not create database automatically"
    echo ""
    echo "Please create the database manually using one of these methods:"
    echo "1. psql -U postgres -c 'CREATE DATABASE $DB_NAME;'"
    echo "2. createdb -U postgres $DB_NAME"
    echo "3. Or use your PostgreSQL admin tool"
    echo ""
    echo "Then update backend/.env with your database credentials"
    exit 1
fi

echo "✅ Database '$DB_NAME' is ready!"

