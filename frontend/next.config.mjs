/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'http',
              hostname: 'openweathermap.org',
            },
            {
                protocol: 'https',
                hostname: 'flagcdn.com',
            },    
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
            }        
        ],
    }    
};

export default nextConfig;
