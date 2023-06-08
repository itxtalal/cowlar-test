import FollowIcons from './FollowIcons';

const Footer = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-24 relative bg-black py-4 text-base text-center leading-5 text-white lg:text-lg">
      <div>
        <p>Designed & Developed by Talal</p>
        <a
          className="underline "
          target="_blank"
          href="https://mtalaljamil.me/"
        >
          mtalaljamil.me
        </a>
      </div>
      <FollowIcons />
    </div>
  );
};

export default Footer;
