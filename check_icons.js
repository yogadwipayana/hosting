
import fs from 'fs';
import path from 'path';

const iconPath = path.resolve('node_modules/@hugeicons/core-free-icons/dist/types/index.d.ts');
const content = fs.readFileSync(iconPath, 'utf-8');

const keywords = [
    'Folder', 'Cloud', 'Server', 'Database',
    'Flash', 'Zap', 'Workflow', 'Auto',
    'Graduation', 'Mortarboard', 'Study', 'Book',
    'Bookmark',
    'Arrow', 'Plus', 'Add',
    'Activity', 'Pulse',
    'Alert', 'Warning',
    'Check', 'Tick',
    'Link', 'External'
];

const allIcons = [];
const regex = /declare const (\w+Icon):/g;
let match;
while ((match = regex.exec(content)) !== null) {
    allIcons.push(match[1]);
}

console.log(`Found ${allIcons.length} total icons.`);

keywords.forEach(keyword => {
    const matches = allIcons.filter(icon => icon.toLowerCase().includes(keyword.toLowerCase()));
    console.log(`\n--- ${keyword} ---`);
    matches.slice(0, 10).forEach(icon => console.log(icon));
});

