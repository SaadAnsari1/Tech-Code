const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://saad:pWHYfzmTr3RmYclY@cluster12.qt9s8.mongodb.net/saad?retryWrites=true&w=majority" ||"mongodb://localhost:27017/saad";
mongoose.connect(mongoURI, {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(
   console.log("data base ")
)
// const { MongoClient } =mongodb+srv://rafebhai0:AK8qzYx97U8Rf9Wlcluster0.jo55q.mongodb.net/News require('mongodb');"" |?retryWrites=true&w=majority| Tech-saad mongodb+srv://rafebhai0:<password>@cluster0.jo55q.mongodb.net/test

// const uri = "mongodb+srv://rafebhai0:RAFE$@@DIS@NSARI@cluster0.jo55q.mongodb.net/MERN?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { });
// client.connect(err => {
//    const collection = client.db("test").collection("devices");
//    // perform actions on the collection object
//    client.close();
// });
// // const mongoose = require('mongoose');|| "mongodb://localhost:27017/saad".then(() => {?retryWrites=true&w=majority
// //    console.log(`connection sucessful`); useNewUrlParser: true,
//       useCreateIndex: true,
//          useUnifiedTopology: true,
//             useFindAndModify: false

// }).catch((err) => console.log(`no connection ${err}`)
// );


// const mongoURI = 
// mongodb://localhost:27017/saad" 
// const connectToMongo = ()=>{
//     mongoose.connect(mongoURI, ()=>{
//         console.log("Connected to Mongo Successfully");
//     })
// }

// module.exports = connectToMongo;