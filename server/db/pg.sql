
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
    cart_id integer PRIMARY KEY,
    user_session integer,
    product_id integer,
    active integer,
      FOREIGN KEY(product_id)
      REFERENCES product(product_id)
      ON DELETE CASCADE
  )
  CREATE TABLE related_products (
    related_id integer PRIMARY KEY,
    product_id integer,
    related_product_id integer,
      FOREIGN KEY(product_id)
        REFERENCES product(product_id)
         ON DELETE CASCADE
  );


CREATE INDEX product_styles_product_id_idx ON sdc.product_styles(product_id);

CREATE INDEX photos_style_id_idx ON sdc.photos(style_id);

CREATE INDEX sku_style_id_idx ON sdc.sku(style_id);