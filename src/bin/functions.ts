import Twitter from 'twitter';
import TwitterD, { Status } from 'twitter-d';
import { SearchParam } from './types';

export async function searchTweetRecursively(
  client: Twitter,
  searchParam: SearchParam,
  sinceId?: string,
  maxId: string = '-1',
  counter = 0
): Promise<TwitterD.Status[]> {
  const SEARCH_MAX_COUNT = 100;
  const { query } = searchParam;

  const response = await client.get('search/tweets', {
    count: SEARCH_MAX_COUNT,
    q: query,
    since_id: sinceId,
    max_id: maxId
  });
  const statuses: TwitterD.Status[] = response.statuses;

  return statuses.length !== 0 && counter < 100
    ? [
        ...statuses,
        ...(await searchTweetRecursively(
          client,
          searchParam,
          sinceId,
          (BigInt(statuses.slice(-1)[0].id_str) - 1n).toString(),
          counter + 1
        ))
      ]
    : statuses;
}

export async function searchTweetByQuery(client: Twitter) {
  const baseParam = { excludeRetweet: true };
  const searchParams: SearchParam[] = [
    { query: '#ヌォンタート', ...baseParam },
    { query: '#名取さな誕生日おめでとう', ...baseParam },
    { query: '#名取誕生日おめでとう', ...baseParam },
    { query: '#さなちゃん誕生日おめでとう', ...baseParam },
    { query: '#名取さな', ...baseParam },
    { query: '#名取爆誕', ...baseParam }
  ];

  const sinceId = '-1';

  const statuses = await searchParams
    .reduce(async (statusesPromise: Promise<Status[]>, searchParam): Promise<
      Status[]
    > => {
      const statuses = await statusesPromise;
      const nextStatuses = await searchTweetRecursively(
        client,
        searchParam,
        sinceId
      )
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
          if (!next.id_str) {
            return ss;
          }
          return ss.map(s => s.id_str).includes(next.id_str)
            ? ss
            : [...ss, next];
        }, [])
        .sort((prev, next) =>
          BigInt(prev.id_str) > BigInt(next.id_str) ? 1 : -1
        )
    );

  return statuses;
}
