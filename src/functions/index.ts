import Twitter from 'twitter';
import TwitterD, { Status } from 'twitter-d';

export async function searchTweet(
  client: Twitter,
  { query, lang }: SearchParam,
  sinceId?: string
): Promise<TwitterD.Status[]> {
  const SEARCH_MAX_COUNT = 100;

  const response = await client.get('search/tweets', {
    count: SEARCH_MAX_COUNT,
    q: query,
    since_id: sinceId,
    lang
  });
  const statuses: TwitterD.Status[] = response.statuses;

  return statuses;
}

export async function searchTweetRecursively(client: Twitter, sinceId: string) {
  const searchParams: SearchParam[] = [
    { query: '#ヌォンタート', excludeRetweet: true },
    { query: '#名取さな誕生日おめでとう', excludeRetweet: true },
    { query: '#名取誕生日おめでとう', excludeRetweet: true },
    { query: '#さなちゃん誕生日おめでとう', excludeRetweet: true }
  ];

  const statuses = await searchParams
    .reduce(async (statusesPromise: Promise<Status[]>, searchParam): Promise<
      Status[]
    > => {
      const statuses = await statusesPromise;
      const nextStatuses = await searchTweet(client, searchParam, sinceId)
        .then(ss =>
          searchParam.excludeQuery
            ? ss.filter(
                s => !(s as any).text.includes(searchParam.excludeQuery)
              )
            : ss
        )
        .then(ss =>
          searchParam.excludeRetweet
            ? ss.filter(s => !Boolean(s.retweeted_status))
            : ss
        );
      return [...statuses, ...nextStatuses];
    }, Promise.resolve([]))
    .then(statuses =>
      statuses
        .reduce((ss: Status[], next): Status[] => {
          if (!next?.id_str) {
            return ss;
          }
          return ss.map(s => s?.id_str).includes(next.id_str)
            ? ss
            : [...ss, next];
        }, [])
        .sort((prev, next) =>
          BigInt(prev.id_str) > BigInt(next.id_str) ? 1 : -1
        )
    );

  return statuses;
}

export type SearchParam = {
  query: string;
  lang?: string;
  excludeQuery?: string;
  excludeRetweet?: boolean;
};
