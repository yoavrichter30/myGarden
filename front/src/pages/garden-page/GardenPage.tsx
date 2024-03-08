import { createTheme, ThemeProvider } from '@mui/material/styles';
import baseTheme from '../../theme.ts';
// import "./GardenPage.css"
import PlantCard from '../../components/Posts/PlantCard.tsx';
import Grid from '@mui/material/Grid';
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import React from 'react';

// function useQuery() {
//   const { search } = useLocation();

//   return React.useMemo(() => new URLSearchParams(search), [search]);
// }

const GardenPageTheme = createTheme({
  ...baseTheme,
});

export default function GardenPage({ name }) {

  const plantData = [
    { title: 'Monstera Deliciosa', description: 'Monstera deliciosa, the Swiss cheese plant or split-leaf philodendron is a species of flowering plant native to tropical forests of southern Mexico, south to Panama. It has been introduced to many tropical areas, and has become a mildly invasive species in Hawaii, Seychelles, Ascension Island and the Society Islands. It is very widely grown in temperate zones as a houseplant.', imageUrl: 'https://www.houseplant.co.uk/cdn/shop/files/monstera-shoot-pink.jpg?v=1686074374&width=1946' },
    { title: 'Calathea', description: 'alathea is a genus of neotropical rhizomatous herbaceous perennial plants that are known for the unique leaf movements of patterned foliage (more on that below). Calatheas are also considered pet-friendly plants, making them great plant picks for anyone that shares a space with curious pets.', imageUrl: 'https://media.greg.app/Y2FyZS1wbGFudC1wcm9maWxlL0NhbGF0aGVhX21lZGFsbGlvbi5qcGc=?format=pjpeg&optimize=high&auto=webp&precrop=1000:1000,smart&fit=crop&width=1000&height=1000' },
    { title: 'Golden Photus', description: 'Pothos gets its other common name—Devil’s Ivy—thanks to its vigorous growth and penchant for returning to life even in the worst conditions! It’s the perfect beginner houseplant as it’s not picky about its soil and thrives in both indirect, bright light and low light.', imageUrl: 'https://media.istockphoto.com/id/1320269359/photo/tropical-epipremnum-aureum-marble-queen-pothos-houseplant-in-flower-pot.jpg?s=612x612&w=0&k=20&c=Rc4J3wkUQgd9vN_O7c7wRnbqCy1UUafqRSYLE2KGv_c=' },
    // Add more card data as needed
  ];
  return (
    <ThemeProvider theme={GardenPageTheme}>        
      <Grid container alignItems="center" justifyContent="center"  spacing={2} style={{ flexDirection: 'column' }}>
        {plantData.map((plant, index) => (
          <Grid item xs={8} sm={8} md={8} lg={8} key={index}>
            <PlantCard 
              title={plant.title}
              description={plant.description}
              imageUrl={plant.imageUrl}
            />
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
    // <Card size="sm">Small card</Card>
    // <div>hello</div>

  );
}