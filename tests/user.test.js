const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

// beforeEach(async () => {
//     await request(app).pos
// })

afterEach(async () => {
    await User.findOneAndDelete({
        email: "supertest@email.com",
    })
});

test('signup test', async () => {
    await request(app).post('/users').send({
        name: "supertest user",
        email: "supertest@email.com",
        password: "supertest"
    }).expect(201);
})