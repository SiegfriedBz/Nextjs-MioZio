import { v2 as cloudinary } from 'cloudinary'
import 'dotenv/config'

const PROD_ENV = process.env.NODE_ENV === 'production'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
  // unique_filename: false,
  overwrite: true,
  invalidate: !PROD_ENV, // Invalidate the CDN old assests cache if not in production
})

export default cloudinary
