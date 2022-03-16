/* Replace with your SQL commands */
CREATE TABLE order_products(
  id SERIAL PRIMARY KEY,
  order_id bigint not null REFERENCES orders(id),
  product_id bigint not null REFERENCES product(id),
  quantity integer
);