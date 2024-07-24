import { useState } from 'react';
import { useGetProductsQuery } from './../../app/api/productsApi';
import ProductCard from './../../components/ProductCard';
import Pagination from './../../components/Pagination';

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;
  const { data, isError, isLoading } = useGetProductsQuery({ page: currentPage, limit });
  const products = data?.data;
  const totalPages = data ? Math.ceil(data.totalData / limit) : 1;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen mt-10 w-full md:w-[85vw] mx-auto flex flex-col items-center justify-center px-2 ">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : isError ? (
        <h1>Error...</h1>
      ) : (
        <div className="w-full my-6 ">
          <h1 className="text-left w-full text-4xl font-extralight">
            Here are some of our products
          </h1>
          <p className="text-primary text-left w-fit text-xl border-b border-primary font-semibold mb-5">
            Powered by RTK Query
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Products;