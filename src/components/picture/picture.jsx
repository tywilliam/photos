// @flow

import * as React from 'react';
import styled from 'styled-components';

type Props = {
  alt: string,
  className?: string,
  src: string,
  title: string,
}

const Picture = ({
  alt,
  className,
  src,
  title,
}: Props) => (
  <picture className={className}>
    {/* <source
      media="(min-width: 600px)"
      sizes="(max-width: 600px) 100vw"
      srcSet="https://c1.staticflickr.com/5/4705/26691259268_9123358b35_c.jpg"
      type="image/jpeg"
    />
    <source
      media="(min-width: 300px)"
      sizes="(max-width: 300px) 100vw"
      srcSet="https://c1.staticflickr.com/5/4705/26691259268_9123358b35_n.jpg"
      type="image/jpeg"
    /> */}
    <img
      alt={alt}
      src={src}
      title={title}
    />
  </picture>
);

export default styled(Picture)``;
