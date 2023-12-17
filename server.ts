require("dotenv").config();
import {app} from "./app/app";
import connectDB from "./config/db.config";

(function () {
    // Database calling
    connectDB();
})();

app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${process.env.PORT}`);
});
