import { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUserProduct } from "./../features/userProducts//userProductsSlice";
import { addNotification } from "./../features/notifications/notificationSlice";
export default function UserProductCard({product}) {

  const { id, title, availabilityStatus, brand, category, price, description, discountPercentage, } = product || {}
    
    const dispatch= useDispatch()

     const [available, setAvailable] = useState(true)
     useEffect(() => {
    if (availabilityStatus === "Low Stock") {
      setAvailable(false);
    }
  }, [availabilityStatus]);

  
  const handleDeleteProduct = (productId) => {
    try {
      dispatch(removeUserProduct(productId))
     dispatch(addNotification({
                id: Date.now(),
                message: 'Product Delete successfully!',
                type: 'success',
                duration: 3000,
            }));
    } catch (error) {
      dispatch(addNotification({
                id: Date.now(),
                message: 'Failed to add product',
                type: 'error',
                duration: 3000, 
            }));
    }
  }

  return (
    <div className="relative shadow-md p-4 rounded-md bg-white hover:bg-gray-100 duration-500 ">
          <p className={`${!available ? "bg-red-500" : "bg-green-500"} absolute top-0 left-0 text-xs p-1 rounded-t-md rounded-r-none text-white `}>{availabilityStatus}</p>
          <div className="absolute top-2 right-2 flex items-center gap-2 ">
              <Link to={`/edit-product/${id}`} state={{id,
        title,
        availabilityStatus,
        brand,
        category,
        price,
        description,
        discountPercentage,}}  className="hover:text-warning duration-500" ><BiSolidEdit/> </Link>
              <button onClick={()=>handleDeleteProduct(id)} className="hover:text-red-500 duration-500"><AiOutlineDelete/> </button>
          </div>
          <h1 className="font-semibold text-lg text-center my-4 ">{title}</h1>
          <div className="flex items-center justify-between text-sm text-gray-500 ">
              <p>{brand ? brand : "Nothing" }</p>
              <p>{category}</p>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500 ">
              <p>${price}</p>
              <p>{discountPercentage}% off</p>
          </div>
    </div>
  )
}