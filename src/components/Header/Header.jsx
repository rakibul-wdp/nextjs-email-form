import React, { useState } from 'react';
import "./Header.css";
import { Button } from '@mui/material';
import AddNote from '../AddNote/AddNote';

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="header">
      <h1 className='heading'>To Do App</h1>
      <Button onClick={handleOpen}>Create Note</Button>
      <AddNote open={open} handleClose={handleClose} />
    </div>
  )
}

export default Header;