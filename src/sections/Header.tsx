export const Header = () => {
  return (
      <div className="flex justify-center items-center fixed top-3 w-full z-10">
          <nav className="flex gap-1 p-0.5 border-white/15 rounded-full bg-white/10 backdrop-blur">
              <a href="#home" className="nav-item">
                  Home
              </a>
              <a href="#projects" className="nav-item">
                  Projects
              </a>
              <a href="#about" className="nav-item">
                  About
              </a>
              <a href="#contact" className="nav-item bg-white text-gray-950 hover:bg-white/75 hover:text-gray-950">
                  Contact
              </a>
          </nav>
      </div>
  );
};
