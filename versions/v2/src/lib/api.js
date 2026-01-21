import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'public', 'content');

export async function getSortedPostsData(section) {
    const dir = path.join(contentDirectory, section);
    if (!fs.existsSync(dir)) return [];

    const fileNames = fs.readdirSync(dir);
    const allPostsData = await Promise.all(fileNames.map(async (fileName) => {
        const fullPath = path.join(dir, fileName);

        // Check if it's a directory (nested content like projects/featured)
        if (fs.lstatSync(fullPath).isDirectory()) {
            const indexFile = path.join(fullPath, 'index.md');
            if (fs.existsSync(indexFile)) {
                const fileContents = fs.readFileSync(indexFile, 'utf8');
                const matterResult = matter(fileContents);

                const processedContent = await remark()
                    .use(html)
                    .process(matterResult.content);
                const contentHtml = processedContent.toString();

                return {
                    id: fileName,
                    ...matterResult.data,
                    contentHtml,
                };
            }
            return null;
        }

        // Standard markdown file
        if (fileName.endsWith('.md')) {
            const id = fileName.replace(/\.md$/, '');
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const matterResult = matter(fileContents);

            const processedContent = await remark()
                .use(html)
                .process(matterResult.content);
            const contentHtml = processedContent.toString();

            return {
                id,
                ...matterResult.data,
                contentHtml,
            };
        }
        return null;
    }));

    // Filter out nulls
    const filteredData = allPostsData.filter(Boolean);

    // Sort posts by date
    return filteredData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export async function getPostData(section, id) {
    // Handle both flat files and directories with index.md
    let fullPath = path.join(contentDirectory, section, `${id}.md`);
    if (!fs.existsSync(fullPath)) {
        fullPath = path.join(contentDirectory, section, id, 'index.md');
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}
