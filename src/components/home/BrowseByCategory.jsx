import React from "react";
import { Link } from "react-router-dom";

const BrowseByCategory = () => {
  return (
    <section id="section-category" className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="row">
          
          {/* Section Header */}
          <div className="col-lg-12">
            <div className="text-center mb-12">
              <h2 className="section-title">
                Browse by category
              </h2>
            </div>
          </div>

          {/* Category Items */}
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fas fa-image"></i>
              <span>Art</span>
            </Link>
          </div>

          <div className="col-md-2 col-sm-4 col-6 mb-sm-30">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fas fa-music"></i>
              <span>Music</span>
            </Link>
          </div>

          <div className="col-md-2 col-sm-4 col-6 mb-sm-30">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fas fa-search"></i>
              <span>Domain Names</span>
            </Link>
          </div>

          <div className="col-md-2 col-sm-4 col-6 mb-sm-30">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fas fa-globe"></i>
              <span>Virtual Worlds</span>
            </Link>
          </div>

          <div className="col-md-2 col-sm-4 col-6 mb-sm-30">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fas fa-id-badge"></i>
              <span>Trading Cards</span>
            </Link>
          </div>

          <div className="col-md-2 col-sm-4 col-6 mb-sm-30">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fas fa-th"></i>
              <span>Collectibles</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;