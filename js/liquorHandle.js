const liquorPath = './data/liquor.json';
const fs = require('fs');

class Liquor {
    readData() {
        const data = fs.readFileSync(liquorPath);
        const liquor = JSON.parse(data);
        return liquor;
    }

    get() {
        return this.readData();
    }

    add(newLiquor) {
        let currentLiquor = this.get()
        currentLiquor.push(newLiquor);
        return this.store(currentLiquor);
    }

    store(data) {
        //sorting data alphabetically
        data.sort((a, b) => {
            let nameA = a.name.toUpperCase(); 
            let nameB = b.name.toUpperCase(); 
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
        });
        //Storing the data
        const rawdata = JSON.stringify(data, null, 2);
        fs.writeFile(liquorPath, rawdata, (err) => {
            if (err) throw err;
            console.log('Data saved');
        });
    }

    updateLiquor(data) {
        let currentLiquor = this.get();
        let index = currentLiquor.findIndex((liquor) => liquor.id == data.id);
        currentLiquor.splice(index, 1);
        let updateLiquor = {
            "id": data.id,
            "type": data.type,
            "name": data.name,
            "category": data.category,
            "country": data.country,
            "abv": data.abv,
            "quantity": data.quantity
        }
        currentLiquor.push(updateLiquor);
        this.store(currentLiquor);
    }

    remove(postId) {
        let currentLiquor = this.get();
        let index = currentLiquor.findIndex((liquor) => liquor.id == postId);
        currentLiquor.splice(index, 1);
        this.store(currentLiquor);
    }
}

module.exports = Liquor;