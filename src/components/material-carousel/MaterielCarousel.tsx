import { Carousel } from 'react-responsive-carousel';
import { arrayPictureSchema } from '../../schema';

import emptyImage from '../../assets/empty-image.svg';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './styles.scss';

type Props = {
  arrayPicture: arrayPictureSchema[] | [];
  presentationPicture: string;
};

const MaterielCarousel = ({
  arrayPicture,
  presentationPicture,
}: Props) => {
  let imageGroup: string[] = [];

  imageGroup = [
    presentationPicture,
    ...(arrayPicture
      .map((image) => {
        if (image.src !== presentationPicture) {
          return image.src;
        }
        return undefined;
      })
      .filter((imageSrc) => imageSrc !== undefined) as string[]),
  ];

  if (presentationPicture === '') {
    imageGroup = [emptyImage];
  }

  return (
    <Carousel>
      {imageGroup.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Image ${index}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default MaterielCarousel;
