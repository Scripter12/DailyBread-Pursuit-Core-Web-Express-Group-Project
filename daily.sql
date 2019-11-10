-- uncomment bleow once database created

DROP DATABASE dailyBread; 

CREATE DATABASE dailybread;

\c dailybread;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR,
    lastname VARCHAR,
    bio VARCHAR,
    proPic VARCHAR
);

CREATE TABLE albums(
id SERIAL PRIMARY KEY,
album_title VARCHAR,
owner_id INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES users(id) ON DELETE CASCADE,
    body VARCHAR
);

CREATE TABLE likes(
    id SERIAL PRIMARY KEY, 
    liker_id INT REFERENCES users(id) ON DELETE CASCADE,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    comment_id INT REFERENCES posts(id) ON DELETE CASCADE,
    commenter_id INT REFERENCES users(id) ON DELETE CASCADE,
    comment VARCHAR
);

CREATE TABLE pictures(
    id SERIAL PRIMARY KEY,
    album_id INT REFERENCES albums(id) ON DELETE CASCADE,
    body VARCHAR
);

INSERT INTO users( firstname, lastname, bio, proPic)
VALUES('John', 'Smith', 'I LOVE PIZZA!', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm9z3wJSpof47czB3cgXlkQ8AD8CcxPNKwwKJs1DY6X8di6X-R&s'),
       ('Amy', 'Lowe', 'Did Someone Say FOOD!', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ZcdCok_Es2IeJfCGN3_x8_OxKX88iqct0a4RtNTf6s21R13Efw&s'),
       ('Chelsea', 'Taylor', 'Favorite Food = Truffle Fries <3', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhG4dg9j0dgnCSTITN3yEaL40O1sVuY1YS9wg-D3-OtN6XiEeL_g&s'),
       ('Wayne', 'Well', 'PANCAKES', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ6QDtKfw8a5PzcxX1jkU5T-GGgk3rbluAUlVeVXVM9ANh5oS1&s');

INSERT INTO posts(post_id, body)
    VALUES(1, 'Yum'),
          (2, 'If You have not tried this, you need to NOW'),
          (3, 'LIT'),
          (4, 'Sneaky Eats');

INSERT INTO likes(liker_id, post_id)
    VALUES (1,1),
           (1,3),
           (1,4),
           (2,3),
           (2,1),
           (3,3),
           (3,1),
           (3,2),
           (4,4);

INSERT INTO comments(comment_id, commenter_id, comment)
    VALUES(1, 3,  'Where can I get this?'),
          (2, 4,  'LOVE'),
          (3, 2,  'This is The BEST SPOT FOR TACOS'),
          (4, 1,   'Must Try');

INSERT INTO albums(owner_id, album_title)
    VALUES(1, 'todays meal'),
          (2, 'happy' ),
          (3, 'here to inspire'),
          (4, 'you hungry?');

INSERT INTO pictures(album_id, body)
VALUES (2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9suKajJ6X3NB7qAB_sq4dxZH3sN4iFXnztmHVV96S8VaPC2eq&s'),
       (3, 'https://www.foodrepublic.com/wp-content/uploads/2017/11/applepie.jpg'),
       (4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSycpiHrfz6EoG2ea-5pRK7hAROHp61bZKoVMN-zkRLgEGcdurQWw&s'),
       (1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE3txCZgnGLpRVU033OHrtwDwa5qAC0mZQ_xPH61cPpMOW8NfR_w&s');

           
       