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
};

export default nextConfig;
