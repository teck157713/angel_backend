import "dotenv/config";
import { server } from "./app";

server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}!`);
});
