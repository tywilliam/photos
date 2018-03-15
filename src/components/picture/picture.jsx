// @flow

import * as React from 'react';
import styled from 'styled-components';

import Source from '../source';

type Props = {
  alt: string,
  children?: React.ChildrenArray<React.Element<typeof Source>>,
  className?: string,
  src: string,
  title: string,
}

const Picture = ({
  alt,
  children,
  className,
  src,
  title,
}: Props) => (
  <picture className={className}>
    { children }
    <img
      alt={alt}
      src={src}
      title={title}
    />
  </picture>
);

export default styled(Picture)``;
