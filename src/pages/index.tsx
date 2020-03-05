import React from 'react';
import { Status } from 'twitter-d';

type Props = {
  statuses: Status[];
};

export default function Index({ statuses }: Props) {
  return (
    <div>
      <div>
        <p>#名取さな誕生日おめでとう</p>
        <p>#名取誕生日おめでとう</p>
        <p>#さなちゃん誕生日おめでとう</p>
      </div>
      <div>
        {statuses.map(status => {
          return (
            <div>
              <p>{`@${(status.user as any).screen_name} ${
                (status as any).text
              }\nhttps://twitter.com/${
                (status.user as any).screen_name
              }/status/${status.id_str}`}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Index.getInitialProps = async () => {
  const { default: statuses } = await import('../statuses.json');

  return { statuses };
};
