import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import theme from '../../theme';
import { useNavigate } from 'react-router-dom';
import { IPost } from '../../services/posts-service';
import EditIcon from '@mui/icons-material/Edit';


const PlantCard = ({ post }: {post: IPost}) => {
  const navigate = useNavigate();
  const routeChange = (path: string) => navigate(path);
  const routePlantPage = (_id: string) => routeChange(`/plantPage?postId=${_id}`);
  const editPost = () => { }

    return (
    <Card sx={{ display: 'flex'}} style={{ width: '100%', borderColor: theme.palette.garden.main, borderWidth: '3px', borderStyle: 'solid' }}>
      <CardMedia
        component="img"
        alt="Image"
        sx={{ width: 151 }}
        image={post.imageUrl}
        style={{ padding: '16px' }}
      />
       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography component="div" variant="h5" align="left" >          
            {post.plantName}
            </Typography>
            {/* <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '16px', height: '200px' }}> */}

            <Typography style={{ paddingLeft: '10px' , paddingTop: '10px' }} variant="subtitle2" color="text.secondary" component="div" align="right">
            by {post.username}
            </Typography>
            <IconButton aria-label="edit" size="small" color="primary" onClick={editPost} >
              <EditIcon/>
            </IconButton>     
          </Box>
          <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
          {post.description}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div" align="left" onClick={() => {routePlantPage(post._id)}}>
          {post.comments?.length} Comments
          </Typography>
        </CardContent>
        
      </Box>
    </Card>
  );
};

export default PlantCard;
