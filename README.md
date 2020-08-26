Canvas -- A Web-Based Drawing Application Based on [React-Starter](https://github.com/taichi-master/react-starter) Project
==========================================================================================================================

Some Web Based Drawing Examples are very complex such as https://github.com/muaz-khan/Canvas-Designer.

This just a demotration for using HTML 5 Canvas and how to put it into the React ecosystem.

For Development:
---------------

Please type 'npm run dev'

For Production:
--------------

Please first 'npm run dist', then copy /assets, /dist, /server folders and /appDB.json and /package.json files to the production server.

Then type 'npm install --production' to install all the dependencies.

To start the application in production type 'npm start'.

Todo:
----
This project was built under a very small time frame.  Leaves a lot of rooms for improvements such as...

1. Clean up and refactor the code.
2. Unit tests
3. Better UI/UX.

Moreover, this is just a demonstration example.  I combined everything into one server.  It is better to seperate the frontend and backend into different services.
The backend portion also can be divided further into different micro-services such as authentication, database and etc. That way we can distribute the micro-services into different servers via Kubernetes or some other cloud services.

For simplicity I am using [Belphemur/node-json-db](https://www.npmjs.com/package/node-json-db) for local database management system.  It is better use Mongoose or some other real world DBMS.


Credit: 
------

The Authentication Example is based on Stephen Grider's Advanced React and Redux course in Udemy.
https://github.com/StephenGrider/AdvancedReduxCode/tree/master

The drawing portion is inspired by the following links
https://www.youtube.com/watch?v=3GqUM4mEYKA
http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/
https://code.tutsplus.com/tutorials/how-to-create-a-web-based-drawing-application-using-canvas--net-14288
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing
https://github.com/disjukr/croquis.js (for more brush types)
https://www.script-tutorials.com/html5-canvas-custom-brush1/

Disclaimer:
----------

This project got nothing to do with the Google's Canvas App.

License:
-------
ISC &copy; 2020 Kei Sing Wong
