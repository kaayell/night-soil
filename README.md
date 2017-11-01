# Database

To install:
```
$ brew install mysql
$ brew services start mysql
$ mysql -uroot
```

To create database:
```
$ create database waste;
$ create user 'user'@'localhost' identified by 'blahblah';
$ grant all on waste.* to 'user'@'localhost';
```