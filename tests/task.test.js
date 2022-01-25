const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/user');
const { testUserOne, testUserOneId, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('create task test', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${testUserOne.tokens[0].token}`)
        .send({
            description: "test the test task",
        })
        .expect(201);

})

test('read task', async () => {
    await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${testUserOne.tokens[0].token}`)
        .send()
        .expect(200)
})