> An easy-to-use and simple Instagram package that allow you to fetch media content without API and access token.

# Install

```
$ npm install @raddo/easy-instagram-feed
 or
$ yarn add @raddo/easy-instagram-feed
```

## Usage

```js
import React from "react";

import getInstagramFeed, {
  InstagramFeedType,
} from "@raddo/easy-instagram-feed";

type InstaType = InstagramFeedType | null;

const Index: React.FC = () => {
  const [instaFeed, setInstaFeed] = React.useState<InstaType>(null);

  React.useEffect(() => {
    getInstagramFeed("natgeotravel").then(feed => setInstaFeed(feed));
  }, []);

  if (!instaFeed) return null;

  return (
    <>
      <h1>National Geographic Travel</h1>
      <span>
        It’s a big world. Explore it through the lens of our photographers.
      </span>
      {instaFeed.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={image.alt}
          onClick={() => window.open(image.url, "_blank")}
        />
      ))}
    </>
  );
};
```

![alt text](https://i.ibb.co/0ZVhHfh/natgeotravel.png)

## Maintainer

| [![Radovan Pelka (Rado)](https://github.com/RadovanPelka.png?size=100)](https://github.com/RadovanPelka) |
| -------------------------------------------------------------------------------------------------------- |


| [Radovan Pelka](https://github.com/RadovanPelka)
