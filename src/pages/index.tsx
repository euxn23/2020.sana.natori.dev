import React from 'react';
import { Statuses } from '../types';

type Props = {
  statuses: Statuses;
};

export default function Index({ statuses }: Props) {
  const mediaTweets = statuses
    .filter(status => status.entities.media)
    .sort(() => Math.random() - 0.5);

  return (
    <div className="flex">
      <div>
        <div className="p-8" style={{ width: '99vw' }}>
          <div className="flex w-full p-1 overflow-x-scroll">
            {mediaTweets.map(tw => {
              return (
                <>
                  {tw.entities.media?.map(media => (
                    <div
                      key={media.id_str}
                      className="flex relative h-64 w-64 mr-1 ml-1"
                      style={{ minWidth: '16rem', maxWidth: '16rem' }}
                    >
                      <img
                        className="object-contain h-full w-full"
                        src={media.media_url}
                      />
                      <div className="absolute bottom-0 z-10 h-24 w-full p-2 opacity-75 bg-red-400">
                        <div>
                          <p className="text-xs">{tw.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex justify-center">
            <div className="container">
              {statuses.map(status => {
                return (
                  <a
                    href={`https://twitter.com/${status.user.screen_name}/status/${status.id_str}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div
                      key={status.id_str}
                      className="flex items-center p-1 shadow-lg hover:bg-red-100 cursor-pointer"
                    >
                      <div className="h-12 w-12">
                        <img
                          src={status.user.profile_image_url}
                          className="object-contain h-full w-full"
                        />
                      </div>
                      <div className="pl-1 w-full">
                        <p className="text-gray-900 font-semibold">
                          <a
                            href={`https://twitter.com/${status.user.screen_name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {status.user.name} @{status.user.screen_name}
                          </a>
                        </p>
                        <p className="text-gray-800">{status.text}</p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 w-full flex justify-end bg-red-400 opacity-75">
          <div className="p-2">
            {[
              'ヌォンタート',
              '名取さな誕生日おめでとう',
              '名取誕生日おめでとう',
              'さなちゃん誕生日おめでとう'
            ].map(tag => (
              <div>
                <p>
                  <a
                    href={`https://twitter.com/intent/tweet?hashtags=${tag}&url=https://sana.natori.dev`}
                  >
                    #{tag}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Index.getInitialProps = async () => {
  const { default: statuses } = await import('../statuses.json');

  return { statuses };
};
