const { connect } = require("mongoose");

module.exports = async () => {
  try {
    const db = await connect(process.env.DB_HOST);
    console.log(
      `db is connected. Name: ${db.connection.name}. Host: ${db.connection.host}. PORT: ${db.connection.port}`
        .green.bold.italic
    );
  } catch (error) {
    console.log(error.message.red.bold);
    process.exit(1);
  }
};

// const Cat = mongoose.model("Cat", { name: String });

// const kitty = new Cat({ name: "Zildjian" });
// kitty.save().then(() => console.log("meow"));
