const fs = require('fs');

class ContentAndOptionalDataHandle {
    get(PATH) {
        const rawData = fs.readFileSync(PATH);
        const data = JSON.parse(rawData);
        return data;
    }

    add(data, PATH) {
        let allData = this.get(PATH);
        allData.push(data);
        this.store(allData, PATH);
    }

    remove(postId, PATH) {
        let allData = this.get(PATH);
        let index = allData.findIndex((data) => data.id == postId);
        allData.splice(index, 1);
        this.store(allData, PATH);
    }

    store(data, PATH) {
        //sorting data alphabetically
        data.sort((a, b) => {
            let typeA = a.type.toUpperCase(); 
            let typeB = b.type.toUpperCase(); 
            if (typeA < typeB) {
              return -1;
            }
            if (typeA > typeB) {
              return 1;
            }
            return 0;
        });
        //Storing the data
        const rawdata = JSON.stringify(data, null, 2);
        fs.writeFile(PATH, rawdata, (err) => {
            if (err) throw err;
            console.log('Data saved');
        });
    }
}

module.exports = ContentAndOptionalDataHandle;