require("dotenv").config();
import {app} from "./app/app";
import connectDB from "./config/db.config";

app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${process.env.PORT}`);
    connectDB();
});
