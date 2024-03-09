import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import baseTheme from '../../theme.ts';
import theme from '../../theme';
import { ChangeEvent, useRef, useState } from 'react'
import { uploadPhoto } from '../../services/file-service'
import { createPost, IPost } from '../../services/posts-service'
import { useNavigate } from 'react-router-dom';

const GardenPageTheme = createTheme({
  ...baseTheme,
});

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const NewPost = ({ username }: {username: string}) => {

  const navigate = useNavigate();
  const routeChange = (path: string) => navigate(path); 
  const routeGarden = () => routeChange(`/gardenPage/?username=${username}`);


  const [open, setOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState<File>()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fileInputRef = useRef<HTMLInputElement>(null)

  const imgSelected = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    if (e.target.files && e.target.files.length > 0) {
        setImgSrc(e.target.files[0])
    }
}
const selectImg = () => {
    console.log("Selecting image...")
    fileInputRef.current?.click()
}

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  if (data.get('plantName')?.toString() && data.get('description')?.toString()) {
    const url = await uploadPhoto(imgSrc!);
    console.log("upload returned:" + url);
    const post: IPost = {
      username: username,
      plantName: data.get('plantName')?.toString(),
      imageUrl: url,
      description: data.get('description')?.toString(),
      comments: []
    } 
    const res = await createPost(post)
    navigate(0);
  }
};

  return (
    <ThemeProvider theme={GardenPageTheme}>        
      <Button
        onClick={handleOpen}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        New post
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <Box sx={style} style={{ borderColor: theme.palette.garden.main, borderWidth: '3px', borderStyle: 'solid' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography component="div" variant="h5" align="left" >          
              New Plant Post
              </Typography> 
                   
              <TextField
                name="plantName"
                variant="standard"
                required
                color="secondary"
                id="plantName"
                label="Plant name"
              />
              {/* <TextField id="description" label="Description" variant="standard" /> */}
              <TextField
                name="description"
                variant="standard"
                required
                color="secondary"
                id="description"
                label="Description"
              />

            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            {imgSrc && <img src={URL.createObjectURL(imgSrc)} onClick={selectImg} style={{ height: "150px", width: "150px" }} className="img-fluid" />}
            <input style={{ display: "none" }} ref={fileInputRef} type="file" onChange={imgSelected}></input>
            {!imgSrc && <Button type="button" onClick={selectImg}> select image</Button>}
            </Box>
            <Button style={{ marginTop: '20px'}} type="submit">
                    Post
            </Button>

          </Box>
        </Box>
      </Modal>
    </ThemeProvider>

  );
};

export default NewPost;
