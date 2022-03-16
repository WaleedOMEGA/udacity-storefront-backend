/* Replace with your SQL commands */
create TABLE orders ( 
id SERIAL PRIMARY KEY,
user_id bigint not null References users(id),
status VARCHAR(50)
);