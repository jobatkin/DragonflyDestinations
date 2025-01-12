const dotenv = require("dotenv");
const environment = process.env.NODE_ENV || "local";
dotenv.config({ path: `./.env.${environment}`, override: true }); // Load environment variables first

const cors = require("cors");
const app = require('./app');
const { connectMysql } = require("./dbConnect"); // Import after dotenv is configured

const PORT = process.env.PORT || 8000;

app.use(cors());

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}.`);
  await connectMysql();
});
