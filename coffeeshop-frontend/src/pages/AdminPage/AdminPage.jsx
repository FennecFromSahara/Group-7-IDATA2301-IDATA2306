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
import { asyncApiRequest } from "../../tools/requests";
import { useAuth } from "../../hooks/useAuth";

function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const [value, setValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await asyncApiRequest("GET", "/products");
        setProducts(productsData);

        const usersData = await asyncApiRequest("GET", "/users");
        setUsers(usersData);

        const ordersData = await asyncApiRequest("GET", "/orders");
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

  useEffect(() => {
    if (!isAdmin(user)) {
      navigate("/access_denied"); // Redirect to the homepage or another page if the user is not an admin
    }
  }, [user, navigate]);

  if (!isAdmin(user)) {
    return null; // Render nothing if the user is not an admin
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
            sx={{ color: theme.palette.primary.contrastText }}
          >
            <Tab label="Products" />
            <Tab label="Users" />
            <Tab label="Orders" />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Products products={products} />
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
