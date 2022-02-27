/* Replace with your SQL commands */
create TABLE orders ( 
id SERIAL PRIMARY KEY,
user_id bigint not null References users(id),
product_id bigint not null References product(id),
quantity integer,
status VARCHAR(50)
);