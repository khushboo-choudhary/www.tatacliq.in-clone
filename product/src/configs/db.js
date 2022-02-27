const mongoose=require('mongoose');

module.exports= ()=>{
    return mongoose.connect("mongodb+srv://tatacliqclone:tatacliq@cluster0.hbbfo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
}