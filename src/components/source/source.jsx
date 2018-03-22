// @flow

import * as React from 'react';

export type Props = {
  media?: string,
  sizes?: string,
  srcset: string,
  type?: string,
}

const Source = ({
  media,
  sizes,
  srcset,
  type,
}: Props) => (
  <source
    media={media}
    sizes={sizes}
    srcSet={srcset}
    type={type}
  />
);

export { Source as default };
