import { useContext } from "react"
import { MenuOutlined } from "@mui/icons-material"
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import { UIContext } from "../../../context/ui"
import Link from "next/link"

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext)

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton
          onClick={openSideMenu}
          size='large'
          edge='start'>
          <MenuOutlined />
        </IconButton>
        <Link href='/' >
          <Typography variant="h6">OpenJira</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  )
}
