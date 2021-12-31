import React from 'react';
import PropTypes from 'prop-types';
import AddOutfit from './AddOutfit.jsx';
import ProductCard from './ProductCard.jsx';

function YourOutfit({outfitProductsInfo}) {
  return (
    <div>
      <p>YOUR OUTFIT</p>
      <div className="main-gallery js-flickity" data-flickity='{"pageDots": false, "groupCells": "80%"}'>
        <AddOutfit />
        {outfitProductsInfo.map((outfitProductInfo, index) => {
          return (<ProductCard key={index} outfitProductInfo={outfitProductInfo} />);
        })}
      </div>
    </div>
  );
}

YourOutfit.propTypes = {
  outfitProductsInfo: PropTypes.object
};

export default YourOutfit;