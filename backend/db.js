import mongoose from "mongoose";

mongoose.connect(
"mongodb://test:test@ac-no8vbfo-shard-00-00.rmc7ng8.mongodb.net:27017,ac-no8vbfo-shard-00-01.rmc7ng8.mongodb.net:27017,ac-no8vbfo-shard-00-02.rmc7ng8.mongodb.net:27017/campusComplaint?ssl=true&replicaSet=atlas-4s1ew4-shard-0&authSource=admin&appName=Cluster0"
)
.then(() => {
    console.log("Database Connected");
})
.catch((error) => {
    console.log(error);
});