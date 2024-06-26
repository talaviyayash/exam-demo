import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useSelector } from "react-redux";
import {
  forStudentShowArray,
  forTeacherShowArray,
  notLoginShowArray,
} from "../description/navbar.description";
import { NavLink, Outlet } from "react-router-dom";
import {
  EMPTY_STRING,
  STUDENT,
  TEACHER,
} from "../description/globel.description";
import lSGetItem from "../hook/lSGetItem";

const Navbar = () => {
  const { isLogin } = useSelector((state) => state.userInformation);
  let pages = notLoginShowArray;
  const userInfo = lSGetItem("userInfo");
  if (!isLogin) pages = notLoginShowArray;
  if (isLogin) {
    if (userInfo.role === TEACHER) pages = forTeacherShowArray;
    if (userInfo.role === STUDENT) pages = forStudentShowArray;
  }
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.leftSide.map(({ name, routingPath }) => (
                  <NavLink
                    key={routingPath}
                    to={routingPath}
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : EMPTY_STRING
                    }
                  >
                    <MenuItem key={routingPath} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{name}</Typography>
                    </MenuItem>
                  </NavLink>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.leftSide.map(({ name, routingPath }) => (
                <NavLink
                  to={routingPath}
                  key={routingPath}
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : EMPTY_STRING
                  }
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {name}
                  </Button>
                </NavLink>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: "flex", gap: "20px" }}>
              {pages.rightSide.map(({ name, routingPath }) => (
                <NavLink
                  key={routingPath}
                  to={routingPath}
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : EMPTY_STRING
                  }
                >
                  <Typography
                    sx={{ color: "white", listStyle: "none" }}
                    textAlign="center"
                  >
                    {name}
                  </Typography>
                </NavLink>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};
export default Navbar;
