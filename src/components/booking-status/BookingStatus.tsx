import { useEffect, useState } from 'react';

import './styles.scss';

type Props = {
  status: boolean;
};

const BookingStatus = ({ status }: Props) => {
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    switch (status) {
      case false:
        setColor('#ff8f00');
        break;
      case true:
        setColor('#33D69F');
        break;
    }
  }, []);
  return (
    <div
      style={{
        backgroundColor: `rgba(${color}, 0.4)`,
      }}
      className="status-div"
    >
      <span style={{ backgroundColor: `${color}` }}></span>
      <h4 style={{ color: `${color}` }}>{`${
        status === true ? 'Terminé' : 'En cours'
      }`}</h4>
    </div>
  );
};

export default BookingStatus;
