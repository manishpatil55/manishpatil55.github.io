import ArrowUpRightIcon from '@/assets/icons/arrow-up-right.svg'

const footerLinks = [
  {
    title: 'GitHub',
    href: 'https://github.com/manishpatil55/',
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/manishkakulde/',
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/manishpatil.55/',
  },
  {
    title: 'Google Cloud',
    href: 'https://www.cloudskillsboost.google/public_profiles/d34b4468-ff57-480d-8675-b9a4e550d50b',
  },
]

export const Footer = () => {
  return (
    <footer id="footer" className='relative -z-10 overflow-x-clip'>
      <div className='absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/30 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10'></div>
      <div className="container">
        <div className='border-t border-white/15 py-6 text-sm flex flex-col md:flex-row md:justify-between items-center gap-8'>
          <div className='text-white/40'>&copy; 2025. All rights reserved.</div>
          <div>
            <nav className='flex flex-col md:flex-row items-center gap-8'>
              {footerLinks.map(link => (
                <a href={link.href} key={link.title} className='inline-flex items-center gap-1.5'>
                  <span className='font-semibold'>{link.title}</span>
                  <ArrowUpRightIcon className="size-4" />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
