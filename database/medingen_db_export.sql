-- SQL export for Medingen database

-- Table structure for products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data for products
INSERT INTO products (name, description, price, image_url) VALUES
('Product 1', 'Description for product 1', 29.99, 'https://example.com/product1.jpg'),
('Product 2', 'Description for product 2', 39.99, 'https://example.com/product2.jpg'),
('Product 3', 'Description for product 3', 19.99, 'https://example.com/product3.jpg');

-- Table structure for salt content
CREATE TABLE salt_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    salt_type VARCHAR(255) NOT NULL,
    salt_amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Sample data for salt content
INSERT INTO salt_content (product_id, salt_type, salt_amount) VALUES
(1, 'Sodium Chloride', 1.5),
(2, 'Potassium Chloride', 2.0),
(3, 'Calcium Chloride', 0.5);

-- Table structure for reviews
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    user_name VARCHAR(255) NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Sample data for reviews
INSERT INTO reviews (product_id, user_name, rating, comment) VALUES
(1, 'User A', 5, 'Excellent product!'),
(2, 'User B', 4, 'Very good, but could be improved.'),
(3, 'User C', 3, 'Average quality.');

-- Table structure for descriptions
CREATE TABLE descriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    detailed_description TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Sample data for descriptions
INSERT INTO descriptions (product_id, detailed_description) VALUES
(1, 'This is a detailed description for product 1.'),
(2, 'This is a detailed description for product 2.'),
(3, 'This is a detailed description for product 3.');