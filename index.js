const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`)
})

app.get('/server/:id', (req, res) => {
    const { id } = req.params;
    res.send({
        id: `ID is ${id}`,
    });
})

// Node.js signal event listeners
process.on('SIGTERM', () => { // Kill process
    console.log('SIGTERM signal received.');
    process.exit(0);
});
process.on('SIGINT', () => { // Ctrl+C
    console.log('SIGINT signal recieved.');
    process.exit(0);
})