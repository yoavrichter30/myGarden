import { createTheme, ThemeProvider } from '@mui/material/styles';
import baseTheme from '../../theme.ts';
import PlantCard from '../../components/Posts/PostPlantCard.tsx';
import Grid from '@mui/material/Grid';
import PlantReview from '../../components/PlantReview.tsx';
import { useEffect, useState } from 'react';
import { fetchPostsById, IComment, IPost, updatePostById } from '../../services/posts-service.ts';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
const PlantPageTheme = createTheme({
  ...baseTheme,
});

const newCommentStyle = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px', // Space between elements
    padding: '16px', // Padding for the card content
  },
  textField: {
    width: '100%', // TextField takes full width
  },
  button: {
    // alignSelf: 'flex-end', // Button is aligned to the end of the card
  },
});

async function getPostById(_id: String): Promise<IPost> {
  const response = await fetchPostsById(_id);
  return response;
}

export default function PlantPage({postId}) {

  const [post, setPost] = useState<IPost>({});
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(postId).then((p: IPost) => {
      setPost(p);
    });

    console.log(post)
  }, [postId]);

  const handleAddComment = () => {
    if (inputValue.trim() !== '') {
      const username = localStorage.getItem('userName')!;

      const newComment: IComment = {
        username,
        text: inputValue
      }
      
      const newPost: IPost = {
        ...post,
         comments: post.comments ? [...post.comments, newComment] : [newComment]
        }
      updatePostById(postId, newPost).then(() => {
        navigate(0);

      });
      
      setInputValue('');
    }
  };
  const classes = newCommentStyle();

  return (
    <ThemeProvider theme={PlantPageTheme}>       
      <Grid container alignItems="center" justifyContent="center"  spacing={2} style={{ flexDirection: 'column' }}>
          <Grid item xs={8} sm={8} md={8} lg={8} width="100%">
          <PlantCard 
              post={post}
            />
          </Grid>
          {post.comments?.map((comment, index) => (
            <Grid item xs={8} sm={8} md={8} lg={8} width="100%">
            <PlantReview 
              comment={comment}
            />
          </Grid>
          ))}

          <Grid item xs={8} sm={8} md={8} lg={8}  width="100%">
          <Card sx={{ display: 'flex'}} style={{ width: '100%', borderColor: baseTheme.palette.garden.main, borderWidth: '3px', borderStyle: 'solid' }}>
           {/* <Box sx={{ display: 'flex', flexDirection: 'column' , flexWrap: 'wrap' }}> */}
            <TextField
              label="Add new comment"
              variant="outlined"
              value={inputValue}
              className={classes.textField}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ margin: '10px' }}
            />   
          <IconButton aria-label="add" size="large"  color="primary"  onClick={handleAddComment} className={classes.button}  style={{ margin: '10px' }}>
        <AddIcon fontSize="inherit" />
      </IconButton>
            
          {/* </Box> */}
      
          </Card>
          </Grid>
      </Grid>
    </ThemeProvider>
  );
}