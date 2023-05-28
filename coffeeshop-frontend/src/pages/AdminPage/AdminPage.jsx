import { Box, AppBar, Tabs, Tab, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useAuth } from "../../hooks/useAuth";
import {
  getProducts,
  getOrders,
  getUsers,
  getCategories,
} from "../../hooks/apiService";
import { isAdmin } from "../../tools/authentication";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import TabPanel from "./TabPanel";
import Orders from "./Orders/Orders";
import Products from "./Products/Products";
import Users from "./Users/Users";
import ErrorPage from "../../components/ErrorPage";
import ProductOverview from "./Products/ProductOverview";
import ProductCreate from "./Products/ProductCreate";
import UserOverview from "./Users/UserOverview";
import Categories from "./Categories/Categories";
import OrderOverview from "./Orders/OrderOverview";

function AdminPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const [value, setValue] = useState(0);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [creatingProduct, setCreatingProduct] = useState(false);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [categories, setCategories] = useState([]);

  const [error, setError] = useState(null);

  const updateUsers = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const removeUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const updateProducts = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const removeProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const updateOrders = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  };

  const removeOrder = (id) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);

        const usersData = await getUsers();
        setUsers(usersData);

        const ordersData = await getOrders();
        setOrders(ordersData);

        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (err) {
        setError(`Error fetching data: ${err.message}`);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!loading && !isAdmin(user)) {
      navigate("/access_denied");
    }
  }, [user, navigate, loading]);

  if (loading) {
    return (
      <div>
        <NavBar />

        <Box
          minHeight={theme.boxSizes.navSectionFooter}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h1">Checking if you're an admin...</Typography>
        </Box>

        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavBar />
        <ErrorPage error={error} />
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <NavBar />

      <Box minHeight="94vh" display="flex" flexDirection="column">
        <AppBar
          position="static"
          sx={{ backgroundColor: theme.palette.primary.light }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{
              style: { backgroundColor: theme.palette.secondary.main },
            }}
          >
            <Tab
              label="Products"
              sx={{ "&.Mui-selected": { color: theme.palette.text.primary } }}
            />
            <Tab
              label="Users"
              sx={{ "&.Mui-selected": { color: theme.palette.text.primary } }}
            />
            <Tab
              label="Orders"
              sx={{ "&.Mui-selected": { color: theme.palette.text.primary } }}
            />
            <Tab
              label="Categories"
              sx={{ "&.Mui-selected": { color: theme.palette.text.primary } }}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {creatingProduct ? (
            <ProductCreate
              setCreatingProduct={setCreatingProduct}
              addProduct={addProduct}
            />
          ) : selectedProduct ? (
            <ProductOverview
              product={selectedProduct}
              setProduct={setSelectedProduct}
              updateProducts={updateProducts}
              removeProduct={removeProduct}
            />
          ) : (
            <Products
              products={products}
              setProduct={setSelectedProduct}
              addProduct={addProduct}
            />
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {selectedUser ? (
            <UserOverview
              user={selectedUser}
              setUser={setSelectedUser}
              updateUsers={updateUsers}
              removeUser={removeUser}
            />
          ) : (
            <Users users={users} setUser={setSelectedUser} />
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {selectedOrder ? (
            <OrderOverview
              order={selectedOrder}
              setOrder={setSelectedOrder}
              updateOrders={updateOrders}
              removeOrder={removeOrder}
            />
          ) : (
            <Orders orders={orders} setOrder={setSelectedOrder} />
          )}
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Categories categories={categories} />
        </TabPanel>
      </Box>

      <Footer />
    </div>
  );
}

export default AdminPage;
