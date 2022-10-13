import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config()

const server = express();
server.use(express.json());
server.use(cors());



server.listen(process.env.BACKEND_PORT, () => {
    console.log(`Server is listening on port ${process.env.BACKEND_PORT}.`);
});