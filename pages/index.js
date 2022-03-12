import { useContext, useEffect, useState } from 'react';
import { Alert, CircularProgress, Grid, Typography } from '@mui/material';

import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';

import client from '../utils/client';
import { Store } from '../utils/Store';
import axios from 'axios';
import { urlForThumbnail } from '../utils/image';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

export default function Home() {
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [state, setState] = useState({
    products: [],
    error: '',
    loading: true,
  });

  const { loading, error, products } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await client.fetch(`*[_type == "product"]`);
        setState({ products, loading: false });
        console.log(products);
      } catch (err) {
        setState({ loading: false, error: err.message });
      }
    };

    fetchData();
  }, []);

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      enqueueSnackbar('Sorry, this product is out stock', { variant: 'error' });
      return;
    }

    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        _key: product._id,
        name: product.name,
        countInStock: product.countInStock,
        slug: product.slug.current,
        price: product.price,
        image: urlForThumbnail(product.image),
        quantity,
      },
    });

    enqueueSnackbar(`${product.name} added to the cart`, {
      variant: 'success',
    });

    router.push('/cart');
  };

  return (
    <Layout>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.slug}>
              <ProductItem
                product={product}
                addToCartHandler={addToCartHandler}
              ></ProductItem>
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
}
