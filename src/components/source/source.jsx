// @flow

import * as React from 'react';

type Props = {
  media?: string,
  sizes?: string,
  srcSet: string,
  type?: string,
}

const Source = ({
  media,
  sizes,
  srcSet,
  type,
}: Props) => (
  <source
    media={media}
    sizes={sizes}
    srcSet={srcSet}
    type={type}
  />
);

export { Source as default };
