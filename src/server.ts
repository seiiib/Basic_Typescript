import express = require('express');
import path = require('path');
import { MetricsHandler } from './metrics';

const app = express();
const port: string = process.env.PORT || '8080';

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'../public')));

app.get('/', (req: any, res: any) => {
    return res.status(200).render('default.ejs');
    res.end();
})

app.get('/hello/:name', (req: any, res: any) => {
    return res.status(200).render('hello.ejs', {name: req.params.name});
    res.end();
})

app.get('/metrics.json', (req: any, res: any) => {
    MetricsHandler.get((err: Error | null, result?: any) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        return res.status(200).json(result);
        res.end();
    });
});

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});