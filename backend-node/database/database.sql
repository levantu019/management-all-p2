-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- User account information
CREATE TABLE Account (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(100),
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Area information
CREATE TABLE Area (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Category information
CREATE TABLE Category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    priority INT,
    parent_id INTEGER REFERENCES Category(id) ON DELETE CASCADE,
    area_id INTEGER REFERENCES Area(id) ON DELETE CASCADE
);

-- Target information
CREATE TYPE target_class AS ENUM ('static', 'dynamic', 'other');
CREATE TABLE Target (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    coordinate GEOMETRY(POINT, 4326),
    boundary GEOMETRY(POLYGON, 4326),
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    type target_class NOT NULL,
    icon VARCHAR(255),
    general_information TEXT,
    target_id INTEGER REFERENCES Target(id) ON DELETE SET NULL
);

-- Building information
CREATE TABLE Building (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    coordinate GEOMETRY(POINT, 4326),
    description TEXT,
    target_id INTEGER REFERENCES Target(id) ON DELETE CASCADE
);

-- Target_Category junction table (many-to-many relationship)
CREATE TABLE Target_Category (
    id SERIAL PRIMARY KEY,
    target_id INTEGER NOT NULL REFERENCES Target(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES Category(id) ON DELETE CASCADE,
    UNIQUE(target_id, category_id)
);

-- Image information
CREATE TABLE Image (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    datetime TIMESTAMP NOT NULL,
    resolution VARCHAR(100),
    description TEXT,
    target_id INTEGER REFERENCES Target(id) ON DELETE CASCADE
);

-- Report information
CREATE TABLE Report (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL,
    number VARCHAR(100) NOT NULL,
    account_id INTEGER REFERENCES Account(id) ON DELETE SET NULL,
    target_id INTEGER REFERENCES Target(id) ON DELETE SET NULL,
    category_id INTEGER REFERENCES Category(id) ON DELETE SET NULL
);

-- Information_class table
CREATE TABLE Information_class (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Information table
CREATE TABLE Information (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date_default TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_optional TIMESTAMP,
    description TEXT,
    coordinate GEOMETRY(POINT, 4326),
    boundary GEOMETRY(POLYGON, 4326),
    information_class_id INTEGER REFERENCES Information_class(id) ON DELETE SET NULL,
    target_id INTEGER REFERENCES Target(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES Category(id) ON DELETE SET NULL
);

-- Warehouse_class table - stores types of data in warehouse table (e.g., document, profile, etc.)
CREATE TABLE Warehouse_class (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Level of importance for warehouse items
CREATE TYPE level_important AS ENUM ('high', 'medium', 'low');

-- Area_Warehouse table
CREATE TABLE Area_Warehouse (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type level_important NOT NULL DEFAULT 'medium',
    date_default TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_optional TIMESTAMP,
    description TEXT,
    warehouse_class_id INTEGER REFERENCES Warehouse_class(id) ON DELETE SET NULL,
    area_id INTEGER REFERENCES Area(id) ON DELETE CASCADE
);

-- Category_Warehouse table
CREATE TABLE Category_Warehouse (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type level_important NOT NULL DEFAULT 'medium',
    date_default TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_optional TIMESTAMP,
    description TEXT,
    warehouse_class_id INTEGER REFERENCES Warehouse_class(id) ON DELETE SET NULL,
    category_id INTEGER REFERENCES Category(id) ON DELETE CASCADE
);

-- Target_Warehouse table
CREATE TABLE Target_Warehouse (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type level_important NOT NULL DEFAULT 'medium',
    date_default TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_optional TIMESTAMP,
    description TEXT,
    warehouse_class_id INTEGER REFERENCES Warehouse_class(id) ON DELETE SET NULL,
    target_id INTEGER REFERENCES Target(id) ON DELETE CASCADE
);

-- File_Store table
CREATE TABLE File_Store (
    id SERIAL PRIMARY KEY,
    file VARCHAR(500) NOT NULL,
    area_warehouse_id INTEGER REFERENCES Area_Warehouse(id) ON DELETE SET NULL,
    category_warehouse_id INTEGER REFERENCES Category_Warehouse(id) ON DELETE SET NULL,
    target_warehouse_id INTEGER REFERENCES Target_Warehouse(id) ON DELETE SET NULL,
    information_id INTEGER REFERENCES Information(id) ON DELETE SET NULL,
    image_id INTEGER REFERENCES Image(id) ON DELETE SET NULL
);

