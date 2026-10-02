import {spawnSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
const result=spawnSync(process.execPath,['--test','tests/core.test.js','tests/api.test.js'],{stdio:'inherit'});if(result.status)process.exit(result.status);
const spec=JSON.parse(readFileSync('public/openapi.json','utf8'));if(spec.openapi!=='3.1.0')throw new Error('OpenAPI version mismatch');
