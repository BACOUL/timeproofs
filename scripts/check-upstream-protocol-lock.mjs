import fs from 'node:fs/promises';

const lock = JSON.parse(await fs.readFile('protocols/upstream-lock.json','utf8'));
const token = process.env.GITHUB_TOKEN || '';
let changed = 0;

for (const surface of lock.surfaces) {
  const url = `https://api.github.com/repos/${surface.repository}/contents/${surface.path}`;
  const headers = {
    'accept': 'application/vnd.github+json',
    'user-agent': 'timeproofs-upstream-watch'
  };
  if (token) headers.authorization = `Bearer ${token}`;
  const response = await fetch(url,{headers});
  if (!response.ok) throw new Error(`Cannot inspect ${surface.id}: GitHub ${response.status}`);
  const current = await response.json();
  if (current.sha !== surface.blob_sha) {
    changed += 1;
    console.error(`UPSTREAM CHANGE ${surface.id}: reviewed ${surface.blob_sha}, current ${current.sha}`);
  } else {
    console.log(`UNCHANGED ${surface.id} ${surface.blob_sha}`);
  }
}

if (changed) {
  console.error(`\n${changed} reviewed protocol surface(s) changed. Re-audit adapter/pack semantics before updating the lock.`);
  process.exit(2);
}
console.log('\nAll reviewed upstream protocol surfaces match the lock.');
