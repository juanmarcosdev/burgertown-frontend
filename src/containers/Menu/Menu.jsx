import React from 'react';
import AppAppBar from '../Home/modules/views/AppAppBar';
import withRoot from '../Home/modules/withRoot';
import Categories from './components/Categories';
import Carousel from './components/Carousel';
import CarouselItem from './components/CarouselItem';
import NotFound from '../NotFound';

const Menu = () => {
    return (
        <div>
            {
                localStorage.token !== undefined && localStorage.typeUser === '1' ? <div><AppAppBar />
                <Categories>
                <h3 style={{fontSize: 24, color: 'white', backgroundColor: '#28282A', margin: 0, padding: '20px'}}>Pizza</h3>
                    <Carousel>
                        <CarouselItem>
                        </CarouselItem>
                    </Carousel>
                </Categories></div>: <NotFound />
            }
        </div>
    );
};

export default withRoot(Menu);