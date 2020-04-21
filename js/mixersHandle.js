const PATH = './data/mixers.json';
const fs = require('fs');

class Mixers {
    readData() {
        const rawData = fs.readFileSync(PATH);
        const data = JSON.parse(rawData);
        return data;
    }

    get() {
        return this.readData();
    }

    add(data) {
        let currentData = this.get();
        let newData = {
            "id": data.id,
            "type": data.type,
            "name": data.name,
            "quantity": data.quantity,
            "image": ""
        }
        currentData.push(newData);
        this.store(currentData);
    }

    store(data) {
        const rawData = JSON.stringify(data, null, 2);
        fs.writeFile(PATH, rawData, (err) => {
            if (err) throw err;
            console.log('Data Saved');
        });
    }

    update(data) {
        let allData = this.get();
        let index = allData.findIndex((mixer) => mixer.id == data.id);
        allData.splice(index, 1);
        let newData = {
            "id": data.id,
            "type": data.type,
            "name": data.name,
            "quantity": data.quantity,
            "image": ""
        }
        allData.push(newData);
        this.store(allData);
    }

    delete(data) {
        let allData = this.get();
        const index = allData.findIndex((mixer) => mixer.id == data.id);
        allData.splice(index, 1);
        this.store(allData);
    }
}

module.exports = Mixers;