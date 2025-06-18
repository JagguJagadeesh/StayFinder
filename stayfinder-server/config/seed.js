import { connectDB } from "./DBconfig.js";
import Listing from "../models/listing.js";
import User from "../models/user.js";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";

const indiaCities = [
  "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Coimbatore", "Goa", "Shimla"
];

const imageUrls = [
  "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJvb21zfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHJvb21zfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHJvb21zfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1671269705771-1ae9b3162118?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fHJvb21zfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1612320583354-02dd0cf04612?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fHJvb21zfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1676823547752-1d24e8597047?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fHJvb21zfGVufDB8fDB8fHww",
  "https://media.istockphoto.com/id/1201049991/photo/hostel-room.jpg?s=612x612&w=0&k=20&c=j8jjVNyD-uHUw3atvnU2PCzqqgCgVk93AgN5XNdFYwA=",
  "https://images.unsplash.com/photo-1648383228240-6ed939727ad6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTF8fHJvb21zfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1668260592478-a6513b0a690e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAyfHxyb29tc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1674676471380-1258cb31b3ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIxfHxyb29tc3xlbnwwfHwwfHx8MA%3D%3D"
];

const seedListings = async () => {
  await connectDB();

  const hosts = await User.find({ role: 'host' });

  if (hosts.length === 0) {
    console.log('❌ No hosts found. Please seed users with role: "host" first.');
    return mongoose.disconnect();
  }

  await Listing.deleteMany({});
  console.log('🧹 Existing listings cleared.');

  for (let i = 0; i < 20; i++) {
    const host = faker.helpers.arrayElement(hosts);

    const newListing = new Listing({
      title: faker.lorem.words(3),
      description: faker.lorem.sentences(2),
      location: faker.helpers.arrayElement(indiaCities),
      price: faker.number.int({ min: 1000, max: 8000 }),
      images: faker.helpers.arrayElements(imageUrls, 2),
      host: host._id,
    });

    await newListing.save();
  }

  console.log('✅ 20 Indian listings created.');
  mongoose.disconnect();
};

seedListings();
