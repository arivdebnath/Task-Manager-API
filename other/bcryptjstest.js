const bcryptjs = require('bcryptjs');

const com = async (password, hashedone)=>{
    const result = await bcryptjs.compare(password, hashedone);
    console.log(result)
}

com('lalalalala', "$2a$08$i/IylrlWxIfaU6cFjV/BLuu8fgvdt/UhpoShiZBxv8a0AJ8VHYAy2");