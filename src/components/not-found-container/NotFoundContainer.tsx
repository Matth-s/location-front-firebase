import React from 'react';

import './styles.scss';

type Props = {
  children: React.ReactNode;
};

const NotFoundContainer = ({ children }: Props) => {
  return <div className="not-found-container">{children}</div>;
};

export default NotFoundContainer;
