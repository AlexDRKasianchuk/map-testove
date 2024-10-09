import { Router } from 'express';
import data from '../mock/entity.js';
import dataMid from '../mock/entityMid.js';
import dataFinal from '../mock/entityFinal.js';

const router = Router();

let startTime = Date.now();

router.get('/', (req, res) => {
    let body = { data: [] };

    const elapsedTime = Date.now() - startTime;

    if (elapsedTime <= 60000) {
        //перша хвилина
        body = { data: data };
    } else if (elapsedTime <= 180000) {
        // до 3 хвилини
        body = { data: dataMid };
    } else {
        // Після 3 хвилин
        body = { data: dataFinal };
    }

    res.json({ data: body.data, length: body.data.length });
});

router.put('/rerun', (req, res) => {
    startTime = Date.now();
    res.status(200).json({ message: 'Симуляцію перезапущенно' });
});

export default router;
