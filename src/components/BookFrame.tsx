import React from 'react';

interface BookFrameProps {
  children: React.ReactNode;
}

export const BookFrame: React.FC<BookFrameProps> = ({ children }) => {
  return (
    <div className="relative w-full max-w-6xl min-h-[85vh] mx-auto my-4 bg-medieval-leather rounded-2xl p-4 md:p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] border-4 border-amber-900/60 ring-8 ring-amber-950/40">
      {/* Ornate Gold Corners */}
      <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-medieval-gold rounded-tl-md pointer-events-none" />
      <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-medieval-gold rounded-tr-md pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-medieval-gold rounded-bl-md pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-medieval-gold rounded-br-md pointer-events-none" />
      
      {/* Central Spine Binding Effect for Desktop Viewports */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-4 bg-gradient-to-r from-black/40 via-black/10 to-black/40 transform -translate-x-1/2 z-20 pointer-events-none border-l border-r border-amber-950/30" />
      
      <div className="w-full h-full relative z-10 flex flex-col">
        {children}
      </div>
    </div>
  );
};