# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

#### Login

- POST "/login/"
Send user id and password to get an authentication token.

```
Request Data: { id: string, password: string }
Response Body: JWT Token
```

#### Products

- Index 'products' [GET]
- GET "/product/all/"
Receive a list of all the products in the database.

```
Response Body: [{ id: number, name: string, price: number }]
```

- Show   'products/:id' [GET]
- GET "/product/:id/"
Receive details of a product using its id.

```
Response Body: { id: number, name: string, price: number }
```

- Create [token required] 'products' [POST]
- POST "/product/" (Required Authorization Header)
Create a new product by sending its name and price.

```
Request Data: { name: string, price: number }
Response Body: { id: number, name: string, price: number }
```

- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]  users' [GET]
- GET "/user/all/" (Required Authorization Header)
Receive a list of all the users in the database.

```
Response Body: [{ id: string, firstname: string, lastname: string }]
```

- Show [token required] 'users/:id' [GET]
- GET "/user/:id/" (Required Authorization Header)
Receive a user's details using its id.

```
Response Body: { id: string, firstname: string, lastname: string }
```

- Create N[token required] 'users' [POST]
- POST "/user/" (Required Authorization Header SuperUser)
Create a new user by sending its id, firstname, lastname, password .

```
Request Data: { id: string, firstname: string, lastname: string, password: string }
Response Body: { id: string, firstname: string, lastname: string }
```

#### Orders

- Current Order by user [args: user id](token required) 'orders/:userId' [GET]
- GET "/order/user/:user_id/" (Required Authorization )
Receive all the orders for a user using its user_id.

```
Response Body: [{ id: number, status: string, products: [{ product_id: number, quantity: number }], user_id: string }]
```

- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
CREATE DATABASE store;

CREATE TABLE product(id SERIAL PRIMARY KEY,name VARCHAR(50),price integer);

CREATE TABLE users(id SERIAL PRIMARY KEY,first_name VARCHAR(50),last_name VARCHAR(50),password VARCHAR(100));

create TABLE orders (
id SERIAL PRIMARY KEY,
user_id bigint not null References users(id),
product_id bigint not null References product(id),
quantity integer,
status VARCHAR(50)
);

#### Product
-  id
- name
- price
- [OPTIONAL] category
<!-- TABLE product(id SERIAL PRIMARY KEY,name VARCHAR(50),price integer); -->

#### User
- id
- firstName
- lastName
- password
<!-- TABLE users(id SERIAL PRIMARY KEY,first_name VARCHAR(50),last_name VARCHAR(50),password VARCHAR(100)); -->

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
<!-- 
TABLE orders (id SERIAL PRIMARY KEY,user_id bigint not null References users(id),product_id bigint not null References product(id),
quantity integer,status VARCHAR(50)); -->
