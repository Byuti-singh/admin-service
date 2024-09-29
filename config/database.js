const mongoose = require('mongoose');

const connectDb = async () => {
    await mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => console.log('DB connection established'))
    .catch((error) => console.log('DB connection failed, error: ' + error));
};

module.exports = connectDb;