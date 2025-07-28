module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.api-sports.io',
        pathname: '/football/teams/**',
      },
      {
        protocol: 'https',
        hostname: 'media.api-sports.io',
        pathname: '/football/coachs/**',
      },
      {
        protocol: 'https',
        hostname: 'media.api-sports.io',
        pathname: '/football/leagues/**',
      },
      {
        protocol: 'https',
        hostname: 'media.api-sports.io',
        pathname: '/football/players/**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.api-sports.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};