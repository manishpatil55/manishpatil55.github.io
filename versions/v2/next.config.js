/** @type {import('next').NextConfig} */

// Use basePath only in production (GitHub Pages)
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    output: 'export',
    basePath: isProd ? '/v2' : '',
    assetPrefix: isProd ? '/v2' : '',
    images: {
        unoptimized: true,
    },
    compiler: {
        styledComponents: true,
    },
};

module.exports = nextConfig;
