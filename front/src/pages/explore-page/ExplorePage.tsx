import { createTheme, ThemeProvider } from '@mui/material/styles';
import baseTheme from '../../theme.ts';
// import "./ExplorePage.css"
import PlantCard from '../../components/PlantCard.tsx';
import Grid from '@mui/material/Grid';
import { useContext, useEffect, useState } from 'react';
import { ExplorePlant, ExplorePlantData } from './explorePlantType.ts';
import { explore } from '../../services/plant-service.ts';
import { IUser } from '../../services/user-service.ts';
import AuthContext from '../../auth/AuthContext.tsx';
import apiClient from '../../services/api-client.ts';

const ExplorePageTheme = createTheme({
  ...baseTheme,
});

async function fetchPlants(): Promise<IPlant> {
  const response = await explore();
  return response;
}

export default function ExplorePage() {
  const [plants, setPlants] = useState<ExplorePlantData[]>([]);
  const {user, setUser} = useContext(AuthContext);

  useEffect(() => {
    if(apiClient.defaults.headers.common["authorization"]) {
      fetchPlants().then((plants) => setPlants(plants.data));
    }
  }, [user]);

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