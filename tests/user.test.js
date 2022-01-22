const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

const testUserOne = {
    name: "Test User One",
    email: "testuser1@email.com",
    password: "testuserone",
}

beforeEach(async () => {
    await User.deleteMany();
    await new User(testUserOne).save();

});

test('signup test', async () => {
    await request(app).post('/users').send({
        name: "supertest user",
        email: "supertest@email.com",
        password: "supertest"
    }).expect(201);
})

test('signin test', async () => {
    await request(app).post('/users/login').send({
        email: testUserOne.email,
        password: testUserOne.password,
    }).expect(200);
});

test('login fail test', async ()=>{
    await request(app).post('/users/login').send({
        email: testUserOne.email,
        password: "wrongCredential",
    }).expect(400);
});