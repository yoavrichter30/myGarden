import { createTheme, ThemeProvider } from '@mui/material/styles';
import baseTheme from '../../theme.ts';
// import "./GardenPage.css"
import PlantCard from '../../components/Posts/PostPlantCard.tsx';
import NewPost from '../../components/Posts/NewPostModal.tsx';
import Grid from '@mui/material/Grid';
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { fetchPostsByUser } from '../../services/posts-service.ts';

const GardenPageTheme = createTheme({
  ...baseTheme,
});

async function getPostByUser(username: String): Promise<IUser> {
  const response = await fetchPostsByUser(username);
  return response;
}

export default function GardenPage({ username }) {
  
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostByUser(username).then((posts: IPost[]) => {
      setPosts(posts);

    });

  }, [username]);

  return (
    <ThemeProvider theme={GardenPageTheme}>        
      <Grid container alignItems="center" justifyContent="center"  spacing={2} style={{ flexDirection: 'column' }}>
        {posts.map((post, index) => (
          <Grid item xs={10} sm={10} md={10} lg={10} key={index} width="100%">
            <PlantCard 
              post={post}
            />
          </Grid>
        ))}
      </Grid>
      <div style={{ marginTop: '20px', marginBottom: '20px' }} >
      <NewPost username={username}/>
      </div>

    </ThemeProvider>
  );
}