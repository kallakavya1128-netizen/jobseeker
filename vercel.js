// Vercel deployment configuration helper
// Provides route rewrite configuration for Single Page Applications (SPA) on Vercel

export default {
  rewrites: [
    {
      source: '/(.*)',
      destination: '/index.html',
    },
  ],
};
