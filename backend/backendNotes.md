## All notes related to backend learnings

## What is an ORM 

A big question I had was why don't we just use psycopg2 to manupilate the database while working with a Flask app. There was this concept of SQLAlchemy I kept running into which seemed to do the same thing. **SQLAlchemy  is an ORM**. An ORM is a tool thatmaps our databases to Pythonn objects so that it is easier to natively interact with them across systems that use different RDMS. So SQLAlchemy can use RDBMS like Postgres or SQLlite as it's backend. Thus ORM serve as an abstraction layer between application and the databases. So from a developer's perspective, an ORM will allow us to work with database-backed data, using the same OOP structure and mechanisms that we could use for any type of internal data. There are also some features to it that optimize things and make it work faster : <br>
- Lazy loading: querysets oly load what is required so until certain actions are performed, the DB query won't be made.
```
result= Person.objects.all()
# Query hasn't been executed yet

temp=result.filter(age__lt=45)
# Query still hasn't been executed

for obj in temp:
    print(obj)

# Now query has been excecuted
```
- ORM chaching : querysets will be cached
```
# query has been executed
for obj in temp:
    print(obj)

# query hasn't been executed, as it was cached
for obj in temp:
    print(obj.age,": ", obj)

```
- Code becomes short and easy to handle and is available in language of our choice along with the OOP features like inheritance. <br>

The big CON to using ORM is learning the library to make things most efficent. 

## The flask folder structure

I have firsthand seen how complicated things get when dealing with a large project and so to establish a folder structure is very important to main the code well. There are two methods I have found that can be used to structure a folder : the functional and divisional(this is what Django strucutre looks like). <br>

First we look at functional 
```
yourapp/
    run.py # main file
    static/
        css/
        js/
    templates/
        home/
        admin/
        attendance/
    views/
        __init__.py
        home.py
        admin.py
        attendance.py
    lib/ # common functions to use
    models/

```

The another one is the divisional splitting. This feels more better because I think of the app as a bunch of components in my head so working on them division to division makes sense. 

```
yourapp/
    run.py # main file
    home/
        __init__.py
        views.py
        static/
        templates
    admin/
        __init__.py
        views.py
        static/
        templates/
    attendnace/
        __init__.py
        views.py
        static/
        templates/
    models.py

```
A good example of this strucutre given in this repo [here](https://gist.github.com/efazati/4545740)

## Cookies and Session authentication

This is the traditional approach to authentication. We have our username and password and we submit those to the server. Now the session can either be stored client side or server side. Lets imagine that it is being stored server side. <br>
Now this session is stored in the database and then responds by sending a session id to the client computer (or browser). This session id will be stored as a cookies in your browser as a key-value pair. *For every subsequent request, this cookie will be sent back to the server* and the server will respond to that request, if we are currently logged in. This is called a stateful protocol b/w the frontend client and backend server. <br>

An important thing to note is there are 2 protocols - stateful and stateless. Stateful will store everything on the backend while stateless stores everything on the client. <br>

This lacks secuirty and we will need to store the session id on the backend. This is where JWT comes in

## JWT working

Here, again we send the username and password but instead of storing this session in the database and responding with a session id, the server will create a JWT. Server will send this JWT to the client computer and this is kept in the local storage in the browser so that on future request, this JWT will be added to the authorization header, prefixed with the bearer of the token. So the server will just need to validate the signature. *So nothing is stored in the server*. Here the authentication state is managed on the client (unlike the sessions). 

