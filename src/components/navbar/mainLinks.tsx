import { mainUserNavLinks } from '@/utils/glogalConst.ts';
import { Link, useLocation } from 'react-router-dom';

const MainLinks = () => {
  const pathName = useLocation().pathname;

  // const mutationLink = mainUserNavLinks.find((link) => {
  //   if (pathName.split('/').length > 4) {
  //     const newLink = pathName.split('/').reverse().slice(2).reverse().join('/');
  //     console.log(newLink);
  //     if (link.href === newLink) return newLink;
  //   }
  // });
  //
  // console.log(mutationLink);

  return (
    <div className="flex items-center justify-between w-full">
      {mainUserNavLinks.map((link, index) => (
        <div key={index}>
          <Link
            className="relative text-white text-base font-semibold flex items-center gap-2 cursor-pointer select-none transition-all hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-200 hover:to-purple-200"
            key={link.label + index}
            to={link.href}
          >
            {link.label}
          </Link>
          {link.href === pathName ? (
            <div className="h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default MainLinks;
