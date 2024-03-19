import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import baseTheme from '../../theme.ts';
import theme from '../../theme.ts';
import { ChangeEvent, useRef, useState, useEffect } from 'react'
import { uploadPhoto } from '../../services/file-service.ts'
import { createPost, IPost,updatePostById } from '../../services/posts-service.ts'
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

const NewPostModal = ({ open, handleClose, isNew, post }: { open: any, handleClose: any, isNew: boolean, post: IPost }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    plantName: '',
    description: '',
    imageUrl: null,
  });
  const imgPreviewUrl = (url: string, imgOnServer: boolean) => imgOnServer ? url : URL.createObjectURL(url);

  useEffect(() => {
    setIsImgOnServer(false);
    if (!isNew) {
      setIsImgOnServer(true);
      setIsUpdateImg(false);
      setFormData({
        plantName: post?.plantName,
        description: post?.description,
        imageUrl: post?.imageUrl,
      });
      // setImgSrc(post?.imageUrl)
    }
  }, [post, isNew]);

  const [imgSrc, setImgSrc] = useState<File>();
  const [isImgOnServer, setIsImgOnServer] = useState<Boolean>();
  const [isUpdateImg, setIsUpdateImg] = useState<Boolean>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const imgSelected = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    if (e.target.files && e.target.files.length > 0) {
        setIsImgOnServer(false);
        setImgSrc(e.target.files[0]);
        setIsUpdateImg(true);
        setFormData((prevData) => ({
          ...prevData,
          imageUrl: ((e.target.files)![0]),
        }));
    }
}
const selectImg = () => {
    console.log("Selecting image...")
    fileInputRef.current?.click()
}

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => isNew ?
  handleCreateSubmit(event) : handleEditSubmit(event);

const handleCreateSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  if (data.get('plantName')?.toString() && data.get('description')?.toString()) {
    const url = await uploadPhoto(formData.imageUrl!);
    console.log("upload returned:" + url);
    const post: IPost = {
      username: localStorage.getItem("userName")!,
      plantName: data.get('plantName')?.toString(),
      imageUrl: url,
      description: data.get('description')?.toString(),
      comments: []
    } 
    
    await createPost(post)
    navigate(0);
  }
};

//  TODO: call this function
const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  if (data.get('plantName')?.toString() && data.get('description')?.toString()) {
    // if(!isImgOnServer) {
    //   const url = await uploadPhoto(formData.imageUrl!);
    //   console.log("upload returned:" + url);
    // }
    const url = isImgOnServer ? post.imageUrl : await uploadPhoto(formData.imageUrl!);
    const newPost: IPost = {
      ...post,
      username: localStorage.getItem("userName")!,
      plantName: data.get('plantName')?.toString(),
      imageUrl: url,
      description: data.get('description')?.toString(),
    } 
  
    await updatePostById(newPost._id!, newPost)
    navigate(0);
    // TODO: Send edit post
    // await createPost(post)
  }
};
  return (
    <ThemeProvider theme={GardenPageTheme}>        

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
              {isNew ? 'New' : 'Edit'} Plant Post
              </Typography> 
                   
              <TextField
                name="plantName"
                variant="standard"
                required
                color="secondary"
                id="plantName"
                label="Plant name"
                value={formData.plantName}
                onChange={handleChange}
              />
              <TextField
                name="description"
                variant="standard"
                required
                color="secondary"
                id="description"
                label="Description"
                value={formData.description}
                onChange={handleChange}
              />

            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              
            {formData.imageUrl && <img src={imgPreviewUrl(formData.imageUrl,isImgOnServer)} onClick={selectImg} style={{ height: "150px", width: "150px" }} className="img-fluid" />}
            <input style={{ display: "none" }} ref={fileInputRef} type="file" onChange={imgSelected}></input>
            {!formData.imageUrl && <Button type="button" onClick={selectImg}> select image</Button>}
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

export default NewPostModal;
