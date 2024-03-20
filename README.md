# NetZero
https://netzero-92di.onrender.com/

## Team:
HellFire Hackers
## Description:
NetZero is a project aimed at carbon offsetting for individuals as well as businesses/industries. It helps users to calculate their carbon footprint and take measures to offset it.

## Installation:

1. **Clone the repository:**  
   First, you need to clone the repository to your local machine. Open your terminal or command prompt and run the following command:

######
    git clone https://github.com/yashashwi-s/NetZero.git

2. **Navigate to the Repository Folder:**  
Change your directory to the cloned repository:

######
    cd NetZero

3. **Install MongoDB and Configure:**  
Install MongoDB if not already installed. Change the links in `app.js` to your localhost link for MongoDB.

4. **Install Dependencies:**  
Install project dependencies by running:

######
    npm install


5. **Start Server:**  
Run the following command to start the server:

######
    node app.js


6. **Run Local Host:**  
Open your browser and navigate to `localhost:port` (replace `port` with the port number specified in your `app.js` file) to access the application.

## How to Use MongoDB:

1. **Installation:**  
MongoDB can be installed from the official website or using package managers like Homebrew for macOS or Chocolatey for Windows.

2. **Start MongoDB:**  
After installation, start the MongoDB service. This can usually be done by running a command like `mongod` in your terminal or using a service manager.

3. **Connect to MongoDB:**  
To connect to MongoDB from your application, ensure that the MongoDB server is running, and you can use the `mongodb://localhost:27017/your_database_name` URI to connect. Replace `your_database_name` with the name of your database.

4. **Perform Operations:**  
You can now perform various operations such as inserting, updating, deleting, and querying documents in your MongoDB database using the appropriate methods provided by the MongoDB driver for your chosen programming language.

5. **Close Connection:**  
It's essential to close the MongoDB connection properly when you're done with your operations. This helps to release resources and avoid memory leaks.
