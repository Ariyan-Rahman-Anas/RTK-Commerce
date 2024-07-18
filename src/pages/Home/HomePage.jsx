import { useGetProductsQuery } from "./../../app/api/productsApi";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";

export default function HomePage() {

  const { data, isError, isLoading } = useGetProductsQuery()
  const products = data?.data

  return (
    <div className="flex  items-center justify-center text-center ">
        <div>
        <div className="min-h-[90vh] flex flex-col items-center justify-center text-center gap-6 ">
          <h1 className="text-3xl tracking-wider leading-10 "><span className="text-7xl">Explore</span> <span className="border-b border-primary text-primary">Redux Toolkit Powered</span> <p className="text-5xl ">web application</p> </h1>
          <Link className="btn">Get Started</Link>
        </div>
        
        <div className="w-full md:w-[85vw] mx-auto my-20 ">
          <h1 className="text-left text-4xl font-extralight ">{`Here're some of our products`}</h1>
          <p className="text-primary text-left text-xl border-b border-primary w-fit font-semibold mb-5">Powered by__RTK Query</p>
            {
            isLoading ? <h1>Loading...</h1> : products ? <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> {products.map(product => <ProductCard key={product.id} product={product} />)} </div>
          <br />
          <Link to={"/products"} className="btn -5 ">See all</Link>
              
                </div> : isError && <h1>error........</h1>      
          }      
        </div>

        </div>
    </div>
  )
}