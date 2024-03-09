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

  return (
    <ThemeProvider theme={GardenPageTheme}>        

    <div>
      <Button
        onClick={handleOpen}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        style={{ marginTop: '20px' }} 
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
        <Box sx={style} style={{ borderColor: theme.palette.garden.main, borderWidth: '3px', borderStyle: 'solid' }}>
       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <TextField id="plantName" label="Plant name" variant="standard" />
          </Box>
          <TextField id="description" label="Description" variant="standard" />
          <div className="d-flex justify-content-center position-relative">
            <Button type="button" className="btn position-absolute bottom-0 end-0" onClick={selectImg}>
                select image
            </Button>
            <img src={imgSrc ? URL.createObjectURL(imgSrc) : ""} style={{ height: "150px", width: "150px" }} className="img-fluid" />
            <input style={{ display: "none" }} ref={fileInputRef} type="file" onChange={imgSelected}></input>
          </div>
      </Box>
      </Box>
      
      </Modal>
    </div>
    </ThemeProvider>

  );
};

export default NewPost;
