# **Server Kit Project**

## Features

- User Authentication
     - Login and Register with username and password
     - Login with social network (Facebook, Google, Github)
     - Reset password by email and sms
- User Module
     - Update information
     - Update email and sms
- Administrator Module
     - Update user role USER -> ADMIN and vice versa
     - Block an user

## Provider Supports

- Aws Module
- Redis Module
- Mail Module
- Sms Module
- Locales Module
- Logger Module
- Validator Module

## Configuration

```
# Common configuration
JWT_SECRET_KEY=

# Mongo Database
DB_URL=

# Redis Database
REDIS_PORT=
REDIS_DB_NUMBER=

# Domain
CLIENT_URL=
SERVER_URL=

# Facebook
FACEBOOK_CLIENT_ID=
FACEBOOK_SECRET=

# Google
GOOGLE_CLIENT_ID=
GOOGLE_SECRET=

# Github
GITHUB_CLIENT_ID=
GITHUB_SECRET=

# Aws
AWS_KEY_ID=
AWS_SECRET_Key=
AWS_S3_BUCKET_NAME=

# Mail
SENDGRID_API_KEY=
SENDGIRD_MAIL=

# Sms
TWILIO_API_ID=
TWILIO_API_SECRET=
TWILIO_API_NUMBER=
```
