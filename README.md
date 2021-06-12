# News API

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

A NewsAPI With Advanced Authentication And Autorization Using JWT(Json Web Tokens). Provides Fully Functionalities For Creating Own News Websites Fastly.

## Installation

Install dependencies with npm

```bash
  npm install --save
```

## Runserver

Start server with npm

```bash
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

This end-point will return a created user object back

#### Login User

```http
  POST /auth/login
```

| Parameter  | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `email`    | `string` | **Required**. Email of user    |
| `password` | `string` | **Required**. Password of user |

By login in with correct credentials you will get a authentication token and userId back, which will be valid for one hour.

#### Get Posts

```http
  GET /feed/posts
```

To retrive all posts

#### Get Single Post

```http
  GET /feed/posts/${postId}
```

Thsi end-point will send a single post back

#### Create Post

```http
  POST /feed/post/create
```

| Parameter     | Type     | Description                                |
| :------------ | :------- | :----------------------------------------- |
| `title`       | `string` | **Required**.                              |
| `description` | `string` | **Required**.                              |
| `image`       | `file`   | **Required**.                              |
| `token`       | `string` | **Required**. Autorization Header Required |

##### Use Autorization Header to send token(Only token without bearer).

You will get back a created post

#### Update Post

```http
  PUT /feed/post/${postId}
```

| Parameter     | Type     | Description                                |
| :------------ | :------- | :----------------------------------------- |
| `title`       | `string` | **Required**.                              |
| `description` | `string` | **Required**.                              |
| `image`       | `file`   | **Optional**.                              |
| `token`       | `string` | **Required**. Autorization Header Required |

##### Use Autorization Header to send token(Only token without bearer).

#### Delete Post

```http
  DELETE /feed/post/${postId}
```

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `token`   | `string` | **Required**. Autorization Header Required |

##### Use Autorization Header to send token(Only token without bearer).

#### Like/Dislike Post

```http
  PATCH /feed/post/${postId}
```

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `token`   | `string` | **Required**. Autorization Header Required |

Using this end-point you can like or dislike to post. If you have liked then it will deslike it , and if you not done anything it will add like to post.

#### Comment on Post

```http
  PATCH /feed/post/comment/${postId}
```

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `comment` | `string` | **Required**.                              |
| `token`   | `string` | **Required**. Autorization Header Required |

This end-point gives you an ability to comment on post, we return a updated post with comments.
