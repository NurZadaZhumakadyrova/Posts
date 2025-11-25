import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <big
      className={
        'text-2xl absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4'
      }
    >
      404 Page not found |
      <Link to={'/'} className={'text-black underline ml-1'}>
        Back to home
      </Link>
    </big>
  );
};

export default NotFound;
