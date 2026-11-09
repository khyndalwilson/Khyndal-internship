import React, { useState, useEffect, useRef } from 'react';
import OwlCarousel from 'react-owl-carousel';

const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!expiryDate) return;

    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = Number(expiryDate) - now;

      if (distance <= 0) {
        setTimeLeft('');
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [expiryDate]);

  if (!timeLeft) return null;

  return (
    <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-800 border-2 border-gray-200 shadow-sm z-10">
      {timeLeft}
    </div>
  );
};

const NFTCarouselRow = ({ title, nftList = [] }) => {
  const owlRef = useRef(null);

  const options = {
    loop: false,
    margin: 20,
    nav: false,
    dots: false,
    responsive: {
      0: { items: 1 },
      640: { items: 2 },
      1024: { items: 3 },
      1280: { items: 4 }
    }
  };

  return (
    <section className="w-full bg-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header with Title & Arrow Controls */}
        <div className="relative flex items-center justify-between mb-6">
          <h2 className="section-title">
            {title}
          </h2>
          
          <div className="flex space-x-2 z-20">
            <button
              onClick={() => owlRef.current?.prev()}
              className="w-10 h-10 rounded-full bg-white text-black border border-gray-300 flex items-center justify-center shadow-md hover:bg-gray-100 transition-all cursor-pointer"
              aria-label="Previous"
            >
              &#10094;
            </button>
            <button
              onClick={() => owlRef.current?.next()}
              className="w-10 h-10 rounded-full bg-white text-black border border-gray-300 flex items-center justify-center shadow-md hover:bg-gray-100 transition-all cursor-pointer"
              aria-label="Next"
            >
              &#10095;
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <OwlCarousel ref={owlRef} className="owl-theme" {...options}>
            {nftList.map((item, index) => (
              <div key={item.id || index} className="item !flex !flex-col h-full p-1">
                <div className="nft-card-container shadow-sm hover:shadow-md transition-shadow flex flex-col h-[380px] w-full">
                  
                  {/* Card Image */}
                  <div className="relative h-60 w-full bg-gray-100 overflow-hidden rounded-xl flex-shrink-0">
                    {item.authorImage && (
                      <img
                        src={item.authorImage}
                        alt="Author"
                        className="absolute top-3 left-3 w-10 h-10 rounded-full border-2 border-white object-cover shadow-md z-10"
                      />
                    )}
                    
                    <CountdownTimer expiryDate={item.expiryDate} />

                    <img
                      src={item.nftImage}
                      alt={item.title || 'NFT'}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="pt-3 px-1 pb-1 flex flex-col justify-between flex-grow bg-white">
                    <h4 className="font-bold text-gray-900 text-base truncate">
                      {item.title || 'Untitled'}
                    </h4>

                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 text-xs">
                      <div>
                        <span className="text-gray-400 block text-[10px]">
                          {item.price !== undefined ? 'Price' : 'Code'}
                        </span>
                        <span className="font-bold text-gray-900">
                          {item.price !== undefined ? `${item.price} ETH` : (item.code || 'ERC-721')}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500 space-x-1">
                        <span className="text-rose-500">❤️</span>
                        <span>{item.likes || 0}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </OwlCarousel>
        </div>

      </div>
    </section>
  );
};

export default NFTCarouselRow;