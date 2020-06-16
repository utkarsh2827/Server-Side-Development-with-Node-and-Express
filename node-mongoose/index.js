const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});

connect.then((db) => {

    console.log('Connected correctly to server');
    Dishes.create({
        name: 'Uthapizza',
        description: 'Test'
    })
    .then((dish) => {
        console.log(dish);
        
        return Dishes.findByIdAndUpdate(dish._id,{
            $set:{description:'Updated test'},
            
        },{
            new: true
        }).exec();
    })
    .then((dish) => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: 'Test Comment',
            author: 'Leonardo Di Caprio'
        });
        return dish.save();
    })
    .then((dish)=>{
        console.log(dish);
        return Dishes.deleteMany({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err)
    });

});