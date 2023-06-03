import "./Navbar.css";
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../assets/logo.png";
import { styled, alpha } from "@mui/material/styles";
import { InputBase, Menu, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useMatch, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SearchMovies } from "./DataFetching";
import SearchMovie from "./Search";

const drawerWidth = 240;
const navItems = ["Home", "Movies", "Category"];
export const logoHeight = "80px";

const Search = styled("div")(({ theme }) => ({
  padding: theme.spacing(1, 1),
  position: "relative",
  borderRadius: "20px",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "fit-content",
  [theme.breakpoints.down("sm")]: {},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  height: "100%",
  position: "absolute",
  left: "5px",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: theme.spacing(3),
    transition: theme.transitions.create("width"),
    width: "150px",
    "&:focus": {
      [theme.breakpoints.up("md")]: {
        width: "250px",
      },
      width: "150px",
    },
  },
}));

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Link to="/">
        <img src={logo} alt="Logo" width={"80%"} />
      </Link>
      <Divider sx={{ background: "#fff", width: "80%", alignSelf: "center" }} />
      <List>
        {navItems.map((item) => {
          const resolvePath = item === "Home" ? "/" : `/${item.toLowerCase()}`;
          const isActive = location.pathname === resolvePath;

          return (
            <ListItem key={item} disablePadding>
              <Link to={resolvePath} style={{ textDecoration: "none" }}>
                <ListItemButton
                  className={isActive ? "drawerActive" : ""}
                  sx={{
                    textAlign: "center",
                    border: "1px solid #E2C044",
                    borderRadius: "7px",
                    marginBottom: "10px",
                    color: "#e0fbfc",
                    width: "100px",
                  }}
                >
                  <ListItemText primary={item} />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = React.useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = (buttonValue) => {
    setAnchorEl(null);
    switch (buttonValue) {
      case "Action":
        console.log("1");
        navigate('/action')
        break;
      case "Adventure":
        navigate('/adventure')
        console.log("2");
        break;
      case "Comedy":
        navigate("/comedy");
        console.log("3");
        break;
      case "Horror":
        navigate("/horror");
        console.log("4");
        break;
      case "Romance":
        navigate("/romance");
        console.log("5");
        break;
      case "Sci-Fi":
        navigate("/sciFi");
        console.log("6");
        break;
      case "Thriller":
        navigate("/thriller");
        console.log("7");
        break;
      default:
        return null;
    }
  };

  const isMenuOpen = Boolean(anchorEl);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      id="categories-menu"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        className="dropdownMenu"
        onClick={() => handleMenuClose("Action")}
      >
       Action
      </MenuItem>
      <MenuItem
        className="dropdownMenu"
        onClick={() => handleMenuClose("Adventure")}
      >
        Adventure
      </MenuItem>
      <MenuItem
        className="dropdownMenu"
        onClick={() => handleMenuClose("Comedy")}
      >
        Comedy
      </MenuItem>
      <MenuItem
        className="dropdownMenu"
        onClick={() => handleMenuClose("Horror")}
      >
        Horror
      </MenuItem>
      <MenuItem
        className="dropdownMenu"
        onClick={() => handleMenuClose("Romance")}
      >
        Romance
      </MenuItem>
      <MenuItem
        className="dropdownMenu"
        onClick={() => handleMenuClose("Sci-Fi")}
      >
        Sci-Fi
      </MenuItem>
      <MenuItem
        className="dropdownMenu"
        onClick={() => handleMenuClose("Thriller")}
      >
        Thriller
      </MenuItem>
    </Menu>
  );

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  const handleSearchSubmit = () => {
    // Handle search submission
    // console.log("Search value:", searchValue);
    const testing = SearchMovie(searchValue);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar
          sx={{
            background: "#000",
            width: "100%",
            borderBottom: "1px solid #e2c044",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <img src={logo} alt="Logo" height={logoHeight} />
          </Link>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              width: "100%",
              justifyContent: "center",
            }}
          >
            {navItems.map((item) => {
              const currPath = location.pathname;
              const resolvePath =
                item === "Home" ? "/" : `/${item.toLowerCase()}`;
              const isActive = currPath === resolvePath;
              const movieCategory = item === "Category" ? "/category" : "";

              return (
                <Link
                  key={item}
                  to={resolvePath === movieCategory ? "#" : resolvePath}
                >
                  <Button
                    sx={{ color: "#fff" }}
                    className={
                      isActive && !isMenuOpen
                        ? "topActive"
                        : resolvePath === movieCategory && isMenuOpen
                        ? "topActive"
                        : ""
                    }
                    onClick={
                      resolvePath === movieCategory
                        ? handleMenuOpen
                        : handleMenuClose
                    }
                  >
                    {item}
                  </Button>
                </Link>
              );
            })}
            {renderMenu}
          </Box>

          <Box
            sx={{
              width: "500px",
              "@media (max-width: 600px)": {
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "end",
              },
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "#E2C044" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                value={searchValue}
                onChange={handleSearchChange}
                inputProps={{ "aria-label": "search" }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearchSubmit();
                  }
                }}
              />
            </Search>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "linear-gradient(#000 10%, #000c 20%)",
              color: "#e0fbfc",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar />
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
