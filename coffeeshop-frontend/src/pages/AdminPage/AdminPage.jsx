import { Box, AppBar, Tabs, Tab } from "@mui/material";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { isAdmin } from "../../tools/authentication";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TabPanel from "./TabPanel";
import Orders from "./Orders";
import Products from "./Products";
import Users from "./Users";
import { useTheme } from "@emotion/react";
import { useAuth } from "../../hooks/useAuth";
import ErrorPage from "./ErrorPage";
import { getProducts, getOrders, getUsers } from "../../hooks/apiService";
import ProductOverview from "./ProductOverview";

function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const [value, setValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);

        const usersData = await getUsers();
        setUsers(usersData);

        const ordersData = await getOrders();
        setOrders(ordersData);
      } catch (err) {
        setError(`Error fetching data: ${err.message}`);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Redirect to the homepage or another page if the user is not an admin
  useEffect(() => {
    if (!isAdmin(user)) {
      navigate("/access_denied");
    }
  }, [user, navigate]);

  if (!isAdmin(user)) {
    return null; // Render nothing if the user is not an admin
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <div>
      <NavBar user={user} />

      <Box minHeight="92vh" display="flex" flexDirection="column">
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
          {selectedProduct ? (
            <ProductOverview
              product={selectedProduct}
              setProduct={setSelectedProduct}
            />
          ) : (
            <Products products={products} setProduct={setSelectedProduct} />
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Users users={users} />
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
