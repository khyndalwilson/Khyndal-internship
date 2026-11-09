import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const owlRef = useRef(null);

  useEffect(() => {
    const fetchHotCollections = async () => {
      try {
        const response = await axios.get(
          'https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections'
        );
        const dataArray = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
        setCollections(dataArray);
      } catch (error) {
        console.error("Error fetching hot collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotCollections();
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
            Hot Collections
          </h2>
        </div>

        {/* Carousel / Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-[380px] p-3 bg-white rounded-2xl border border-gray-200 animate-pulse flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
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
              {collections.map((item, index) => (
                <div key={item.id || index} className="item h-full py-2 px-1">
                  {/* Collection Card Container */}
                  <div className="nft-card-container flex flex-col justify-between h-[380px] w-full p-4 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-center">
                    
                    {/* Collection Image & Author Avatar */}
                    <div className="relative h-48 w-full bg-gray-100 rounded-xl overflow-hidden mb-4">
                      <img
                        src={item.nftImage || item.image}
                        alt={item.title || "Collection Item"}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {item.authorImage && (
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            src={item.authorImage}
                            alt="Author"
                            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-4 border-white object-cover shadow-md z-10"
                          />
                        </Link>
                      )}
                    </div>

                    {/* Collection Info */}
                    <div className="pt-6 flex flex-col items-center justify-between flex-grow">
                      <div>
                        <Link to={`/item-details/${item.nftId}`}>
                          <h4 className="font-bold text-gray-900 text-base truncate hover:text-purple-600 transition-colors">
                            {item.title || "Untitled Collection"}
                          </h4>
                        </Link>
                        <div className="text-gray-500 text-xs font-semibold mt-1">
                          ERC-{item.code || "721"}
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

export default HotCollections;