-- uncomment bleow once database created

-- DROP DATABASE dailyBread; 

CREATE DATABASE dailyBread;

\c dailyBread;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firtname VARCHAR,
    lastname VARCHAR,
    bio VARCHAR,
    proPic VARCHAR
)

CREATE TABLE albums(
id SERIAL PRIMARY KEY,
owner_id INT REFERENCES users(id) ON DELETE CASCADE
)

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES album(owner_id) ON DELETE CASCADE,
    body VARCHAR
)

CREATE TABLE likes(
    id SERIAL PRIMARY KEY, 
    liker_id INT REFERENCES users(id) ON DELETE CASCADE,
    post_id INT REFERENCES post(post_id) ON DELETE CASCADE
)

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    comment_id INT REFERENCES post(post_id) ON DELETE CASCADE,
    commenter_id INT REFERENCES users(id) ON DELETE CASCADE,
    comment VARCHAR
)

CREATE TABLE pictures(
    id SERIAL PRIMARY KEY,
    pic_id INT REFERENCES post(post_id) ON DELETE CASCADE,

)

INSERT INTO users( firstname, lastname, bio, proPic)
VALUES('John', 'Smith', 'I LOVE PIZZA!', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm9z3wJSpof47czB3cgXlkQ8AD8CcxPNKwwKJs1DY6X8di6X-R&s'),
       ('Amy', 'Lowe', 'Did Someone Say FOOD!', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ZcdCok_Es2IeJfCGN3_x8_OxKX88iqct0a4RtNTf6s21R13Efw&s'),
       ('Chelsea', 'Taylor', 'Favorite Food = Truffle Fries <3', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhG4dg9j0dgnCSTITN3yEaL40O1sVuY1YS9wg-D3-OtN6XiEeL_g&s'),
       ('Wayne', 'Well', 'PANCAKES', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ6QDtKfw8a5PzcxX1jkU5T-GGgk3rbluAUlVeVXVM9ANh5oS1&s');

INSERT INTO posts(post_id, body)
    VALUES(1, 'Yum'),
          (2, "If You haven't tried is you need to NOW"),
          (3, "Don't say I didn't put you on"),
          (4, "Sneaky Eats");

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

INSERT INTO albums(owner_id)
    VALUES(1),
          (2),
          (3),
          (4);

INSERT INTO pictures(pic_id)
VALUES (2),
       (3),
       (4),
       (5);

           
       