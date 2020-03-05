import React from 'react';
import { Statuses } from '../types';
import { extractNwontart, extractUrl } from '../functions';

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
        <div className="p-8 w-screen">
          <div
            className="flex w-full p-1 overflow-x-scroll items-center"
            style={{ height: '24rem' }}
          >
            {mediaTweets.map(tw => {
              return (
                <>
                  {tw.entities.media?.map(media => (
                    <div
                      key={media.id_str}
                      className="flex relative h-64 w-64 m-1 cursor-pointer transition duration-200 ease-in-out transform hover:scale-125"
                      style={{ minWidth: '16rem', maxWidth: '16rem' }}
                    >
                      <a
                        href={`https://twitter.com/${tw.user.screen_name}/status/${tw.id_str}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          className="object-contain h-full w-full"
                          src={media.media_url_https}
                        />
                        <div className="absolute bottom-0 z-10 h-24 w-full p-2 opacity-75 bg-red-400">
                          <div>
                            <p className="text-xs">
                              {extractNwontart(extractUrl(tw.text))}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-end justify-end w-full absolute bottom-0 z-20">
                          <div className="pr-1">
                            <p className="text-xs">{tw.user.name}</p>
                            <p className="text-xs">@{tw.user.screen_name}</p>
                          </div>
                          <div className="h-8 w-8 m-1">
                            <a
                              href={`https://twitter.com/${tw.user.screen_name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={tw.user.profile_image_url_https}
                                className="object-contain h-full w-full transform hover:scale-110"
                              />
                            </a>
                          </div>
                        </div>
                      </a>
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
                      className="flex items-center m-1 p-1 shadow-lg cursor-pointer transition ease-in-out hover:bg-red-100 transform hover:scale-110"
                    >
                      <div className="h-12 w-12">
                        <img
                          src={status.user.profile_image_url_https}
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
