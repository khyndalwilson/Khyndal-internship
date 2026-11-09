import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import ExpiryTimer from '../UI/ExpiryTimer';

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const owlRef = useRef(null);

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await axios.get(
          'https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems'
        );
        const dataArray = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
        setItems(dataArray);
      } catch (error) {
        console.error("Error fetching new items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  const options = {
    loop: false,
    margin: 24,
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
    <section className="w-full bg-white py-12 mb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="w-full text-center mb-8">
          <h2 className="section-title text-2xl font-bold text-gray-900">
            New Items
          </h2>
        </div>

        {/* Carousel / Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="nft-card-container h-[380px] p-3 bg-white rounded-2xl border border-gray-200 animate-pulse">
                <div className="w-full h-60 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative px-12">
            <button
              onClick={() => owlRef.current?.prev()}
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white text-black border border-gray-300 flex items-center justify-center shadow-md hover:bg-gray-100 transition-all cursor-pointer"
              aria-label="Previous"
            >
              &#10094;
            </button>

            <OwlCarousel ref={owlRef} className="owl-theme" {...options}>
              {items.map((item, index) => (
                <div key={item.id || index} className="item h-full py-2 px-1">
                  {/* NFT Card with padding (p-3) & fixed height for equal spacing */}
                  <div className="nft-card-container flex flex-col h-[380px] w-full p-3 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    
                    {/* Image Container */}
                    <div className="relative h-60 w-full bg-gray-100 overflow-hidden rounded-xl flex-shrink-0">
                      {item.authorImage && (
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            src={item.authorImage}
                            alt="Author"
                            className="absolute top-3 left-3 w-10 h-10 rounded-full border-2 border-white object-cover shadow-md z-10"
                          />
                        </Link>
                      )}
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage || item.image}
                          alt={item.title || "NFT item"}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      {item.expiryDate && (
                        <div className="absolute top-3 right-3 z-10">
                          <ExpiryTimer expiryDate={item.expiryDate} />
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="pt-3 px-1 flex flex-col justify-between flex-grow">
                      <div>
                        <Link to={`/item-details/${item.nftId}`}>
                          <h4 className="font-bold text-gray-900 text-base truncate hover:text-purple-600 transition-colors">
                            {item.title || "Untitled"}
                          </h4>
                        </Link>
                        <div className="text-gray-500 text-sm font-medium mt-1">
                          {item.price !== undefined ? `${item.price} ETH` : "0.00 ETH"}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-gray-400 text-xs">
                        <span></span>
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

            <button
              onClick={() => owlRef.current?.next()}
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white text-black border border-gray-300 flex items-center justify-center shadow-md hover:bg-gray-100 transition-all cursor-pointer"
              aria-label="Next"
            >
              &#10095;
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default NewItems;