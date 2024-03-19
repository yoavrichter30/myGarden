import { createTheme, ThemeProvider } from '@mui/material/styles';
import baseTheme from '../../theme.ts';
import ExplorePlantCard from '../../components/ExplorePlantCard.tsx';
import Grid from '@mui/material/Grid';
import { useContext, useEffect, useState } from 'react';
import { ExplorePlant, ExplorePlantData } from './explorePlantType.ts';
import { explore } from '../../services/plant-service.ts';
import { IUser } from '../../services/user-service.ts';
import AuthContext from '../../auth/AuthContext.tsx';
import apiClient from '../../services/api-client.ts';
import LoadingOverlay from 'react-loading-overlay-ts';
import { IPlant } from '../../services/plant-service.ts';

const ExplorePageTheme = createTheme({
  ...baseTheme,
});

async function fetchPlants(): Promise<IPlant> {
  const response = await explore();
  return response;
}

export default function ExplorePage() {
  const [plants, setPlants] = useState<ExplorePlantData[]>([]);
  const [isLoadingActive, setIsLoadingActive] = useState(false);

  useEffect(() => {
    setIsLoadingActive(true)
    fetchPlants().then((plants: any) => {
      setPlants(plants.data);
      setIsLoadingActive(false)
    });
  }, []);

  return (
    <ThemeProvider theme={ExplorePageTheme}>
      <LoadingOverlay
        active={isLoadingActive}
        spinner
        text='Signing up...'
        >         
      <Grid container alignItems="center" justifyContent="center"  spacing={2} style={{ flexDirection: 'column' }}>
        {plants.map((plant, index: number) => (
          <Grid item xs={8} sm={8} md={8} lg={8} key={index}>
            <ExplorePlantCard 
              title={plant.common_name}
              description={`Slug: ${plant.slug}, Scientific name: ${plant.scientific_name}, Year: ${plant.year}, Bibliography: ${plant.bibliography}, Rank: ${plant.rank}, Family: ${plant.family_common_name}, Genus: ${plant.genus}`}
              imageUrl={plant.image_url}
            />
          </Grid>
        ))}
      </Grid>
      </LoadingOverlay>
    </ThemeProvider>
  );
}