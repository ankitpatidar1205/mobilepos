import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BuildIcon from "@mui/icons-material/Build";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDropdownToggle = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  return (
    <Box className={`sidebar ${isSidebarOpen ? "open" : ""}`} sx={{ width: isSidebarOpen ? 240 : 78, overflowX: "hidden", transition: "all 0.5s ease-in-out", bgcolor: "#11101d", height: "100vh", color: "#fff" }}>
      <Box className="sidebar-logo-details" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
        <span className={`sidebar-logo-name`} style={{ color: "[#40aed6]" }}>POS</span>
        <button id="sidebar-btn" onClick={toggleSidebar} style={{ background: "none", border: "none", color: "#fff", fontSize: 20 }}>
          {isSidebarOpen ? "<<" : ">>"}
        </button>
      </Box>

      <List component="nav" sx={{
          height: "calc(100vh - 80px)", 
          overflowY: "auto",            
        }}>
        {/* Dashboard */}
        <ListItemButton component={Link} to="/dashboard" sx={{
          borderRadius: "8px",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: "#1d1b31",
            color: "#40aed6",
          },
        }}>
          <ListItemIcon><DashboardIcon sx={{ color: !isSidebarOpen ? "#40aed6" : "#fff", transition: "all 0.3s ease-in-out", }} /></ListItemIcon>
          {isSidebarOpen && <ListItemText primary="Dashboard" />}
        </ListItemButton>

        {/* Repair Dropdown */}
        <ListItemButton onClick={() => handleDropdownToggle("repairDropdown")} sx={{
          backgroundColor: openDropdown === "repairDropdown" ? "#1d1b31" : "transparent",
          color: openDropdown === "repairDropdown" ? "#40aed6" : "#fff",
          borderRadius: "8px",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: "#1d1b31",
            color: "#40aed6",
          },
        }}>
          <ListItemIcon><BuildIcon sx={{ color: !isSidebarOpen ? "#40aed6" : "#fff", transition: "all 0.3s ease-in-out", }} /></ListItemIcon>
          {isSidebarOpen && <ListItemText primary="Repair" />}
          {openDropdown === "repairDropdown" ? <ExpandLess sx={{ color: "#fff" }} /> : <ExpandMore sx={{ color: "#fff" }} />}
        </ListItemButton>
        <Collapse in={openDropdown === "repairDropdown"} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: isSidebarOpen ? 4 : 0 }}>

            <ListItemButton component={Link} to="/ManageInvoices" sx={{
              borderRadius: "8px",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#1d1b31",
                color: "#40aed6",
              },
            }}>
              {isSidebarOpen && <ListItemText primary="Manage Invoice" />}
            </ListItemButton>
            <ListItemButton component={Link} to="/ManageTickets" sx={{
              borderRadius: "8px",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#1d1b31",
                color: "#40aed6",
              },
            }}>
              {isSidebarOpen && <ListItemText primary="Manage Tickets" />}
            </ListItemButton>
            <ListItemButton component={Link} to="/ManageEstimates" sx={{
              borderRadius: "8px",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#1d1b31",
                color: "#40aed6",
              },
            }}>
              {isSidebarOpen && <ListItemText primary="Manage Estimates" />}
            </ListItemButton>
          </List>
        </Collapse>

        {/* Inventory Dropdown */}
        <ListItemButton onClick={() => handleDropdownToggle("inventoryDropdown")} sx={{
          backgroundColor: openDropdown === "inventoryDropdown" ? "#1d1b31" : "transparent",
          color: openDropdown === "inventoryDropdown" ? "#40aed6" : "#fff",
          borderRadius: "8px",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: "#1d1b31",
            color: "#40aed6",
          },
        }}>
          <ListItemIcon><InventoryIcon sx={{ color: !isSidebarOpen ? "#40aed6" : "#fff", transition: "all 0.3s ease-in-out", }} /></ListItemIcon>
          {isSidebarOpen && <ListItemText primary="Inventory" />}
          {isSidebarOpen && openDropdown === "inventoryDropdown" ? <ExpandLess sx={{ color: "#fff" }} /> : <ExpandMore sx={{ color: "#fff" }} />}
        </ListItemButton>
        <Collapse in={openDropdown === "inventoryDropdown"} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: isSidebarOpen ? 4 : 0 }}>
          <ListItemButton component={Link} to="/category" sx={{
              borderRadius: "8px",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#1d1b31",
                color: "#40aed6",
              },
            }}>
              {isSidebarOpen && <ListItemText primary="Category" />}
            </ListItemButton>
            
            
            <ListItemButton component={Link} to="/brand" sx={{
              borderRadius: "8px",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#1d1b31",
                color: "#40aed6",
              },
            }}>
              {isSidebarOpen && <ListItemText primary="Brand" />}
            </ListItemButton>
          
           
            <ListItemButton component={Link} to="/Tax" sx={{
              borderRadius: "8px",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#1d1b31",
                color: "#40aed6",
              },
            }}>
              {isSidebarOpen && <ListItemText primary="Tax" />}
            </ListItemButton>
            <ListItemButton component={Link} to="/products" sx={{
              borderRadius: "8px",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#1d1b31",
                color: "#40aed6",
              },
            }}>
              {isSidebarOpen && <ListItemText primary="Service" />}
            </ListItemButton>
          </List>
        </Collapse>

        {/* Customers */}
        <ListItemButton component={Link} to="/Customer" sx={{

          borderRadius: "8px",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: "#1d1b31",
            color: "#40aed6",
          },
        }}>
          <ListItemIcon><PeopleIcon sx={{ color: !isSidebarOpen ? "#40aed6" : "#fff", transition: "all 0.3s ease-in-out", }} /></ListItemIcon>
          {isSidebarOpen && <ListItemText primary="Customers" />}
        </ListItemButton>

        {/* Point Of Sale */}
        <ListItemButton component={Link} to="/PointOfSale" sx={{
          borderRadius: "8px",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: "#1d1b31",
            color: "#40aed6",
          },
        }}>
          <ListItemIcon><ShoppingCartIcon sx={{ color: !isSidebarOpen ? "#40aed6" : "#fff", transition: "all 0.3s ease-in-out", }} /></ListItemIcon>
          {isSidebarOpen && <ListItemText primary="Point Of Sale" />}
        </ListItemButton>

        {/* Reports Dropdown */}
        <ListItemButton onClick={() => handleDropdownToggle("reportsDropdown")}
          sx={{
            backgroundColor: openDropdown === "reportsDropdown" ? "#1d1b31" : "transparent",
            color: openDropdown === "reportsDropdown" ? "#40aed6" : "#fff",
            borderRadius: "8px",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#1d1b31",
              color: "#40aed6",
            },
          }}
        >
          <ListItemIcon><BarChartIcon sx={{ color: !isSidebarOpen ? "#40aed6" : "#fff", transition: "all 0.3s ease-in-out", }} /></ListItemIcon>
          {isSidebarOpen && <ListItemText primary="Reports" />}
          {openDropdown === "reportsDropdown" ? <ExpandLess sx={{ color: "#0000" }} /> : <ExpandMore sx={{ color: "#fff" }} />}
        </ListItemButton>
        <Collapse in={openDropdown === "reportsDropdown"} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: isSidebarOpen ? 4 : 0 }}>
            <ListItemButton component={Link} to="/SalesByItem" sx={{

              borderRadius: "8px",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#1d1b31",
                color: "#40aed6",
              },
            }}>
              {isSidebarOpen && <ListItemText primary="Sales By Item" />}
            </ListItemButton>
            <ListItemButton component={Link} to="/SalesByItemsType" sx={{
              borderRadius: "8px",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#1d1b31",
                color: "#40aed6",
              },
            }}>
              {isSidebarOpen && <ListItemText primary="Sales By Item Type" />}
            </ListItemButton>
            <ListItemButton component={Link} to="/RegisterSalesReport" sx={{
              borderRadius: "8px",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#1d1b31",
                color: "#40aed6",
              },
            }}>
              {isSidebarOpen && <ListItemText primary="Register Sales" />}
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export default Sidebar;
