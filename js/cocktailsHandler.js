const PATH = './data/cocktails.json';
const fs = require('fs');

class Cocktails {
    readData() {
        const rawData = fs.readFileSync(PATH);
        const data = JSON.parse(rawData);
        return data;
    }

    get() {
        return this.readData();
    }

    add(data) {
        let allCocktails = this.get();
        allCocktails.push(data);
        this.store(allCocktails);
    }

    store(data) {
        const rawData = JSON.stringify(data, null, 2);
        fs.writeFile(PATH, rawData, (err) => {
            if (err) throw err;
            console.log('Data Saved');
        });
    }
}

module.exports = Cocktails;