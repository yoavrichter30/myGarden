import { createTheme, ThemeProvider } from '@mui/material/styles';
import baseTheme from '../../theme.ts';
// import "./ExplorePage.css"
import PlantCard from '../../components/PlantCard.tsx';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { ExplorePlant, ExplorePlantData } from './explorePlantType.ts';

const ExplorePageTheme = createTheme({
  ...baseTheme,
});

async function fetchPlants(): Promise<ExplorePlant> {
  const response = await fetch('http://localhost:8080/plants/explore');
  const plants = await response.json();
  return plants;
}

export default function ExplorePage() {
  const [plants, setPlants] = useState<ExplorePlantData[]>([]);

  useEffect(() => {
    fetchPlants().then((plants) => setPlants(plants.data));
  }, []);

  return (
    <ThemeProvider theme={ExplorePageTheme}>        
      <Grid container alignItems="center" justifyContent="center"  spacing={2} style={{ flexDirection: 'column' }}>
        {plants.map((plant, index: number) => (
          <Grid item xs={8} sm={8} md={8} lg={8} key={index}>
            <PlantCard 
              title={plant.common_name}
              description={`Slug: ${plant.slug}, Scientific name: ${plant.scientific_name}, Year: ${plant.year}, Bibliography: ${plant.bibliography}, Rank: ${plant.rank}, Family: ${plant.family_common_name}, Genus: ${plant.genus}`}
              imageUrl={plant.image_url}
            />
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
}