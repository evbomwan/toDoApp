# Webpack Template

A reusable Webpack starter template for JavaScript projects. This template includes all the configuration needed to start building immediately without repeatedly setting up Webpack.

## Features

* Webpack 5
* Webpack Dev Server
* HTML Webpack Plugin
* CSS Loader
* Style Loader
* HTML Loader
* Asset Modules for images
* Source Maps
* ES Modules
* Clean production builds
* Ready for GitHub Pages deployment

## Project Structure

```text
webpack-template/
├── dist/
├── src/
│   ├── assets/
│   ├── images/
│   ├── modules/
│   ├── index.js
│   ├── styles.css
│   └── template.html
├── webpack.config.js
├── package.json
└── .gitignore
```

## Creating a New Project

1. Click **Use this template** on GitHub.
2. Give the new repository a name.
3. Clone the new repository.

```bash
git clone git@github.com:<your-username>/<project-name>.git
cd <project-name>
```

## Install Dependencies

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

## Production Build

Create a production build:

```bash
npm run build
```

The production files will be generated in the `dist` folder.

## Deploy to GitHub Pages

```bash
npm run build
npm run deploy
```

## Included Webpack Configuration

* HTML template support
* CSS imports
* Image imports
* Automatic HTML generation
* Source maps for debugging
* Automatic cleaning of the `dist` folder before each build

## License

MIT

