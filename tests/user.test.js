const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');
const userRouter = require('../src/routes/user');

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
    const response = await request(app).post('/users').send({
        name: "supertest user",
        email: "supertest@email.com",
        password: "supertest"
    }).expect(201);

    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    expect(response.body).toMatchObject({
        user: {
            name: 'supertest user',
            email: 'supertest@email.com',
        },
        token: user.tokens[0].token,
    })

    expect(user.password).not.toBe('supertest');

})

test('signin test', async () => {
    const response = await request(app).post('/users/login').send({
        email: testUserOne.email,
        password: testUserOne.password,
    }).expect(200);

    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // expect(user.tokens[1].token).toBe(response.body.token);
    expect(response.body.token).toBe(user.tokens[1].token);
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
});

test('read profile fail test', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
});

test('delete profile test', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${testUserOne.tokens[0].token}`)
        .send()
        .expect(200);
    
    const user = await User.findById(testUserOneId);
    expect(user).toBeNull();
});

test('delete profile fail test', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401);
});