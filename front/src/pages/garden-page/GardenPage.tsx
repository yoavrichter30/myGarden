import { createTheme, ThemeProvider } from '@mui/material/styles';
import baseTheme from '../../theme.ts';
// import "./GardenPage.css"
import PlantCard from '../../components/Posts/PlantCard.tsx';
import NewPost from '../../components/Posts/NewPost.tsx';
import Grid from '@mui/material/Grid';
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';

const GardenPageTheme = createTheme({
  ...baseTheme,
});

export default function GardenPage({ username }) {
  
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    async function fetchPostsByUser() {
      try {
        const response = await fetch(`http://localhost:8080/posts/byUser/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPostsByUser();
  }, [username]);

  return (
    <ThemeProvider theme={GardenPageTheme}>        
      <Grid container alignItems="center" justifyContent="center"  spacing={2} style={{ flexDirection: 'column' }}>
        {posts.map((post, index) => (
          <Grid item xs={10} sm={10} md={10} lg={10} key={index}>
            <PlantCard 
              post={post}
            />
          </Grid>
        ))}
      </Grid>
      <NewPost username={username}/>

    </ThemeProvider>
  );
}