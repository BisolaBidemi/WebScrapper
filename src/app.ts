import express, {Application, Request, Response} from 'express';
const {readFileSync} = require('fs');

const app: Application= express();
const port: number = 3001;

app.get('/', (req: Request, res: Response) => {

    const data =  JSON.parse(readFileSync('data.json'))
    res.send(data)
})

app.listen(port, () => {
    console.log(`Successfully connected on port ${port}`)
})