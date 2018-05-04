React-Starter Project
=====================

Most of the React starter projects are either too simple or way too complicated.  If you also feel the same, perhaps you should check out my React starter project.

The main different from the other React starter projects is the server side.  For some reasons I don't like to use babel-node to run the server. Since it is isomorphic, I use Webpack to compile the JSX when it is needed.

I used to use Bootstrap to handle the styles for my applications, but for some reasons I decided not to.  Therefore, I have to created my own NavBar component (it is Font Awesome ready).  Although I didn't include the Bootstrap nor Font Awesome in the project, it is very easy to add those libraries if you ever need them.  My goal is try not to over complicate the project.

The other thing that I would like to point out is I didn't use jQuery in the project at all (This is one of the reasons why I decided not to use Bootstrap any more).  Anyway, using jQuery defects the purpose of React.  We should let React to manipulate the DOM for us.

## Features:
- React 16 Isomorphic (universal) Single Page Application
- ES6 Javascript
- Webpack 3.11 + Express (https)
- React Router 4 (dynamic component)
- Lazy load components
- Hot reload across browsers in multiple devices at the same time
- Redux (async actions)
- REST API
- Inverted CSS with Sass
- No jQuery
- Server/Client Unit Testing (Mocha Mocha-Webpack Chai Sinon jsdom Enzyme)

## Installation
```bash
git clone https://github.com/taichi-master/react-starter.git <<your new project name>>
cd <<your new project name>>
git remote set-url origin <<your own git repository>>
```
Either
```bash
yarn install
```
or
```bash
npm install
```

## Running in development
```bash
npm run dev
```

## Build/Dist. project
```bash
npm run build
```
or
```bash
npm run dist
```

## Running in production
```bash
npm start
```
p.s. Before running the project in production for the first time or made some changes to the project, you would need to either build or dist the project first.

License:
-------
ISC &copy; 2018 Kei Sing Wong
