/** @type {import('next').NextConfig} */
const nextConfig = {

    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8000/api/:path*',
            },
            {
                source: '/images/:path*',
                destination: 'http://localhost:8000/images/:path*',
            },            
        ]
    },
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
