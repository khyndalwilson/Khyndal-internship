import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel';

const HotCollections = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const owlRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections'
        );
        const dataArray = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
        setItems(dataArray);
      } catch (error) {
        console.error('Error fetching hot collections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    loop: true,
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
    <section className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="w-full text-center mb-10">
          <h2 className="section-title">Hot Collections</h2>
        </div>

        {/* Carousel Container with Arrows on Left & Right Sides */}
        <div className="relative px-10">
          {/* Left Arrow Button */}
          <button
            onClick={() => owlRef.current?.prev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white text-gray-800 border border-gray-300 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all cursor-pointer"
            aria-label="Previous"
          >
            &#10094;
          </button>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-[340px] bg-gray-100 animate-pulse rounded-2xl"></div>
              ))}
            </div>
          ) : (
            <OwlCarousel ref={owlRef} className="owl-theme" {...options}>
              {items.map((item, index) => (
                <div key={item.id || index} className="item p-1">
                  <div className="nft-card-container flex flex-col h-[350px] w-full p-3 bg-white rounded-2xl border border-gray-200">
                    
                    {/* Collection Banner / NFT Image */}
                    <div className="relative h-52 w-full bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                      {item.authorImage && (
                        <img
                          src={item.authorImage}
                          alt={item.title || 'Author'}
                          className="absolute top-3 left-3 w-10 h-10 rounded-full border-2 border-white object-cover shadow-md z-10"
                        />
                      )}
                      <img
                        src={item.nftImage}
                        alt={item.title || 'Hot Collection'}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Collection Details */}
                    <div className="pt-3 flex flex-col justify-between flex-grow">
                      <h4 className="font-bold text-gray-900 text-base truncate">
                        {item.title || 'Untitled'}
                      </h4>

                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                        <div>
                          <span className="block text-[10px] text-gray-400">Code</span>
                          <span className="font-bold text-gray-900">{item.code || 'ERC-721'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-rose-500">❤️</span>
                          <span>{item.likes || 0}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}

          {/* Right Arrow Button */}
          <button
            onClick={() => owlRef.current?.next()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white text-gray-800 border border-gray-300 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all cursor-pointer"
            aria-label="Next"
          >
            &#10095;
          </button>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;