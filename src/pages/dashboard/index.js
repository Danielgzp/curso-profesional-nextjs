import Paginate from "components/Paginate";
import useFetch from "hooks/useFetch";
import { useState } from "react";
import endPoints from "services/api";
import { Chart } from "common/Chart";

const PRODUCT_LIMIT = 15;
//const PRODUCT_OFFSET = 15;

export default function Dashboard() {
  const [offsetProducts, setOffsetProducts] = useState(0);

  const products = useFetch(
    endPoints.products.getProducts(PRODUCT_LIMIT, offsetProducts),
    offsetProducts
  );
  const totalProducts = useFetch(endPoints.products.getProducts(0, 0)).length;
  const categoryNames = products?.map((product) => product.category);
  const categoryCount = categoryNames?.map((category) => category.name);

  const countOccurrences = (arr) =>
    arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});

  const data = {
    datasets: [
      {
        label: "Categories",
        data: countOccurrences(categoryCount),
        borderWidth: 2,
        backgroundColor: ["#ffbb11", "#c0c0c0", "#50AF95", "f3ba2f", "#2a71d0"],
      },
    ],
  };

  return (
    <>
      <Chart className="mb-8 mt-2" chartData={data} />
      {totalProducts > 0 && (
        <Paginate
          totalItems={totalProducts}
          itemsPerPage={PRODUCT_LIMIT}
          setOffset={setOffsetProducts}
          neighbours={3}
        ></Paginate>
      )}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={`Product-item-${product.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={product.images[0]}
                              alt={product.title}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.category.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {product.price}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

//########## const reducer = (prev, curr) => {##########################
//prev es un acumulador y curr es el elemento actual del array que se recibe como parámetro,
//es decir, un nombre de una categoría.
//La función .reduce() recorre todo el array, curr adquiere el valor de cada posición del array
//prev[curr] es equivalente a tener obj[elemento]
//Imaginemos el siguiente caso:
//prev = {shoes:1, others:3, clothes: 3}
//Al hacer prev[curr] donde curr=shoes estámos llamando al valor del objeto prev cuya clave es shoes,
//para este caso sería el valor de 1

//##########  prev[curr] = ++prev[curr] || 1; ########################
//En la línea anterior accedemos al valor del objeto prev cuya clave es curr, recordemos que curr es
//un nombre de categoría que cambia con cada iteración. Si esa clave-valor no existe, como tiene un ||
//entonces crea la clave-valor y le asigna el valor de 1, el primer conteo.
//Si existe, entonces accede a ese valor y lo incrementa en 1, hace otro conteo*/

//----------return prev; //En cada iteración retornamos el objeto prev-------------------

//Ejemplo:

//Primera iteración: prev = {}, curr = "Shoes"
//prev[curr] no existe, es decir no existe prev = {"Shoes":algunNumero}, entonces se le asigna 1,
//quedando: prev = {"Shoes":1}

//Segunda iteración: se retornó prev que es nuestro valor acumulado, actualmente prev = {"Shoes":1}
//Ahora curr = "Others", entonces tendríamos:
//prev = {"Shoes":1,"Others":1}

//Tercera iteración: prev = {"Shores:1","Others":1} curr = "Shoes"
//Accedemos a prev[curr], esta vez sí existe, como existe incrementamos su valor actual, quedando ahora en 2
//prev = {"Shoes":2,"Others":1}
//########## };

//Creamos la función para contar, en la función .reduce() pasamos nuestra función reducer y el valor inicial
//de prev que es un objeto vacío.

//########## const countCategories = (array) => categoryNames.reduce(reducer, {}); ######
