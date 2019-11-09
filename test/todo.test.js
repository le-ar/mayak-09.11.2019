const request = require('supertest');
expect = require('chai').expect;
const app = require('../app');

// {
//     name: String,
//     done: Boolean,
// }

describe('GET /', () => {
    it('should return all todo', async () => {
        const res = await request(app).get('/');
        expect(res.status).to.equal(200);

        // console.log(1, JSON.parse(res.body), 2);
        

        expect(res.body.length).to.equal(0);
    });

    it('should add 1 todo', async() => {
        const res = await request(app)
         .post('/').send({name: 'todo element'})

        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('ok');
    });

    it('should add 1 todo with done false', async() => {
        let addedElement = {name: 'new todo element'};
        let res = await request(app)
         .post('/').send(addedElement)

        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('ok');

        res = await request(app).get('/');
        
        expect(res.body[1].name).to.equal(addedElement.name);
        expect(res.body[1].done).to.equal(false);
    });

    it('should delete todo element by id', async () => {
        let res = await request(app).post('/delete/0').send();
        expect(res.status).to.equal(200);

        res = await request(app).get('/');
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(1);
    });
});