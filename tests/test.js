const { ftoc } = require('./testfunc');
const { ctof } = require('./testfunc');

test('ftoc', () => {
    const c = ftoc(32);
    expect(c).toBe(0);
})

test('ctof', () => {
    const f =ctof(0);
    expect(f).toBe(32);
})