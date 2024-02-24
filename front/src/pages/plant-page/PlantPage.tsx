import { createTheme, ThemeProvider } from '@mui/material/styles';
import baseTheme from '../../theme.ts';
// import "./PlantPage.css"
import PlantCard from '../../components/PlantCard.tsx';
import Grid from '@mui/material/Grid';
import PlantReview from '../../components/PlantReview.tsx';

const PlantPageTheme = createTheme({
  ...baseTheme,
});
const getPlant = (plantId: string) => {
  // TODO: get plant from db
  return { title: 'Monstera Deliciosa', description: 'Monstera deliciosa, the Swiss cheese plant or split-leaf philodendron is a species of flowering plant native to tropical forests of southern Mexico, south to Panama. It has been introduced to many tropical areas, and has become a mildly invasive species in Hawaii, Seychelles, Ascension Island and the Society Islands. It is very widely grown in temperate zones as a houseplant.', imageUrl: 'https://www.houseplant.co.uk/cdn/shop/files/monstera-shoot-pink.jpg?v=1686074374&width=1946' };
}

export default function PlantPage({plantId}) {
  const plantData = [
    { title: 'Monstera Deliciosa', description: 'Monstera deliciosa, the Swiss cheese plant or split-leaf philodendron is a species of flowering plant native to tropical forests of southern Mexico, south to Panama. It has been introduced to many tropical areas, and has become a mildly invasive species in Hawaii, Seychelles, Ascension Island and the Society Islands. It is very widely grown in temperate zones as a houseplant.', imageUrl: 'https://www.houseplant.co.uk/cdn/shop/files/monstera-shoot-pink.jpg?v=1686074374&width=1946' },
    { title: 'Calathea', description: 'alathea is a genus of neotropical rhizomatous herbaceous perennial plants that are known for the unique leaf movements of patterned foliage (more on that below). Calatheas are also considered pet-friendly plants, making them great plant picks for anyone that shares a space with curious pets.', imageUrl: 'https://media.greg.app/Y2FyZS1wbGFudC1wcm9maWxlL0NhbGF0aGVhX21lZGFsbGlvbi5qcGc=?format=pjpeg&optimize=high&auto=webp&precrop=1000:1000,smart&fit=crop&width=1000&height=1000' },
    { title: 'Golden Photus', description: 'Pothos gets its other common name—Devil’s Ivy—thanks to its vigorous growth and penchant for returning to life even in the worst conditions! It’s the perfect beginner houseplant as it’s not picky about its soil and thrives in both indirect, bright light and low light.', imageUrl: 'https://media.istockphoto.com/id/1320269359/photo/tropical-epipremnum-aureum-marble-queen-pothos-houseplant-in-flower-pot.jpg?s=612x612&w=0&k=20&c=Rc4J3wkUQgd9vN_O7c7wRnbqCy1UUafqRSYLE2KGv_c=' },
    // Add more card data as needed
  ];
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
              title={plantData[0].title}
              description={plantData[0].description}
              imageUrl={plantData[0].imageUrl}
            />
          </Grid>

          <div>{plantId}</div>

          {plantsReview.map((plantReview, index) => (
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