import React from 'react';
import Landing from '../components/home/Landing';
import LandingIntro from '../components/home/LandingIntro';
import HotCollections from '../components/home/HotCollections';
import NewItems from '../components/home/NewItems';
import TopSellers from '../components/home/TopSellers';
import BrowseByCategory from '../components/home/BrowseByCategory';

const Home = () => {
  return (
    <div id="wrapper" className="min-h-screen bg-white">
      {/* Top Hero Section */}
      <Landing />
      <LandingIntro />

      {/* Main Content Sections with Generous Spacing */}
      <div className="space-y-16 pb-16">
        <HotCollections />
        <NewItems />
        <TopSellers />
        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;