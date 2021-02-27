/* const fs = require('fs');

module.exports = JSON.parse(fs.readFileSync(__dirname + '/products.json','utf-8')); */
const fs = require('fs');
const path = require('path');
const products_db = path.join('data','products.json');

module.exports = {
    getProducts : () => {
        return JSON.parse(fs.readFileSync(products_db,'utf-8'));
    },
    setProducts : (data) => {
        fs.writeFileSync(products_db,JSON.stringify(data,null,2),'utf-8');
    }
}
