import React, { useEffect, useState } from 'react';
import ginseng from '../pictures/biss.jpg';
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
    const order = [
        {src:ginseng, 
        text: 'Ginseng Route (7b), Shagg Crag, Maine, United States of America'},
        {src:alpha, 
        text: 'Alpha (7c+), Pic-aux-Corbeaux, Orford, Canada'},
        {src:atari,
        text: 'Atari (7a), Happy Boulders, Bishop, United States of America'},
        {src:caustic,
         text:'Caustic (6c), Cannibal Crag, Red Rocks, United States of America'}, 
        {src:cherubin,
        text:'Cherubin (7a+), Lac Boisseau, Laurentides, Canada'},
        {src:jedi,
        text:'Jedi Mind Tricks (6b+), Buttermilks, Bishop, United States of America'},
        {src:outbreak,
        text:'Outbreak (7c), Chez Roger, Lanaudiere, Canada'},
        {src:squam,
        text:'Rug Munchers (7a), Chekeamus Canyon, Squamish, Canada'},
        {src:techno,
        text:'Technosurfing (7b), Waimea, Rumney, United States of America'},
        {src:v5,
        text:'Strength in Numbers (6c+), Happy Boulders, Bishop, United States of America'}
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollCarousel  = () => {
        if (currentIndex === order.length-1) {
            return setCurrentIndex(0)
        }
        return setCurrentIndex(currentIndex+1)
    }

    useEffect(() => {
        const interval =  setInterval(() => {scrollCarousel()}, 5000)

        return () => clearInterval(interval);
    }, [currentIndex])

    const imageStyle = {
        transform: `translate(-${currentIndex * 100}%)`
    }

    return (
        <div className='homePictures'>
            {order.map((pic, index) => {
                return  <div className='carouselItem' key={index} style={imageStyle}>
                            <img src={pic.src} alt='some climb' className='homeImage'/>
                            <p className='picText'>{pic.text}</p>
                        </div>
            })}
        </div>
    )
}

export default Carousel