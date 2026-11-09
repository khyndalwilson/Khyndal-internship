import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpiryTimer from '../UI/ExpiryTimer';

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const fetchExploreItems = async (selectedFilter = '') => {
    setLoading(true);
    try {
      const url = selectedFilter
        ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${selectedFilter}`
        : 'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore';
      
      const response = await axios.get(url);
      const dataArray = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
      setItems(dataArray);
    } catch (error) {
      console.error('Error fetching explore items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExploreItems();
  }, []);

  const handleFilterChange = (e) => {
    const selectedValue = e.target.value;
    setFilter(selectedValue);
    fetchExploreItems(selectedValue);
  };

  const loadMoreItems = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <>
      {/* Filter Dropdown Row */}
      <div className="col-md-12 mb-8">
        <select
          id="filter-items"
          value={filter}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-purple-600"
        >
          <option value="">Default sorting</option>
          <option value="price_low_to_high">Price, low to high</option>
          <option value="price_high_to_low">Price, high to low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {/* Items Grid / Skeleton Loader */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="h-[380px] bg-gray-100 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      ) : (
        items.slice(0, visibleCount).map((item, index) => (
          <div key={item.id || index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-6">
            <div className="nft-card-container flex flex-col h-[380px] w-full p-3 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              
              {/* Card Image Banner */}
              <div className="relative h-60 w-full bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                {item.authorImage && (
                  <img
                    src={item.authorImage}
                    alt="Author"
                    className="absolute top-3 left-3 w-10 h-10 rounded-full border-2 border-white object-cover shadow-md z-10"
                  />
                )}

                {item.expiryDate && (
                  <div className="absolute top-3 right-3 z-10">
                    <ExpiryTimer expiryDate={item.expiryDate} />
                  </div>
                )}

                <img
                  src={item.nftImage || item.itemImage}
                  alt={item.title || 'NFT Item'}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Card Details */}
              <div className="pt-3 flex flex-col justify-between flex-grow">
                <h4 className="font-bold text-gray-900 text-base truncate">
                  {item.title || 'Untitled'}
                </h4>

                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px]">Price</span>
                    <span className="font-bold text-gray-900">
                      {item.price !== undefined ? `${item.price} ETH` : '0.00 ETH'}
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
        ))
      )}

      {/* Load More Button */}
      {!loading && visibleCount < items.length && (
        <div className="col-md-12 text-center mt-8">
          <button
            onClick={loadMoreItems}
            className="btn-main inline-block cursor-pointer bg-[#7c3aed] text-white font-semibold px-8 py-3 rounded-md hover:bg-[#6d28d9] transition-all shadow-md"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;