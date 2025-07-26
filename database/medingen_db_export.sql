-- SQL export for Medingen database

-- Table structure for products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    generic_name VARCHAR(200),
    brand_name VARCHAR(200),
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(500),
    rating DECIMAL(3, 2) DEFAULT 0.0,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table structure for salt content
CREATE TABLE salt_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    salt_name VARCHAR(200) NOT NULL,
    concentration VARCHAR(100) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Table structure for medicine uses
CREATE TABLE medicine_uses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    use_case VARCHAR(200) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Table structure for alternative medicines
CREATE TABLE alternative_medicines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    alternative_name VARCHAR(200) NOT NULL,
    alternative_price DECIMAL(10, 2) NOT NULL,
    alternative_rating DECIMAL(3, 2) DEFAULT 0.0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Table structure for FAQs
CREATE TABLE faqs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Table structure for reviews
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_name VARCHAR(100) DEFAULT 'Anonymous',
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Sample data for DOLO 650MG TABLET
INSERT INTO products (name, generic_name, brand_name, description, price, rating, image_url) VALUES
('DOLO 650MG TABLET', 'Paracetamol', 'Dolo', 'DOLO 650MG TABLET contains Paracetamol, a pain reliever and fever reducer...', 34.00, 4.5, '/images/dolo-650.jpg');

-- Sample data for salt content
INSERT INTO salt_content (product_id, salt_name, concentration) VALUES
(1, 'Paracetamol', '650mg');

-- Sample data for medicine uses
INSERT INTO medicine_uses (product_id, use_case) VALUES
(1, 'Fever'),
(1, 'Headache'),
(1, 'Tooth pain');

-- Sample data for alternative medicines
INSERT INTO alternative_medicines (product_id, alternative_name, alternative_price, alternative_rating) VALUES
(1, 'Dolo 650 mg', 34.00, 4.2),
(1, 'Dolo 650 mg', 34.00, 4.0),
(1, 'Dolo 650 mg', 34.00, 3.8);

-- Sample data for FAQs
INSERT INTO faqs (product_id, question, answer) VALUES
(1, 'What is Paracetamol used for?', 'Paracetamol is used to treat pain and reduce fever. It is commonly used for headaches, muscle aches, arthritis, backaches, toothaches, colds, and fevers.'),
(1, 'Can I take Dolo 650 with food?', 'Yes, Dolo 650 can be taken with or without food. However, taking it with food may help reduce stomach irritation in some people.');

-- Sample data for reviews
INSERT INTO reviews (product_id, user_name, rating, comment) VALUES
(1, 'Anonymous', 5, 'The medicine is good in fast action when compared with the exact generic medicine.'),
(1, 'Anonymous', 5, 'It works well for fever and body pain.'),
(1, 'Anonymous', 5, 'Affordable and reliable painkiller.');