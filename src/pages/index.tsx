import React from 'react';
import Carousel from 'react-multi-carousel';
import { Statuses } from '../types';
import { extractNwontart, extractUrl } from '../functions';

type Props = {
  tweets: Statuses;
};

export default function Index({ tweets }: Props) {
  const mediaTweets = tweets.filter(tweet => tweet.entities.media);
  const nonMediaTweets = tweets.filter(tweet => !tweet.entities.media);

  const carouselOptions = {
    responsive: {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 8
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    },
    deviceType: 'desktop',
    centerMode: true,
    showDots: false,
    arrows: false,
    infinite: true,
    autoPlay: true,
    autoPlaySpeed: 2000,
    slidesToSlide: 1,
    containerClass: 'carousel-container',
    customTransition: 'transform 2000ms linear',
    ssr: true
  } as const;

  return (
    <div className="flex">
      <div className="w-full">
        <div className="p-8 w-full">
          <div className="flex w-full p-1 items-center">
            <Carousel {...carouselOptions}>
              {mediaTweets.map(tweet => (
                <div
                  key={tweet.entities.media![0].id_str}
                  className="flex relative h-64 w-64 m-1 cursor-pointer transition duration-200 ease-in-out transform hover:scale-125"
                  style={{ minWidth: '16rem', maxWidth: '16rem' }}
                >
                  <a
                    href={`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="object-contain h-full w-full"
                      src={tweet.entities.media![0].media_url_https}
                    />
                    <div className="absolute bottom-0 z-10 h-24 w-full p-2 opacity-75 bg-red-400">
                      <div>
                        <p className="text-xs">
                          {extractNwontart(extractUrl(tweet.text))}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-end justify-end w-full absolute bottom-0 z-20">
                      <div className="pr-1">
                        <p className="text-xs">{tweet.user.name}</p>
                        <p className="text-xs">@{tweet.user.screen_name}</p>
                      </div>
                      <div className="h-8 w-8 m-1">
                        <a
                          href={`https://twitter.com/${tweet.user.screen_name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={tweet.user.profile_image_url_https}
                            className="object-contain h-full w-full transform hover:scale-110"
                          />
                        </a>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </Carousel>
          </div>
        </div>

        <div>
          <div className="flex justify-center">
            <div className="container">
              {nonMediaTweets.map(tweet => (
                <a
                  href={`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    key={tweet.id_str}
                    className="flex items-center m-1 p-1 shadow-lg cursor-pointer transition ease-in-out hover:bg-red-100 transform hover:scale-110"
                  >
                    <div className="h-12 w-12">
                      <img
                        src={tweet.user.profile_image_url_https}
                        className="object-contain h-full w-full"
                      />
                    </div>
                    <div className="pl-1 w-full">
                      <p className="text-gray-900 font-semibold">
                        <a
                          href={`https://twitter.com/${tweet.user.screen_name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {tweet.user.name} @{tweet.user.screen_name}
                        </a>
                      </p>
                      <p className="text-gray-800">{tweet.text}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="h-24"></div>
        <div className="fixed bottom-0 w-full flex justify-end bg-red-400 opacity-75">
          <div className="p-2">
            {['ヌォンタート', '名取爆誕'].map(tag => (
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
  const { default: tweets } = await import('../tweets.json');

  return { tweets };
};
