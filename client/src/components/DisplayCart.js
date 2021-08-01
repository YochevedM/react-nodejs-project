import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { ShoppingCart } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

import Cart from '../screens/Cart';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  paper: { width: 350 }
});


/**DisplayCart is mui component that display Cart component by a Drawer  */
const DisplayCart = () => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      <React.Fragment key={'right'}>
        <IconButton onClick={toggleDrawer('right', true)}>
          <ShoppingCart />
        </IconButton>
        <Drawer PaperProps={{ className: classes.paper }} anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
          <Cart />
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default DisplayCart;
