import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    const {_id, title, availabilityStatus, brand, category, description, dimensions, discountPercentage, images, meta, minimumOrderQuantity, price, rating, returnPolicy, reviews, shippingInformation, stock, tags, thumbnail, warrantyInformation, weight } = product || {}
    
    const [available, setAvailable] = useState(true)
     useEffect(() => {
    if (availabilityStatus === "Low Stock") {
      setAvailable(false);
    }
  }, [availabilityStatus]);

  const productImage = images?.[0]
  

  return (
      <Link to={`/products/${_id}`} state={{_id}} className="relative shadow-md p-4 rounded-md bg-white hover:bg-gray-100 duration-500 ">
      <p className={`${!available ? "bg-danger" : "bg-primary"} absolute top-0 left-0 text-xs p-1 rounded-tl-md text-white `}>{availabilityStatus}</p>
          <div className="">
              <img src={productImage} alt="product's image" className="w-[8rem] h-[8rem] mx-auto " />
          </div>
          <h1 className="font-semibold text-lg text-center ">{title}</h1>
          <div className="flex items-center justify-between text-sm text-gray-500 ">
              <p>{brand ? brand : "Nothing" }</p>
              <p>{category}</p>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500 ">
              <p>${price}</p>
              <p>{discountPercentage}% off</p>
          </div>
    </Link>
  )
}
export default ProductCard