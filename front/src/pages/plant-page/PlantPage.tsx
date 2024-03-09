import { createTheme, ThemeProvider } from '@mui/material/styles';
import baseTheme from '../../theme.ts';
// import "./PlantPage.css"
import PlantCard from '../../components/Posts/PlantCard.tsx';
import Grid from '@mui/material/Grid';
import PlantReview from '../../components/PlantReview.tsx';
import { useEffect, useState } from 'react';

const PlantPageTheme = createTheme({
  ...baseTheme,
});
const getPlant = (plantId: string) => {
  // TODO: get plant from db
  return { title: 'Monstera Deliciosa', description: 'Monstera deliciosa, the Swiss cheese plant or split-leaf philodendron is a species of flowering plant native to tropical forests of southern Mexico, south to Panama. It has been introduced to many tropical areas, and has become a mildly invasive species in Hawaii, Seychelles, Ascension Island and the Society Islands. It is very widely grown in temperate zones as a houseplant.', imageUrl: 'https://www.houseplant.co.uk/cdn/shop/files/monstera-shoot-pink.jpg?v=1686074374&width=1946' };
}

export default function PlantPage({plantId}) {
  // const currPlant = {};
  const [currPlant, setCurrPlant] = useState({ title: '', description: '', imageUrl: '', reviews: [] });

  useEffect(() => {
    // Call your function here
    setCurrPlant(getPlantFromServer(plantId));
    console.log(currPlant)
  }, []);

  function getPlantFromServer(plantId) {
    // Your function logic here
    return { ...post , reviews: plantsReview};
  }

  const post = { plantName: 'Monstera Deliciosa', description: 'Monstera deliciosa, the Swiss cheese plant or split-leaf philodendron is a species of flowering plant native to tropical forests of southern Mexico, south to Panama. It has been introduced to many tropical areas, and has become a mildly invasive species in Hawaii, Seychelles, Ascension Island and the Society Islands. It is very widely grown in temperate zones as a houseplant.', imageUrl: 'https://www.houseplant.co.uk/cdn/shop/files/monstera-shoot-pink.jpg?v=1686074374&width=1946' , comments: [{username: "8689440", text: "nice monstera bro!"}]};
  const plantsReview = [
    { firstname: 'Nir', stars: '3.5', review: 'Monstera deliciosa, the Swiss cheese plant or split-leaf philodendron is a species of flowering plant native to tropical forests of southern Mexico, south to Panama. It has been introduced to many tropical areas, and has become a mildly invasive species in Hawaii, Seychelles, Ascension Island and the Society Islands. It is very widely grown in temperate zones as a houseplant.', imageUrl: 'https://www.houseplant.co.uk/cdn/shop/files/monstera-shoot-pink.jpg?v=1686074374&width=1946' },
    { firstname: 'Yoav', stars: '1', review: 'Monstera deliciosa, the Swiss cheese plant or split-leaf philodendron is a species of flowering plant native to tropical forests of southern Mexico, south to Panama. It has been introduced to many tropical areas, and has become a mildly invasive species in Hawaii, Seychelles, Ascension Island and the Society Islands. It is very widely grown in temperate zones as a houseplant.', imageUrl: 'https://www.houseplant.co.uk/cdn/shop/files/monstera-shoot-pink.jpg?v=1686074374&width=1946' },
    { firstname: 'Helbon', stars: '5', review: 'Monstera deliciosa, the Swiss cheese plant or split-leaf philodendron is a species of flowering plant native to tropical forests of southern Mexico, south to Panama. It has been introduced to many tropical areas, and has become a mildly invasive species in Hawaii, Seychelles, Ascension Island and the Society Islands. It is very widely grown in temperate zones as a houseplant.', imageUrl: 'https://www.houseplant.co.uk/cdn/shop/files/monstera-shoot-pink.jpg?v=1686074374&width=1946' },
  ];

  return (
    <ThemeProvider theme={PlantPageTheme}>       
      <Grid container alignItems="center" justifyContent="center"  spacing={2} style={{ flexDirection: 'column' }}>
          <Grid item xs={8} sm={8} md={8} lg={8} >
          <PlantCard 
              post={post}
            />
          </Grid>
          {currPlant.reviews.map((plantReview, index) => (
            <Grid item xs={8} sm={8} md={8} lg={8} >
            <PlantReview 
              firstname={plantReview.firstname}
              stars={plantReview.stars}
              review={plantReview.review}
            />
          </Grid>
          ))}
          
      </Grid>
    </ThemeProvider>
  );
}