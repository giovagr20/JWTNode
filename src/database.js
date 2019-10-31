const mongoose = require('mongoose');
const URI = 'mongodb://localhost/JWTNode';

mongoose.connect(URI,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(db=>console.log(`Database is connected on ${URI}`))
.catch(err => console.log(`Error ocurred ${err}`));