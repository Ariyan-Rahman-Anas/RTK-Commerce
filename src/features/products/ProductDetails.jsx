import { useLocation, useNavigate } from "react-router-dom"
import { useGetProductByIdQuery } from "./../../app/api/productsApi"
import { useDispatch } from "react-redux"
import { addNotification } from "../notifications/notificationSlice"

export default function ProductDetails() {

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  console.log(location.state._id)

  const gettingDataFromLS = localStorage.getItem("userData");
  const userData = JSON.parse(gettingDataFromLS);
  console.log("user data from details", userData)

  if (userData === null ) {
    navigate("/log-in" , {replace:true})
    dispatch(addNotification({
      id: Date.now(),
      message: "Please Logged in",
      type: "error",
      duration: 3000
    }))
  }

    const {data, isError, isLoading} = useGetProductByIdQuery(location?.state?._id)  
    const { _id, title, availabilityStatus, brand, category, description, dimensions, discountPercentage, images, meta, minimumOrderQuantity, price, rating, returnPolicy, reviews, shippingInformation, stock, tags, thumbnail, warrantyInformation, weight } = data?.data || {}
    
    if (isError) {
        return <h1>Errorrrrrrrrrrrrr</h1>
    }

  return (
    <div className="my-10 w-full md:w-[80vw] lg:w-[60vw] mx-auto ">
         
           <h1 className="text-center text-2xl ">{title }</h1>
          
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center ">
                  {images?.map((image, index)=> <img src={image} alt="product image"  key={index}/> ) }
          </div>
          <div>
              <p>{description }</p>
          </div>
    </div>
  )
}