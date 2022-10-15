import React, { useEffect, useState } from 'react';
import alpha from '../pictures/alpha.jpg';
import atari from '../pictures/atari.jpg';
import caustic from '../pictures/caustic.jpg';
import cherubin from '../pictures/cherubin.jpg';
import jedi from '../pictures/jedi.jpg';
import outbreak from '../pictures/outbreak.jpg';
import squam from '../pictures/squam.jpg';
import techno from '../pictures/techno.jpg';
import v5 from '../pictures/v5.jpg';
import './Home.css';

const Carousel = () => {
    const order = [alpha, atari, caustic, cherubin, jedi, outbreak, squam, techno, v5];
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollCarousel  = () => {
        if (currentIndex === order.length-1) {
            return setCurrentIndex(0)
        }
        return setCurrentIndex(currentIndex+1)
    }

    useEffect(() => {
        const interval =  setInterval(() => {scrollCarousel()}, 3000)

        return () => clearInterval(interval);
    })

    return (
        <div className='homePictures'>
            {order.map((pic, index) => {
                console.log(index)
                return  <img src={pic} alt='some climb' className='carouselItem' key={index} style={{transform: `translate(-${currentIndex * 100}%)`}}/>
            })}
        </div>
    )
}

export default Carousel