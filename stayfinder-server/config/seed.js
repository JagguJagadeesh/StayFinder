import { connectDB } from "./DBconfig.js";
import Listing from "../models/listing.js"; 
import User from "../models/user.js";        
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";

const smallImageUrls = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMBIUICbDpN09q9S87i1gbZNAoeAZeo_ccOw&s',
  'https://media.istockphoto.com/id/1284941025/photo/digitally-rendered-view-of-a-beautiful-living-room.jpg?s=1024x1024&w=is&k=20&c=ESkh0cnxEskwV7YlrqABIja_bblcosJNrNt_KxsMTFc=',
  'https://media.istockphoto.com/id/155396123/photo/ranthambhore-np-in-rajasthan-india.jpg?s=1024x1024&w=is&k=20&c=qQ2_3kBnZqVMBBy1-PmSLc1uRyfcTiz1YZaEf4Cccos=',
  'https://media.istockphoto.com/id/1335315919/photo/double-bed-in-a-large-bedroom.jpg?s=1024x1024&w=is&k=20&c=yHQvnG3l_g0dCrzElBjNPbONaHKDfZKG1pWtimcqJDQ=',
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

  for (let i = 0; i < 10; i++) {
    const host = faker.helpers.arrayElement(hosts);

    const newListing = new Listing({
      title: faker.lorem.words(3),
      description: faker.lorem.sentences(2),
      location: faker.location.city(),
      price: faker.number.int({ min: 1000, max: 8000 }),
      images: faker.helpers.arrayElements(smallImageUrls, 2),
      host: host._id,
    });

    await newListing.save();
  }

  console.log('✅ 10 listings created.');
  mongoose.disconnect();
};

seedListings();