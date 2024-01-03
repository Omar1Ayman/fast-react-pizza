import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './ui/Home';
import Error from './ui/Error';
import Menu from './features/menu/Menu';
import CreateOrder, {
  action as CreateActionOrder,
} from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import Cart from './features/cart/Cart';
import AppLayout from './ui/AppLayout';
import { getMenu } from './services/apiRestaurant';
import { action as updateOrderAction } from './features/order/UpdateOrder';
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    path: '/',
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
        index: true,
      },
      {
        path: '/menu',
        element: <Menu />,
        errorElement: <Error />,
        loader: async () => {
          const menu = await getMenu();
          return menu;
        },
      },
      {
        path: '/cart',
        element: <Cart />,
      },

      {
        path: '/order/new',
        element: <CreateOrder />,
        action: CreateActionOrder,
      },
      {
        path: '/order/:orderID',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
