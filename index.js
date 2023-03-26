const mongoose = require('mongoose');
require('dotenv').config()

/************** connect to database ****************/
mongoose.connect(
    process.env.DB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    },
    (err) => {
        if (err) {
            console.log(err);
        } else console.log("database connected");
    }
);


let person = require('./person')


/************** create one doc ****************/

let pers = new person({
    name: "wael",
    age: 26,
    favoriteFoods: ["kosksi"]
})
pers.save()
    .then(doc => {
        console.log(doc)
    })
    .catch(err => {
        console.error(err)
    });


/************** create many docs ****************/

person.create([
    { name: "talel", age: 26, favoriteFoods: ["sandwich pepino"] },
    { name: "leila", age: 26, favoriteFoods: ["crepe"] },
    { name: "ahlem", age: 27, favoriteFoods: ["pizza"] }])
person.create([
    { name: "jed", age: 25, favoriteFoods: ["sandwich pepino"] },
    { name: "jed", age: 25, favoriteFoods: ["crepe"] },
    { name: "jed", age: 25, favoriteFoods: ["pizza"] }])


/************** Use model.find() to Search Your Database with name ****************/
person.find({ name: 'leila' }, function (err, docs) {
    if (err) { console.log(err) }
    else console.log(docs)
}).exec();


/************** Use model.findOne() to Return a Single Matching Document from Your Database with favoriteFood ****************/
person.findOne({ favoriteFoods: 'kosksi' }, function (err, doc) {
    if (err) {
        console.log(err)
    } else console.log(doc)
});


/************** Use model.findById() to Search Your Database By _id ****************/
person.findById({ _id: "6420684d7e20582c4c59642b" }, function (err, doc) {
    if (err) {
        console.log(err)
    } else console.log(doc)
});

/************** Perform Classic Updates by Running Find, Edit, then Save ****************/
person.findById({ _id: "6420684d7e20582c4c59642a" }, function (err, doc) {
    if (err) {
        console.log(err)
    } else {
        doc.favoriteFoods.push('loubya'); doc.save();
        console.log(doc)
    }
});


/************** Perform New Updates on a Document Using model.findOneAndUpdate() ****************/
person.findOneAndUpdate({ name: "leila" }, { $set: { age: 20 } }, { new: true }, function (err, doc) {
    if (err) {
        console.log(err)
    } else console.log(doc)
});

/************** Delete One Document Using model.findByIdAndRemove ****************/
person.findByIdAndRemove({ _id: "6420684d7e20582c4c59642d" }, function (err, doc) {
    if (err) {
        console.log(err)
    } else console.log(doc)
});

/************** MongoDB and Mongoose - Delete Many Documents with model.remove() ****************/
person.remove({ name: "jed" }, function (err, doc) {
    if (err) {
        console.log(err)
    } else console.log(doc)
});

/************** Chain Search Query Helpers to Narrow Search Results ****************/
person.find({ favoriteFoods: 'pizza' }).sort({ name: 1 }).limit(2).select("-age").exec(done = (err, doc) => {
    if (err) {
        console.log(err)
    } else { console.log(doc) }
})