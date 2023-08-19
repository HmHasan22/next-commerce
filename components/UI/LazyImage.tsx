// @ts-ignore
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
type Props = {
  src: string;
  alt: string;
  className: string;
};
const LazyImage = (props: Props) => {
  return (
    <LazyLoadImage
      className='object-contain'
      src={props.src}
      alt={props.alt}
      effect='blur'
    />
  );
};
export default LazyImage;
