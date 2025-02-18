import { createBrowserRouter } from "react-router-dom";
import Home from "pages/Home";
import Error from "pages/Error";
import Fornecedor from "pages/Fornecedor";
import MenuSuperior from "components/MenuSuperior";
import Route from "types/routes.types";
import RoutesEnum from "enums/routes.enum";
import Root from "./Root";


const createRoute = (element: JSX.Element) => (
  <div className="w-full h-full flex flex-col items-center">
    <MenuSuperior/>
    {element}
  </div>
);

export const routes: Route[] = [
  {
    index: true,
    element: createRoute(<Home />),
    name: "Home",
  },
  {
    path: RoutesEnum.FORNECEDOR,
    element: createRoute(<Fornecedor />),
    name: "Fornecedor",
  }
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: routes,
  },
]);
