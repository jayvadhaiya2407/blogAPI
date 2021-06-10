# News API

A NewsAPI With Advanced Authentication And Autorization Using JWT(Json Web Tokens). Provides Fully Functionalities For Creating News Websites.

## Installation

Install dependencies with npm

```bash
  npm install --save
  npm start
```

## API Reference

#### Create User

```http
  POST /auth/create
```

| Parameter   | Type     | Description              |
| :---------- | :------- | :----------------------- |
| `firstname` | `string` | **Required** Min 3 Chars |
| `lastname`  | `string` | **Required** Min 3 Chars |
| `email`     | `string` | **Required**             |
| `password`  | `string` | **Required** Min 8 Chars |
| `cpassword` | `string` | **Required** Min 8 Chars |

#### Login User

```http
  POST /auth/login
```

| Parameter  | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `email`    | `string` | **Required**. Email of user    |
| `password` | `string` | **Required**. Password of user |

#### Get Posts

```http
  GET /feed/posts
```

#### Create Post

```http
  POST /feed/post/create
```

| Parameter     | Type     | Description                               |
| :------------ | :------- | :---------------------------------------- |
| `title`       | `string` | **Required**.                             |
| `description` | `string` | **Required**.                             |
| `image`       | `file`   | **Required**.                             |
| `token`       | `string` | **Required**. Autorization Token Required |

##### Use Autorization Header to send token.
