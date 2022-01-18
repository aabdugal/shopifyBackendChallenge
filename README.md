# Shopify Backend Developer Intern Challenge - Summer 2022

## Adil Abdugaliyev

Hello! This is my attempt at Shopify Intern Challenge.
I have built a backend using Node.js with MySQL(hosted at AWS) and S3(AWS) for image storage.
I did the "Allow image uploads AND store image with generated thumbnails" option.

Both the [frontend](https://master.d1nry80urxfqwh.amplifyapp.com/) and [backend](https://gentle-hollows-64935.herokuapp.com/) are hosted.

## Rest Endpoints:

- Get All Items: GET /items
- Get Item: GET /items/:id
- Add Item: POST /items
- Update Item: PUT /items/:id
- Remove Item: DELETE /items/:id
- Remove All Items: DELETE /items

## SQL Schema

id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
img_link varchar(255),
author_id int(11) NOT NULL,
last_edit_id int(11),
title varchar(255) NOT NULL,
description varchar(255) NOT NULL,
post_date TIMESTAMP NOT NULL,
edit_date TIMESTAMP

I believe this schema captures all the necessary information for the inventory tracking application. It can be improved in the future by adding Users to the platform. The app could track all the changed made to the inventory item, who created the item, allow to visit the author's profile, etc.
