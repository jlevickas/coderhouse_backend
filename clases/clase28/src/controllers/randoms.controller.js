import {fork} from 'child_process';

const randomsController = (req, res) => {

    const cantidadRandoms = req.query.cant || 100000000;

    const forked = fork('./src/utils/computeRandomNumbers.js');
    forked.on('message', (msg) => {
        console.log(msg)
        if (msg == 'ready') {
            forked.send(cantidadRandoms);
        } else {
            const randoms = msg;
            res.render("randoms", {randoms});
        }
    });
}

export default randomsController;