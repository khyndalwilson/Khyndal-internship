import React from 'react';
import ExpiryTimer from './UI/ExpiryTimer';

const NFTCard = ({ item }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Image Wrapper */}
      <div 
        className="relative bg-gray-100"
        style={{ width: '100%', height: '210px', overflow: 'hidden', position: 'relative' }}
      >
        <img
          src={item.nftImage}
          alt={item.title || 'NFT'}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {/* Top-Right Expiry Timer */}
        <ExpiryTimer expiryDate={item.expiryDate} />

        {/* Top-Left Author Avatar */}
        {item.authorImage && (
          <img
            src={item.authorImage}
            alt="Author"
            className="absolute top-3 left-3 w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm z-10"
          />
        )}
      </div>

      {/* Card Info */}
      <div className="p-4 bg-white">
        <h3 className="text-gray-900 font-bold text-base truncate mb-2">
          {item.title || 'Untitled NFT'}
        </h3>
        
        <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
          <div>
            <p className="text-gray-400 text-xs font-medium">Price</p>
            <p className="text-gray-900 font-bold text-sm">
              {item.price ? `${item.price} ETH` : 'N/A'}
            </p>
          </div>
          
          <div className="flex items-center gap-1 text-gray-400 text-xs font-medium">
            <span className="text-rose-500">❤️</span>
            <span>{item.likes || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;