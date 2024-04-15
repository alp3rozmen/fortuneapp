import express from 'express';
import methods from './methods/index.js';
const app = express();

app.use(express.json() || express.urlencoded({ extended: true }));

methods(app);

app.listen(3000, () => {
    
    console.log('Server is running on port 3000');
})

export default app;