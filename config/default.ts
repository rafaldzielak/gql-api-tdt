import dotenv from "dotenv";
dotenv.config();

export default {
  dbUri: `mongodb+srv://rafa:${process.env.MONGO_PASSWORD}@cluster0.3crkx1o.mongodb.net/?retryWrites=true&w=majority`,
};
