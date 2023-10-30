import app from "./app.js";
import { connectToDatabase } from "./db/connect.js";

const PORT = process.env.PORT || 5000;
//connectors and listeners
connectToDatabase().then(()=>{
    app.listen(PORT,()=>console.log("server is listening"));

})
.catch((err)=> console.log(err)
);

