import { useSelector } from "react-redux"
import UserProductCard from './../../components/UserProductCard';

export default function UserAddedProducts() {

  const products = useSelector(state => state.userProductsReducer.products)
  console.log()

  return (
    <div className="my-10 w-full md:w-[85vw] mx-auto ">
      <h1 className="text-left text-4xl font-extralight">Products Added by You</h1>
      <p className="text-primary text-left text-xl border-b border-primary w-fit font-semibold mb-5">Powered by__Redux Toolkit</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <UserProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}