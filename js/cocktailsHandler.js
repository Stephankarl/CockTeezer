const PATH = './data/cocktails.json';
const fs = require('fs');

class Cocktails {
    readData() {
        const rawData = fs.readFileSync(PATH);
        const data = JSON.parse(rawData);
        console.log(data);
        return data;
    }

    get() {
        return this.readData();
    }
}

module.exports = Cocktails;