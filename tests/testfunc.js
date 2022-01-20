const ftoc = (temp) => {
    return (temp-32)/1.8;
}

const ctof= (temp) => {
    return (temp*1.8) + 32;
}

module.exports = {ftoc, ctof};