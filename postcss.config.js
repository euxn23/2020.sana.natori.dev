const purgecss = [
  '@fullhuman/postcss-purgecss',
  {
    content: ['./src/components/**/*.tsx', './src/pages/**/*.tsx'],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    whitelist: ['carousel-container'],
    whitelistPatterns: [/^react-multi.*/]
  }
];

module.exports = {
  plugins: [
    'postcss-import',
    'tailwindcss',
    'autoprefixer',
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : [])
  ]
};
