#!/bin/bash

# Portfolio Version Management Script
# Usage: ./scripts/archive-version.sh <version-number>
# Example: ./scripts/archive-version.sh 2

set -e

VERSION="$1"

if [ -z "$VERSION" ]; then
    echo "❌ Error: Version number required"
    echo "Usage: ./scripts/archive-version.sh <version-number>"
    echo "Example: ./scripts/archive-version.sh 2"
    exit 1
fi

VERSION_DIR="versions/v${VERSION}"

if [ -d "$VERSION_DIR" ]; then
    echo "❌ Error: Version v${VERSION} already exists at ${VERSION_DIR}"
    exit 1
fi

echo "📦 Archiving current site as v${VERSION}..."

# Create version directory
mkdir -p "$VERSION_DIR"

# Copy source files
cp -r src "$VERSION_DIR/"
cp package.json package-lock.json "$VERSION_DIR/"
cp next.config.mjs "$VERSION_DIR/"
cp next-env.d.ts tsconfig.json "$VERSION_DIR/"
cp tailwind.config.ts postcss.config.mjs "$VERSION_DIR/"

# Update the archived version's next.config.mjs with basePath
cat > "$VERSION_DIR/next.config.mjs" << EOF
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/v${VERSION}',
  assetPrefix: '/v${VERSION}',
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\\.svg\$/i,
        resourceQuery: /url/,
      },
      {
        test: /\\.svg\$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      }
    );
    fileLoaderRule.exclude = /\\.svg\$/i;
    return config;
  },
};

export default nextConfig;
EOF

echo "✅ Version v${VERSION} archived to ${VERSION_DIR}"
echo ""
echo "📝 Next steps:"
echo "   1. Update versions.json to add v${VERSION} entry"
echo "   2. Update .github/workflows/nextjs.yml to build v${VERSION}"
echo "   3. Replace src/ with your new version's code"
echo "   4. Update versions.json 'activeVersion' to your desired version"
echo "   5. Commit and push!"
