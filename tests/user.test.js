const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

const testUserOneId = new mongoose.Types.ObjectId();
const testUserOne = {
    _id: testUserOneId,
    name: "Test User One",
    email: "testuser1@email.com",
    password: "testuserone",
    tokens: [{
        _id: new mongoose.Types.ObjectId(),
        token: jwt.sign({ _id: testUserOneId }, process.env.HASH_SECR),
    }]
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

test('login fail test', async () => {
    await request(app).post('/users/login').send({
        email: testUserOne.email,
        password: "wrongCredential",
    }).expect(400);
});

test('read profile test', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${testUserOne.tokens[0].token}`)
        .send()
        .expect(200);
})

test('read profile fail test', async ()=>{
    await request(app)
    .get('/users/me')
    .send()
    .expect(401);
})

