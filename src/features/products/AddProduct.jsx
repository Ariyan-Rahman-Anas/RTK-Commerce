import { useDispatch } from 'react-redux';
import { addNotification } from '././../notifications/notificationSlice';
import { addUserProduct, generateUniqueId } from "./../userProducts/userProductsSlice";
import { useNavigate } from "react-router-dom";

export default function AddProductPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const uniqueId = generateUniqueId()

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const form = e.target;
        const brand = form.brand.value;
        const category = form.category.value;
        const title = form.title.value;
        const description = form.description.value;
        const availabilityStatus = form.availability.value;
        const price = form.price.value;
        const discountPercentage = form.discountPercentage.value;

        try {
            const newProduct = { id: uniqueId, brand, category, title, availabilityStatus, description, price, discountPercentage };
            await addUserProduct(newProduct)
            dispatch(addNotification({
                id: Date.now(),
                message: 'Product added successfully!',
                type: 'success',
                duration: 3000, 
            }));
            dispatch(addUserProduct(newProduct))
            navigate("/my-products", {replace: true})
        } catch (err) {
            dispatch(addNotification({
                id: Date.now(),
                message: 'Failed to add product',
                type: 'error',
                duration: 3000, 
            }));
        }
    };

    return (
        <div className="my-10 text-center">
            <form onSubmit={handleAddProduct} className="space-y-4 w-full md:w-[80vw] lg:w-[60vw] mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative brand w-full">
                        <input
                            type="text"
                            name="brand"
                            required
                            className="input-field peer"
                            placeholder=" "
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
                        />
                        <label
                            htmlFor="title"
                            className="input-label"
                        >
                            Title
                        </label>
                    </div>
                    <div className="relative description w-full">
                        {/* <input
                            type="text"
                            name="description"
                            required
                            className="input-field peer"
                            placeholder=" "
                        /> */}
                        <select name="availability" required className='input-field' >
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
                        {/* <input
                            type="text"
                            name="description"
                            required
                            className="input-field peer"
                            placeholder=" "
                        /> */}
                        <textarea name="description" className='input-field' rows="3" required  ></textarea>
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