import express, { urlencoded } from 'express'
import env from 'dotenv'
import { connectDB } from './config/DBconfig.js';
import cors from 'cors';
import { authRoute } from './routes/authRoute.js';
import { listingRoute } from './routes/listingRoutes.js';
import { bookingRoutes } from './routes/bookingRoutes.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'
import User from './models/user.js';



env.config();
connectDB();

const port = process.env.PORT || 8081;
const app = express();

app.use(cookieParser());
app.use(express.json())
app.use(cors({
    origin: process.env.BASE_URL,
    credentials: true
}));
app.use(urlencoded({extended: true}))


app.use('/api/listings', listingRoute);
app.use('/api/bookings', bookingRoutes);
app.use('/api',authRoute);
app.get('/',(req,res)=>{
    res.status(200).json({message: "Hello SatyFinder"})
})
app.get('/api/me', async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(decoded?.id).select('-password');

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    console.error("JWT error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
});


app.listen(port,()=>{
    console.log(`Server Started at ${port}`)
})