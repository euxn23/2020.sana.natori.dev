import { searchTweetByQuery } from '../functions';
import Twitter from 'twitter';
import { promises as fs } from 'fs';
import * as path from 'path';

async function main() {
  const {
    CONSUMER_KEY,
    CONSUMER_SECRET,
    ACCESS_TOKEN_KEY,
    ACCESS_TOKEN_SECRET
  } = process.env;

  const client = new Twitter({
    consumer_key: CONSUMER_KEY!,
    consumer_secret: CONSUMER_SECRET!,
    access_token_key: ACCESS_TOKEN_KEY!,
    access_token_secret: ACCESS_TOKEN_SECRET!
  });
  const statuses = await searchTweetByQuery(client);

  await fs.writeFile(
    path.resolve(process.cwd(), 'src/statuses.json'),
    JSON.stringify(statuses)
  );
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
