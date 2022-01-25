const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const {testUserOne, testUserOneId, setupDatabase} = require('./fixtures/db');

beforeEach(setupDatabase);

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

    // const user = await User.findById(testUserOneId);  //alternatively
    const user = await User.findById(response.body.id);
    expect(user).toBeNull();
});

test('delete profile fail test', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401);
});

test('upload endpoint test', async () => {
    await request(app)
        .post('/users/me/avatars')
        .set('Authorization', `Bearer ${testUserOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/testpic.jpg')
        .expect(200);

    const user = await User.findById(testUserOne._id);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test('update field test', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${testUserOne.tokens[0].token}`)
        .send({
            name: "not mike",
            age: 30
        })
        .expect(200);

    const user = await User.findById(testUserOneId);
    expect(user.name).toBe('not mike');
})

test('update endpoint invaild field test', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${testUserOne.tokens[0].token}`)
        .send({
            invalid: 'not a legit field'
        })
        .expect(400);
})