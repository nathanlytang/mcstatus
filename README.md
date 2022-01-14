# mcstatus
Minecraft Server Status Webpage

## Installation
```bash
npm install
cd app
yarn build
cd ../server
npm run build
```

In the /server folder, create a `.env` file with the following contents:
```dosini
PORT=9000 # Choose a port number
```

In the /app folder, create a `.env` file with the following contents:
```dosini
REACT_APP_API_ADDRESS=http://192.168.1.1:9000 # Change your ip address and port to match the server
```


## Usage
Start the server and webpage.

To start the server
```bash
cd server
npm run production
```

To start the webpage
```bash
cd app
npm run production
```

The webpage will be hosted on `http://localhost:3000`.