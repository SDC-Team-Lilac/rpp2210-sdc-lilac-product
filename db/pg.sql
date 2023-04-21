
DROP SCHEMA IF EXISTS sdc CASCADE;

CREATE SCHEMA sdc
  CREATE TABLE category (
    category_id PRIMARY KEY,
    category_name varchar UNIQUE NOT NULL
  )
  CREATE TABLE product (
    product_id integer PRIMARY KEY,
    product_name varchar,
    slogan varchar,
    product_description varchar,
    default_price integer,
    category_id integer NOT NULL,
    FOREIGN KEY(category_id)
      REFERENCES category(category_id)
      ON DELETE CASCADE
  )
  CREATE TABLE product_features (
    feature_id PRIMARY KEY,
    feature varchar,
    feature_value varchar,
    product_id integer,
      FOREIGN KEY(product_id)
      REFERENCES product(product_id)
      ON DELETE CASCADE
  )
  CREATE TABLE product_styles (
    style_id integer PRIMARY KEY,
    style_name varchar,
    original_price integer,
    sale_price integer,
    style_default boolean,
    product_id integer,
      FOREIGN KEY(product_id)
      REFERENCES product(product_id)
      ON DELETE CASCADE
  )
  CREATE TABLE photos (
    photo_id PRIMARY KEY,
    thumbnail_url varchar,
    url varchar,
    style_id integer,
      FOREIGN KEY(style_id)
      REFERENCES product_styles(style_id)
      ON DELETE CASCADE
  )
  CREATE TABLE sku (
    sku_id integer PRIMARY KEY,
    quantity integer,
    size varchar,
    style_id integer,
      FOREIGN KEY(style_id)
      REFERENCES product_styles(style_id)
      ON DELETE CASCADE
  )
  CREATE TABLE cart (
    id PRIMARY KEY,
    user_session integer,
    product_id integer,
    active integer,
      FOREIGN KEY(product_id)
      REFERENCES product(product_id)
      ON DELETE CASCADE
  )
  CREATE TABLE related_products (
    product_id integer,
    related_product_id integer,
      FOREIGN KEY(product_id)
        REFERENCES product(product_id)
         ON DELETE CASCADE,
      FOREIGN KEY(related_product_id)
        REFERENCES product(product_id)
        ON DELETE CASCADE
  );

