# Chatgpt-Friends
How to Run it 

1️⃣ Install Node.js
Download and install Node.js first:

Go to: https://nodejs.org

Install the LTS version

After installing, open a terminal and check:

node -v
npm -v

If both show versions, you're good.


2️⃣ Extract the ZIP

Unzip the file.
You should see a folder like:

chatgpt-friends-app

Inside it there are files like:

server.js
package.json
friends.db
public/
node_modules/


3️⃣ Open Terminal in the Folder

Navigate to the folder:

cd chatgpt-friends-app

Example (Windows):

cd Downloads/chatgpt-friends-app


4️⃣ Install Dependencies (optional but recommended)

Run:

npm install

This installs:
express
sqlite3
cors
body-parser


5️⃣ Start the Server

Run:

node server.js

You should see something like:

Connected to the SQLite database.
Server running on port 3000


6️⃣ Open the App

Open your browser and go to:

http://localhost:3000

That will load the app from the public folder.
