import { connectToDatabase, insert } from "../utils/nedb";


export default function handle_records({msg}) {
    const { db } = connectToDatabase();
    insert(db[msg["level"].toLowerCase() + "s"], msg);
}