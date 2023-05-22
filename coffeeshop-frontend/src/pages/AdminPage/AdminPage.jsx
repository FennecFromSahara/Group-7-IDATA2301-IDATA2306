import { Box, AppBar, Tabs, Tab, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useAuth } from "../../hooks/useAuth";
import { getProducts, getOrders, getUsers } from "../../hooks/apiService";
import { isAdmin } from "../../tools/authentication";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import TabPanel from "./TabPanel";
import Orders from "./Orders/Orders";
import Products from "./Products/Products";
import Users from "./Users/Users";
import ErrorPage from "./ErrorPage";
import ProductOverview from "./Products/ProductOverview";
import ProductCreate from "./Products/ProductCreate";
import UserOverview from "./Users/UserOverview";

function AdminPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const [value, setValue] = useState(0);
  const [orders, setOrders] = useState([]);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [creatingProduct, setCreatingProduct] = useState(false);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedUser) {
      console.log("Selected User:");
      console.log(selectedUser);
    }
  }, [selectedUser]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        console.log("products: " + productsData);

        const usersData = await getUsers();
        setUsers(usersData);
        console.log("users: ");
        console.log(usersData);

        const ordersData = await getOrders();
        setOrders("orders: " + ordersData);
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
        <NavBar user={user} />

        <Box
          minHeight="94vh"
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
        <NavBar user={user} />
        <ErrorPage error={error} />
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <NavBar user={user} />

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
          <Orders orders={orders} />
        </TabPanel>
      </Box>

      <Footer />
    </div>
  );
}

export default AdminPage;
