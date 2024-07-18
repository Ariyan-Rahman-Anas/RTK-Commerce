import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateUserProduct } from "./userProductsSlice";
import { useDispatch } from "react-redux";
import { addNotification } from "./../../features/notifications/notificationSlice";

export default function EditProduct() {

  const location = useLocation();
  const dispatch = useDispatch()
  const navigate =useNavigate()


  const [id, setId]  =useState(location.state.id)
  const [brand, setBrand] = useState(location.state.brand);
  const [category, setCategory] = useState(location.state.category);
  const [title, setTitle] = useState(location.state.title);
  const [description, setDescription] = useState(location.state.description);
  const [price, setPrice] = useState(location.state.price);
  const [availabilityStatus, setAvailabilityStatus] = useState(location.state.price);
  const [discountPercentage, setDiscountPercentage] = useState(location.state.discountPercentage);

  const handleUpdateProduct = async (e) => {
    e.preventDefault()
    try {
      await dispatch(updateUserProduct({ id, title,
        availabilityStatus,
        brand,
        category,
        price,
        description,
      discountPercentage,
      }))
      dispatch(addNotification ({
                id: Date.now(),
                message: 'Product update successfully!',
                type: 'success',
                duration: 3000, 
            }));
    navigate("/my-products", {replace: true})
    } catch (error) {
      dispatch(addNotification({
                id: Date.now(),
                message: 'Failed to update product',
                type: 'error',
                duration: 3000, 
            }));
    }
    
  }



  return (
    <div className="my-10 text-center">
       <form onSubmit={handleUpdateProduct} className="space-y-4 w-full md:w-[80vw] lg:w-[60vw] mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative brand w-full">
                        <input
                            type="text"
                            name="brand"
                            required
                            className="input-field peer"
              placeholder=" "
              value={brand}
              onChange={(e)=>setBrand(e.target.value)}
                        />
                        <label
                            htmlFor="brand"
                            className="input-label"
                        >
                            Brand
                        </label>
                    </div>
                    <div className="relative category w-full">
                        <input
                            type="text"
                            name="category"
                            required
                            className="input-field peer"
              placeholder=" "
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
                        />
                        <label
                            htmlFor="category"
                            className="input-label"
                        >
                            Category
                        </label>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative title w-full">
                        <input
                            type="text"
                            name="title"
                            required
                            className="input-field peer"
              placeholder=" "
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
                        />
                        <label
                            htmlFor="title"
                            className="input-label"
                        >
                            Title
                        </label>
                    </div>
                    <div className="relative availability w-full">
                        <select name="availability" required className='input-field' value={availabilityStatus} onChange={(e)=>setAvailabilityStatus(e.target.value)} >
                            <option value="In Stock">In Stock</option>
                            <option value="Low Stock">Low Stock</option>
                        </select>
                        <label
                            htmlFor="description"
                            className="input-label"
                        >
                            Availability
                        </label>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative price w-full">
                        <input
                            type="number"
                            name="price"
                            required
                            className="input-field peer"
              placeholder=" "
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
                        />
                        <label
                            htmlFor="price"
                            className="input-label"
                        >
                            Price
                        </label>
                    </div>
                    <div className="relative discountPercentage w-full">
                        <input
                            type="number"
                            name="discountPercentage"
                            required
                            className="input-field peer"
              placeholder=" "
              value={discountPercentage}
              onChange={(e)=>setDiscountPercentage(e.target.value)}
                        />
                        <label
                            htmlFor="discountPercentage"
                            className="input-label"
                        >
                            Discount Percentage
                        </label>
                    </div>
                </div>
                <div className="relative description w-full">
                        <textarea name="description" className='input-field' rows="3" required value={description}
              onChange={(e)=>setDescription(e.target.value)} ></textarea>
                        <label
                            htmlFor="description"
                            className="input-label"
                        >
                            Description
                        </label>
                    </div>
                <input type="submit" value={"Add Product"} className="btn" />
            </form>
    </div>
  );
}