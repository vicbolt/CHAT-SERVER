const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/chateo')
.then(()=>{
    console.log('DB CONNECTED')
})
.catch((_)=> {
    console.log('ERROR CONNECTING DB')
})

