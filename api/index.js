import express from 'express';
import methods from './methods/index.js';
import cors from 'cors';
const app = express();

// CORS middleware
app.use(cors({ origin: "*" }));

// JSON ve URL-encoded veri ayrıştırma middleware'leri
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

methods(app);

app.listen(3000, () => {
    
    console.log('Server is running on port 3000');
})

export default app;