import "dotenv/config";
import clientPromise from "../lib/mongodb";
import { mockStudents } from "../lib/mock-data";

async function seedStudents() {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("students");

  // Remove existing students
  await collection.deleteMany({});
  // Insert mock students
  await collection.insertMany(mockStudents);
  console.log("Seeded students collection with mock data.");
}

seedStudents()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
