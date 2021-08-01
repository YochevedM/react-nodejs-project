import React  from 'react';
import { connect } from 'react-redux';
import { makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { NavLink} from 'react-router-dom';

import DisplayCart from './DisplayCart';
import Logout from './Logout';
import Modal from './Modal'
import '../styles/Header.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


/**return a wish to user depend on time */
const wish = () => {
  const hour = new Date().getHours();
  if (hour < 5 || hour > 21) {
    return "לילה טוב"
  }
  if (hour < 13) {

    return "בוקר טוב"
  }
  if (hour < 18) {
    return "צהרים טובים"
  }
  return "ערב טוב"
}


const Header = (props) => {

  const classes = useStyles();

  return (
    <Box marginLeft={1}  paddingBottom={0}>
      <div className={classes.root}>
        <Grid container
          spacing={6}
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item >
            <NavLink to="/" className="link">
              <img src={"../../logo.png"} />
            </NavLink>

          </Grid>

          <Grid item >
            <NavLink to="/about" className="link">קצת עלינו</NavLink>
          </Grid>


          <Grid item>
            <NavLink to="/gardenFurnitures" className="link">ריהוט גן</NavLink>
          </Grid>

          <Grid item >
            <NavLink to="/picnicItems" className="link">מוצרי פיקניק</NavLink>
          </Grid>

          <Grid item >
            <NavLink to="/outKitchen" className="link">מטבח חוץ</NavLink>
          </Grid>

          <Grid item >
            <NavLink to="/games" className="link">משחקי חצר  ואטרקציות</NavLink>
          </Grid>

          <Grid item xs={2} >
            <NavLink to="/decorativeItems" className="link" >אביזרי נוי</NavLink>
          </Grid>
          <Grid item >{/**if user is looged in displaye his name, otherwise modal of login or register options */
            !props.userName && <Modal /> 
            || <Grid item >
                  <Grid container direction='row'>
                      <Grid item>
                        <span>
                          |{props.userName} {wish()}
                        </span>
                       <Grid item> <Logout /></Grid>

                      </Grid>
                  </Grid>
              </Grid>}  
          </Grid>

          <Grid item xs={0.5}>
            <DisplayCart />
          </Grid>

        </Grid>
      </div>
    </Box>

  );
}

const mapStateToProps = (state) => {
  return {
    userName: state.user.firstName
  }
}

export default connect(mapStateToProps)(Header);