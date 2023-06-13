/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'lh3.googleusercontent.com',
            'pavlo-next-ecommerce.s3.amazonaws.com',
        ],
    },
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ['mongoose'],
    },
    webpack(config) {
        config.experiments = { ...config.experiments, topLevelAwait: true };
        return config;
    },
};

module.exports = nextConfig;
//,
