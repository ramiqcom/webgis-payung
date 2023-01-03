// Import module
import fs from 'fs';

// Key
const key = ['jalan', 'sungai']

// JSON
let collection = {};

// Default function
export default async function handler(req, res) {
    const path = './public/geojson';
    fs.readdir(path, async (err, files) => {

        for (let i = 0; i < files.length; i++){
            
            const id = key[i];
            const file = files[i];

            fs.readFile((path + '/' + file), async (err, data) => {
                collection[id] = await JSON.parse(data);
                if (i == files.length - 1){
                    res.send(collection);
                }
            })
        }
    })
}