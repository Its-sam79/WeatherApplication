import React, { useEffect, useState } from 'react';
import { useStateContext } from '../Context';
import axios from 'axios';

// Define image imports for different weather conditions
import Clear from '../assets/images/Clear.jpg';
import Cloudy from '../assets/images/Cloudy.jpg';
import Fog from '../assets/images/fog.png';
import Snow from '../assets/images/snow.jpg';
import Stormy from '../assets/images/Stormy.jpg';
import Sunny from '../assets/images/Sunny.jpg';

function BackgroundLayout() {
  const { weather } = useStateContext();
  const [image, setImage] = useState(Clear);

  useEffect(() => {
    const fetchWeatherImage = async () => {
      if (weather.conditions) {
        let imageString = weather.conditions.toLowerCase();
        let imageUrl = 'https://api.unsplash.com/search/photos?page=2&query=cloud&client_id=0qmX1MTAlBxHejjXF6nV__xbfqiI9PM5TLCZj0eTwjw'; // URL to fetch images dynamically based on weather condition

        // Set the appropriate URL based on weather condition
        if (imageString.includes('clear')) {
          imageUrl = 'https://api.unsplash.com/search/photos?page=1&query=spring&client_id=0qmX1MTAlBxHejjXF6nV__xbfqiI9PM5TLCZj0eTwjw';
        } else if (imageString.includes('cloud')) {
          imageUrl = 'https://api.unsplash.com/search/photos?page=1&query=clouds&client_id=0qmX1MTAlBxHejjXF6nV__xbfqiI9PM5TLCZj0eTwjw';
        } else if (imageString.includes('rain') || imageString.includes('shower')) {
          imageUrl = 'https://api.unsplash.com/search/photos?page=1&query=rain&client_id=0qmX1MTAlBxHejjXF6nV__xbfqiI9PM5TLCZj0eTwjw';
        } else if (imageString.includes('snow')) {
          imageUrl = 'https://api.unsplash.com/search/photos?page=1&query=snow&client_id=0qmX1MTAlBxHejjXF6nV__xbfqiI9PM5TLCZj0eTwjw';
        } else if (imageString.includes('fog')) {
          imageUrl = 'https://api.unsplash.com/search/photos?page=1&query=fog&client_id=0qmX1MTAlBxHejjXF6nV__xbfqiI9PM5TLCZj0eTwjw';
        } else if (imageString.includes('thunder') || imageString.includes('storm')) {
          imageUrl = 'https://api.unsplash.com/search/photos?page=1&query=storm&client_id=0qmX1MTAlBxHejjXF6nV__xbfqiI9PM5TLCZj0eTwjw';
        }

        try {
          const response = await axios.get(imageUrl);
          const { results } = response.data;

          if (results && results.length > 0) {
            const randomIndex = Math.floor(Math.random() * results.length);
            const randomImage = results[randomIndex].urls.regular;
            setImage(randomImage);
          } else {
            // If no images found for the condition, fallback to default image
            setImage(Clear); // Set default image
          }
        } catch (error) {
          console.error('Error fetching weather image:', error);
          // Set default image in case of error
          setImage(Clear);
        }
      }
    };

    fetchWeatherImage();
  }, [weather]);

  return (
    <div>
      <img src={image} alt="weather_image" className='h-screen w-full fixed left-0 top-0 -z-[10]' />
    </div>
  );
}

export default BackgroundLayout;
