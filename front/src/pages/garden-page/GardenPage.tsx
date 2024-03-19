import { createTheme, ThemeProvider } from '@mui/material/styles';
import baseTheme from '../../theme.ts';
import PlantCard from '../../components/Posts/PostPlantCard.tsx';
import NewPostModal from '../../components/Posts/NewPostModal.tsx';
import Grid from '@mui/material/Grid';
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { fetchPostsByUser } from '../../services/posts-service.ts';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { IUser } from '../../services/user-service.ts';

const GardenPageTheme = createTheme({
  ...baseTheme,
});

async function getPostByUser(username: String): Promise<IUser> {
  const response = await fetchPostsByUser(username);
  return response;
}

export default function GardenPage({ username }) {
  
  const [posts, setPosts] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  
  const handleOpenAddModal = () => setOpenAddModal(true);

  const handleCloseAddModal = () => setOpenAddModal(false);




  useEffect(() => {
    getPostByUser(username).then((posts: IPost[]) => {
      setPosts(posts);
    });

  }, [username]);

  return (
    <ThemeProvider theme={GardenPageTheme}>        
    {
      posts.length > 0 
      ? <Grid container alignItems="center" justifyContent="center"  spacing={2} style={{ flexDirection: 'column' }}>
        {posts.map((post, index) => (
          <Grid item xs={10} sm={10} md={10} lg={10} key={index} width="100%">
            <PlantCard 
              post={post}
            />
          </Grid>
        ))}
      </Grid>
      : <Typography variant="subtitle1" color="text.secondary" component="div"> There aren't posts yet...</Typography>

    } 
      

      {localStorage.getItem("userName") == username &&
        <div style={{ marginTop: '20px', marginBottom: '20px' }} >
          <Button
            onClick={handleOpenAddModal}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            New post
          </Button>
          <NewPostModal open={openAddModal} handleClose={handleCloseAddModal} isNew={true} />
        </div>
      }
      

    </ThemeProvider>
  );
}