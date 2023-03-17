## Full Stack ReactJs NodeJs CRUD app

### App Description:
 *  In src directory we create a `data.json` file. 
 We import it in our app to call it inside our state and then display that data in our browser.
 *  We can add post, delete post, edit post and update post from frontend app.
 *  By using node express server.js we can make changes in our data.json file locally.
 * Downloading json.file on request and save download data into our app - data.json file.
 * Install packages and Edit Scripts in package.json to run our full-stack app.
 * CRUD - we use create read update and delete operation and axios to fetch/post data and uuid to generete an unique id for posts.

 *  src folder consists of :
    *   `App.js` - for frontend
    *   `server.js` - for backend
    *   `data.json` - for database

### Packages Installed
*   Axios - ` npm install axios`
*   Body-parser - `npm install body-parser`
*   Cors - `npm install cors`
*   Express - `npm install express`
*   uuid -`npm install uuid`
### Dev Dependencies Installation
*   Concurrently - `npm install concurrently --save-dev`
*   Morgan - `npm install --save @types/morgan`
*   Nodemon - `npm install --save-dev nodemon`

In the project directory, you can run:

### `yarn dev`

To concurrently run frontend and backend servers

### `npm start` 

Runs the frontend app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn server`

Runs the backend app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.