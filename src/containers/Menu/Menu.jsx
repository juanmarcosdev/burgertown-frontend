import React from 'react';
import AppAppBar from '../Home/modules/views/AppAppBar';
import withRoot from '../Home/modules/withRoot';
import Categories from './components/Categories';
import Carousel from './components/Carousel';
import CarouselItem from './components/CarouselItem';
import NotFound from '../NotFound';
import { getMenu, getMenuProductos } from '../../actions';
import { connect } from 'react-redux';

const Menu = (props) => {
    const { dataMenu, dataMenuProductos } = props;

    // componentDidMount()

    React.useEffect(() => {
        fetch('https://burgertown-backend.herokuapp.com/Categoria/Get/Cliente', 
        {
          method: 'GET',
          headers: { "Content-Type": "application/json",
                     token: localStorage.token
                   },
        }).then(res => res.json())
          .then(data => {
            props.getMenu(data.data)
            console.log(data.data)})
      }, []);
    
    return (
        <div>
            {
                localStorage.token !== undefined && localStorage.typeUser === '1' ?
                <div> 
                    <AppAppBar />
                    {
                        dataMenu.length > 0 ? dataMenu.filter((item) => item.categoria_estado === 1).map((item) => 
                        <Categories>
                            <h3 style={{fontSize: 24, color: 'white', backgroundColor: '#28282A', margin: 0, padding: '20px'}}>{item.categoria_nombre}</h3>
                                <Carousel>
                                    <CarouselItem>
                                    </CarouselItem>
                                </Carousel>
                        </Categories>
                        ) : <div></div>
                    }
                </div>
                : 
                <NotFound />
            }
            {
                console.log(dataMenuProductos[0])
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
      dataMenu: state.dataMenu,
      dataMenuProductos: state.dataMenuProductos,
    }
}

const mapDispatchToProps = {
    getMenu,
    getMenuProductos,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRoot(Menu));