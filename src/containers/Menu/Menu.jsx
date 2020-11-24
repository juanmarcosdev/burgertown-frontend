import React from 'react';
import AppAppBar from '../Home/modules/views/AppAppBar';
import withRoot from '../Home/modules/withRoot';
import Categories from './components/Categories';
import Carousel from './components/Carousel';
import CarouselItem from './components/CarouselItem';
import NotFound from '../NotFound';
import { getMenu, getMenuProductos } from '../../actions';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

const Menu = (props) => {
    const { dataMenu, dataMenuProductos, carritoCompras } = props;


    // componentDidMount()

    React.useEffect(() => {
        localStorage.removeItem("shopping_cart");
        localStorage.removeItem("id_productos_a_pagar");
        localStorage.removeItem("cantidad_productos_a_pagar");
        localStorage.removeItem("total_a_pagar");
        fetch('https://burgertown-backend.herokuapp.com/Categoria/Get/Cliente', 
        {
          method: 'GET',
          headers: { "Content-Type": "application/json",
                     token: localStorage.token
                   },
        }).then(res => res.json())
          .then(data => {
            props.getMenu(data.data)
            // console.log(data.data)
        })
      }, []);

      React.useEffect(() => {
        fetch('https://burgertown-backend.herokuapp.com/Producto/Menu/Get', 
        {
          method: 'GET',
          headers: { "Content-Type": "application/json",
                     token: localStorage.token
                   },
        }).then(res => res.json())
          .then(data => {
            props.getMenuProductos(data.flat())
            // console.log(data.flat())
        })
      }, []);

      const handleCheckout = (cart) => {
        // console.log(cart);
        localStorage.setItem("shopping_cart", JSON.stringify(cart));
        props.history.push('/carritocompra');
      }
    
    return (
        <div>
            {
                // localStorage.token !== undefined && localStorage.typeUser === '1' ?
                <div> 
                    <AppAppBar />
                    {
                        dataMenu.length > 0 ? dataMenu.filter((item) => item.categoria_estado === 1).map((item) => 
                        <Categories>
                            <h3 style={{fontSize: 24, color: 'white', backgroundColor: '#28282A', margin: 0, padding: '20px'}}>{item.categoria_nombre}</h3>
                                <Carousel>
                                    {
                                        dataMenuProductos.filter(product => product.categoria_id === item.categoria_id && product.producto_estado === 1).map(card =>
                                            <CarouselItem key={card.producto_codigo} {...card} isList>
                                            </CarouselItem>)
                                    }
                                </Carousel>
                        </Categories>
                        ) : <div></div>
                    }
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button variant="contained" size="large" color="secondary" onClick={() => handleCheckout(carritoCompras)}>Ir al Carrito a Checkout</Button>
                    </div>
                    {/* {
                      console.log(carritoCompras)
                    } */}
                </div>
    
                // : 
                // <NotFound />
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
      dataMenu: state.dataMenu,
      dataMenuProductos: state.dataMenuProductos,
      carritoCompras: state.carritoCompras,
    }
}

const mapDispatchToProps = {
    getMenu,
    getMenuProductos,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRoot(Menu));