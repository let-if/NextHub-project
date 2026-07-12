-- ==========================================
-- NexusHub Database Schema
-- ==========================================

CREATE DATABASE IF NOT EXISTS nexushub;

USE nexushub;


-- ==========================================
-- ROLES TABLE
-- ==========================================

CREATE TABLE roles (

    id INT AUTO_INCREMENT PRIMARY KEY,

    role_name VARCHAR(50) NOT NULL UNIQUE,

    description VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



-- ==========================================
-- DEPARTMENTS TABLE
-- ==========================================

CREATE TABLE departments (

    id INT AUTO_INCREMENT PRIMARY KEY,

    department_name VARCHAR(100) NOT NULL UNIQUE,

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



-- ==========================================
-- USERS TABLE
-- ==========================================

CREATE TABLE users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    employee_id VARCHAR(20) NOT NULL UNIQUE,

    first_name VARCHAR(100) NOT NULL,

    last_name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    phone VARCHAR(20) UNIQUE,

    password VARCHAR(255) NOT NULL,

    role_id INT NOT NULL,

    department_id INT,

    status ENUM(
        'Active',
        'Inactive'
    ) DEFAULT 'Active',

    profile_image VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    last_login TIMESTAMP NULL,


    FOREIGN KEY(role_id)
    REFERENCES roles(id)
    ON DELETE CASCADE,


    FOREIGN KEY(department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL

);



-- ==========================================
-- REFRESH TOKENS TABLE
-- ==========================================

CREATE TABLE refresh_tokens (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    token TEXT NOT NULL,

    expires_at DATETIME NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE

);



-- ==========================================
-- ACTIVITIES TABLE
-- ==========================================

CREATE TABLE activities (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT,

    action VARCHAR(255),

    module VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE SET NULL

);



-- ==========================================
-- ASSETS TABLE
-- ==========================================

CREATE TABLE assets (

    id INT AUTO_INCREMENT PRIMARY KEY,


    asset_code VARCHAR(30)
    NOT NULL UNIQUE,


    asset_name VARCHAR(150)
    NOT NULL,


    category VARCHAR(100)
    NOT NULL,


    department_id INT,


    brand VARCHAR(100),

    model VARCHAR(100),

    serial_number VARCHAR(100),


    purchase_date DATE,


    purchase_price DECIMAL(10,2),


    condition_status ENUM(
        'Excellent',
        'Good',
        'Fair',
        'Damaged'
    )
    DEFAULT 'Good',


    status ENUM(
        'Available',
        'Assigned',
        'Maintenance',
        'Disposed'
    )
    DEFAULT 'Available',


    description TEXT,


    asset_image VARCHAR(255),


    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,


    FOREIGN KEY(department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL

);



-- ==========================================
-- ASSET ASSIGNMENTS TABLE
-- ==========================================

CREATE TABLE asset_assignments (

    id INT AUTO_INCREMENT PRIMARY KEY,


    asset_id INT NOT NULL,


    user_id INT NOT NULL,


    assigned_date DATE NOT NULL,


    returned_date DATE,


    remarks TEXT,


    status ENUM(
        'Assigned',
        'Returned'
    )
    DEFAULT 'Assigned',


    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    FOREIGN KEY(asset_id)
    REFERENCES assets(id)
    ON DELETE CASCADE,


    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE

);



-- ==========================================
-- ASSET LOGS TABLE
-- ==========================================

CREATE TABLE asset_logs (

    id INT AUTO_INCREMENT PRIMARY KEY,


    asset_id INT,


    user_id INT,


    action VARCHAR(100),


    description TEXT,


    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    FOREIGN KEY(asset_id)
    REFERENCES assets(id)
    ON DELETE SET NULL,


    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE SET NULL

);



-- ==========================================
-- RESOURCES TABLE
-- ==========================================

CREATE TABLE resources (

    id INT AUTO_INCREMENT PRIMARY KEY,


    resource_code VARCHAR(30)
    NOT NULL UNIQUE,


    resource_name VARCHAR(150)
    NOT NULL,


    category ENUM(

        'Laptop',

        'Desktop',

        'Printer',

        'Meeting Room',

        'Vehicle',

        'Projector',

        'Furniture'

    ),


    serial_number VARCHAR(100),


    status ENUM(

        'Available',

        'Assigned',

        'Maintenance'

    )
    DEFAULT 'Available',


    description TEXT,


    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP

);



-- ==========================================
-- RESOURCE ASSIGNMENTS TABLE
-- ==========================================

CREATE TABLE resource_assignments (

    id INT AUTO_INCREMENT PRIMARY KEY,


    resource_id INT NOT NULL,


    user_id INT NOT NULL,


    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    returned_at TIMESTAMP NULL,


    notes TEXT,


    FOREIGN KEY(resource_id)
    REFERENCES resources(id)
    ON DELETE CASCADE,


    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE

);



-- ==========================================
-- WORK REQUESTS TABLE
-- ==========================================

CREATE TABLE work_requests (

    id INT AUTO_INCREMENT PRIMARY KEY,


    request_number VARCHAR(30)
    NOT NULL UNIQUE,


    title VARCHAR(200)
    NOT NULL,


    description TEXT,


    category ENUM(

        'Technical Support',

        'Equipment Request',

        'Software Installation',

        'Office Maintenance'

    ),


    priority ENUM(

        'Low',

        'Medium',

        'High',

        'Urgent'

    )
    DEFAULT 'Medium',


    status ENUM(

        'Pending',

        'Assigned',

        'In Progress',

        'Completed',

        'Rejected'

    )
    DEFAULT 'Pending',


    requested_by INT NOT NULL,


    assigned_to INT,


    department_id INT,


    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,



    FOREIGN KEY(requested_by)
    REFERENCES users(id)
    ON DELETE CASCADE,


    FOREIGN KEY(assigned_to)
    REFERENCES users(id)
    ON DELETE SET NULL,


    FOREIGN KEY(department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL

);



-- ==========================================
-- REQUEST COMMENTS TABLE
-- ==========================================

CREATE TABLE request_comments (

    id INT AUTO_INCREMENT PRIMARY KEY,


    request_id INT NOT NULL,


    user_id INT NOT NULL,


    comment TEXT NOT NULL,


    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    FOREIGN KEY(request_id)
    REFERENCES work_requests(id)
    ON DELETE CASCADE,


    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE

);



-- ==========================================
-- REQUEST HISTORY TABLE
-- ==========================================

CREATE TABLE request_history (

    id INT AUTO_INCREMENT PRIMARY KEY,


    request_id INT NOT NULL,


    changed_by INT NOT NULL,


    old_status VARCHAR(30),


    new_status VARCHAR(30),


    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    FOREIGN KEY(request_id)
    REFERENCES work_requests(id)
    ON DELETE CASCADE,


    FOREIGN KEY(changed_by)
    REFERENCES users(id)
    ON DELETE CASCADE

);



-- ==========================================
-- NOTIFICATIONS TABLE
-- ==========================================

CREATE TABLE notifications (

    id INT AUTO_INCREMENT PRIMARY KEY,


    user_id INT NOT NULL,


    title VARCHAR(200),


    message TEXT,


    is_read TINYINT(1)
    DEFAULT 0,


    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE

);



-- ==========================================
-- END OF NEXUSHUB DATABASE
-- ==========================================