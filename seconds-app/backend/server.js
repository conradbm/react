/* Express.js Server

Responds with a message when we request it.

Commands for setup:

npm init
npm install --save express
npm install --save-dev @babel/core @babel/node @babel/preset-env
npx babel-node src/server.js

npm install --save body-parser

npm install --save-dev nodemon
npx nodemon --exec npx babel-node src/server.js

mkdir -p /data/db
# install mongodb
mongod

//Open new terminal
mongo
> use my-blog //create new database
> db.articles.insert([{name:'learn-react',
...         upvotes: 0,
...         comments:[],
...     },
...     {name:'learn-node',
...         upvotes: 0,
...         comments:[],
...     },
...     {name:'my-thoughts-on-resumes',
...         upvotes: 0,
...         comments:[],  
...     }]) //insert our data
> db.articles.find({}).pretty()
> db.articles.find({name:'learn-react'}).pretty()
> db.articles.remove({})

npm install --save mongodb //allows for modifying database in express

// AWS
1. Create EC2 Instance
2. Create Key Pair
3. SSH in
ssh -i .\my-blog-key.pem ec2-user@ec2-18-218-105-248.us-east-2.compute.amazonaws.com

4. Install git
sudo yum install git

5. Install NPM (https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 12.18.4
npm install -g npm@latest

6. Install MongoDB (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-amazon/)
sudo nano /etc/yum.repos.d/mongodb-org-4.4.repo  
// Paste the below into the file
[mongodb-org-4.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/4.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.4.asc
// run the following
sudo yum install -y mongodb-org
// run mongo
sudo service mongod start
mongo
// load some data
> use my-blog
switched to db my-blog
> db.articles.insert([
... {
...    name:'learn-react',
...    upvotes: 0,
...    comments: [],
... },
... {
...     name:'learn-node',
...     upvotes:0,
...     comments:[],
... },
... {
...     name:'my-thoughts-on-resumes',
...     upvotes:0,
...     comments:[],
... },
... ])

7. Clone git code
git clone https://github.com/conradbm/my-blog.git
cd my-blog
npm install

8. Run the server
npm install -g forever
forever start -c "npm start" .
forever list

9. Map port 8000 to port 80 on AWS
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8000

10. Go manually to security groups for this EC2 instance and change port 80 to ANYWHERE.

*/

import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';

// req/request is the input medium with data coming in
// res/response is the output medium to transmit data back
// async/await for database calls


// Express App
const app = express();

// For hosting the site
app.use(express.static(path.join(__dirname, '/build')));

// Provides a body tag for json
app.use(bodyParser.json());

// Function to take care of stand-up/tear-down database calls
const withDB = async (operations, res) => {
    try{

        // await for inline database calls
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser:true})
        const db = client.db('my-blog');
        
        // General call to the database
        await operations(db);

        client.close();
    } catch(error){
        // Send internal server error if fail
        res.status(500).json({message:"Error connecting to db ", error});
    }
}

// GET: Retrieve article data
app.get('/api/articles/:name', async (req, res) => {

    // Start with withDB code, until we hit the parameter `operations`
    // then plug in the argument lines of code, then proceed.
    // This removes all boilerplate database code
    withDB( async (db) => {
        const articleName = req.params.name;

        const articleInfo = await db.collection('articles').findOne({name:articleName});
        res.status(200).json(articleInfo);
    }, res);


})

// POST: Update article upvote/selected data
app.post('/api/articles/:name/upvote', async (req, res) => {
    
    withDB(async (db) => {

        // Get URL parameters
        const articleName = req.params.name;

        // Select statement
        const articleInfo = await db.collection('articles').findOne({name:articleName});

        // Update statement
        await db.collection('articles').updateOne({name: articleName}, {
            /*
            '$inc':{
                upvotes:1,
            }
            */
            '$set':{
                upvotes: articleInfo.upvotes+1,
            }
        });
    
        // Select statement, latest info
        const updatedArticleInfo = await db.collection('articles').findOne({name:articleName});
    
        // Send latest back
        res.status(200).json(updatedArticleInfo);
    }, res)

})

// POST: Update article comment data from users
app.post('/api/articles/:name/add-comment', async (req, res) => {
    
    withDB( async (db) => {

        // Get URL/body parameters
        const articleName = req.params.name;
        const {username, text} = req.body;

        // Select statement
        const articleInfo = await db.collection('articles').findOne({name:articleName});

        // Append statement
        await db.collection('articles').updateOne({name: articleName}, {
            /* 
            '$push':{
                comments: {username, text},
            }
            */
           '$set':{
               comments: articleInfo.comments.concat({username, text}),
           }
        });
    
        // Select statement, latest info
        const updatedArticleInfo = await db.collection('articles').findOne({name:articleName});
    
        // Send latest back
        res.status(200).json(updatedArticleInfo);
    }, res)

});

// For hosting the site @ port 8000
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

// Listen to port 8000
app.listen(8000, () => console.log("Listening on port 8000"));
