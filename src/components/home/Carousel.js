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
import serenity from '../pictures/magi.jpg';
import grand from '../pictures/grand.jpg';
import chulilla from '../pictures/chulilla.jpg';
import sasha from '../pictures/sasha.jpg';
import { shuffleArray } from '../operations/Operations';
import './Home.css';

const Carousel = () => {
    const pictures = [
        {src:sasha, 
        text: "Sasha's Dream Boy (8a), El Techo de Ed, Chulilla, Canada"},
        {src:chulilla, 
        text: 'Entre Dos Caminos (8a), Pared De Enfrente, Chulilla, Spain'},
        {src:grand, 
        text: 'The Grand Wall (6c), Grand Wall Area, The Chief, Canada'},
        {src:serenity, 
        text: 'Serenity and Sons (6b+), Royal Arches, Yosemite Valley, United States of America'},
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

    const shuffledPictures = shuffleArray(pictures);

    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollCarousel  = () => {
        if (currentIndex === pictures.length-1) {
            return setCurrentIndex(0)
        }
        return setCurrentIndex(currentIndex+1)
    }

    useEffect(() => {
        const interval =  setInterval(() => {scrollCarousel()}, 7000)

        return () => clearInterval(interval);
    }, [currentIndex])

    const imageStyle = {
        transform: `translate(-${currentIndex * 100}%)`
    }

    return (
        <div className='homePictures'>
            {shuffledPictures.map((pic, index) => {
                return  <div className='carouselItem' key={index} style={imageStyle}>
                            <img src={pic.src} alt='some climb' className='homeImage'/>
                            <p className='picText'>{pic.text}</p>
                        </div>
            })}
        </div>
    )
}

export default Carousel