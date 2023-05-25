//conexión a Base de datos
const mongoose = require("mongoose");
const dbConnect = () => {
  const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ms0ubtw.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
  mongoose.set("strictQuery", false);
  mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, res) => {
      if (!err) {
        console.log("**** ✔BD CONECTADA ****");
      } else {
        console.log("**** 🛑ERROR AL CONECTARSE ****", err);
      }
    }
  );
};

module.exports = { dbConnect };
