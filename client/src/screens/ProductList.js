import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header.js';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import ProductItem from '../components/ProductItem.js';
import translateCategory from '../utils/translateCategory.js'
import '../styles/About.css'


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));



/**display products of specific category */
const ProductList = (props) => {

  const classes = useStyles();


  const { category } = useParams();/**get category from url */

  const productsByCategory = props.products.filter(product => product.category == category)/**filter category */

  return (

    <>
      <Header />
      <div id="top">{translateCategory(category)}</div>
      <React.Fragment>
        <CssBaseline />
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {productsByCategory.map((product) =>
              <ProductItem
                key={product.id}
                productId={product._id} />)}
          </Grid>
        </Container>
      </React.Fragment>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(ProductList);