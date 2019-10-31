const app = require('./app');

async function init(){
    await app.listen(app.get('port'));
    console.log(`Server run on port: ${app.get('port')}`);
}

init();