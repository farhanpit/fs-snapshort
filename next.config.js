/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
 
})


const nextConfig = {
  reactStrictMode: true,
  images: {
       remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      
        // pathname: '/account123/**',
      },
    ],

  },
}


module.exports = withPWA(nextConfig);






