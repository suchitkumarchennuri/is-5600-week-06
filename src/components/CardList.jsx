import React, { useState, useEffect } from "react";

import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const CardList = ({data}) => {
  
const limit = 10;
const defaultDataset = data.slice(0, limit);
const [offset, setOffset] = useState(0);
const [products, setProducts] = useState(defaultDataset);

const handlePrevious = () => {
  // set the offset to the previous 10 products
  setOffset(offset - 10);
}

const handleNext = () => {
  // set the offset to the next 10 products
  setOffset(offset + 10);
}

useEffect(() => {
  // set the products state variable to the next 10 products
  setProducts(data.slice(offset, offset + limit));
}, [offset, limit, data]);

const filterTags = (tagQuery) => {
  const filtered = data.filter(product => {
    if(!tagQuery){
      return product;
    }
    return product.tags.find(({title})=> title === tagQuery)

    
  })
  setOffset(0);
  setProducts(filtered.slice(0,limit));
}
  
  
  return (
    <div className="cf pa2">
      <Search  handleSearch={filterTags}/>
      <div className="mt2 mb2">
        {/* // Using the data prop, we map over the list of products and render a Card component for each product */}
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      
      
      <div className="flex items-center justify-center pa4">   
        <Button text="Previous" handleClick = {handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  )
}

export default CardList;