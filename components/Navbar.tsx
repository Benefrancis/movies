import React, { useState, useEffect } from 'react';
import { Search, Bell, User, Film } from 'lucide-react';

interface NavbarProps {
  onHomeClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onHomeClick }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/60 backdrop-blur-xl border-b border-white/5' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex items-center gap-8 cursor-pointer" onClick={onHomeClick}>
            <div className="flex items-center gap-2">
              <Film className="w-6 h-6 text-white" />
              <span className="text-xl font-bold tracking-tight text-white">CineStream</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={onHomeClick} className="text-sm font-medium text-white hover:text-gray-300 transition-colors">Início</button>
              <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Filmes</button>
              <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Séries</button>
              <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Minha Lista</button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold ring-2 ring-white/10 cursor-pointer">
              JD
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
