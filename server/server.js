import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import graphRoutes from './src/routes/graphRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// routes
app.use('/api/graph', graphRoutes);


app.get('/', (req, res) => {
    res.send("Server is running...");
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});