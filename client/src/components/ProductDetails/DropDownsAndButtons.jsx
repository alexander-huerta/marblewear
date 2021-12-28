import React, { useState, useEffect } from 'react';
import './prodStyles.css';


function DropDownsAndButtons ({styles, currentProductID, currentStyleID}) {

  const [inventory, updateInventory] = useState(5)


  const getCurrentProductObject = (targetId, allProducts) => {
    return allProducts.filter((product) => {
      return product.product_id === targetId
    })
  }

  const currentProductObject = getCurrentProductObject(currentProductID, styles);

  const getStylesArray = (targetStyleId, stylesArray) => {
    return stylesArray.filter((style) => {
      return style.style_id === targetStyleId
    })
  }

  const stylesArray = currentProductObject[0]['results'];

  const currentStyleObject = getStylesArray(currentStyleID, stylesArray)

  const availableSkus = currentStyleObject[0]['skus']

  const skusArray = [];
  for (const key of Object.keys(availableSkus)) {
    skusArray.push(key)
  }

let inventoryArray = []
for(var i = 1; i <inventory+1; i++){
  inventoryArray.push(i)
}

const updateInventoryarray = (newInventory) => {
  let inventoryArray = []
for(var i = 1; i <inventory+1; i++){
  inventoryArray.push(i)
}
return inventoryArray
}

  return (
    <div>
      <select
        className="select"
        name ="size"
        value={skusArray}
        onChange={e => {
          updateInventory(8)
          alert(`Size ${e.target.value} selected`)}
        }>
        {skusArray.map((sku) => {
          return <option> {availableSkus[sku]['size']} </option>
          })}
      </select>

      <select
        className="select"
        name ="quantity"
        onChange={e => alert(`Quantity of ${e.target.value} selected`)}>
          {inventoryArray.map((num)=><option value={num}> {num} </option>)}
      </select>

      <button
        className = "button"
        type="submit"
        onClick={e => alert(`${productList.productToDisplay.name} added to Favorites`)}>
        ADD TO BAG
      </button>

      <button
        className = "button"
        id="favorite"
        type="submit"
        onClick={e => alert(`${productList.productToDisplay.name} added to Cart`)}>
        Favorite
      </button>

    </div>
  )
}

export default DropDownsAndButtons;

