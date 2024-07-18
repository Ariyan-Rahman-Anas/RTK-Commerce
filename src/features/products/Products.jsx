import { useGetProductsQuery } from "./../../app/api/productsApi"
import ProductCard from "./../../components//ProductCard"

const Products = () => {

    const {data, isError, isLoading} = useGetProductsQuery()
  const products = data?.data

  return (
    <div className="min-h-screen my-10 w-full md:w-[85vw] mx-auto flex flex-col items-center justify-center ">
      {}
        <div>
            {
          isLoading ? <h1>Loading...</h1> : products ? <div>
            <h1 className="text-left w-full text-4xl font-extralight ">{`Here're some of our products`}</h1>
          <p className="text-primary text-left w-fit text-xl border-b border-primary font-semibold mb-5">Powered by__RTK Query</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"> {products.map(product => <ProductCard key={product.id} product={product} />)} </div> </div> : isError && <h1>error........</h1>      
            }      
        </div>
    </div>
  )
}
export default Products