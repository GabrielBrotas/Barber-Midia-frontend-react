import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.secondaryColor,
    margin: '2rem 1rem 2rem 0',
    "&:hover": {
      backgroundColor: "#2d62a6a8"
    }
  },
}));

export default function IconLabelButtons(props) {
  const {takeImageToUpload, setImageToUploadData} = props

  const classes = useStyles();
  
  const handlePostPicture = () => {
      // pegar o id do input onde escolher o arquivo
      const fileInput = document.getElementById('postPicture')
      // e clicar
      fileInput.click()
  }

  const handleImageUpload = (event) => {
      // pegar a imagem, mesmo escolhendo apenas uma vai vim em um array entao vamos pegar a primeira
      const image = event.target.files[0]
      setImageToUploadData(image)
      // criar um formData para mandar pro backend
      const formData = new FormData();
      // nesse form colocar um name, o arquivo e o blob name
      formData.append('image', image, image.name)
      // mandar para action do redux fazer o upload
      takeImageToUpload(formData)
  }

  return (
    <div>
    <input type="file" id="postPicture" onChange={handleImageUpload} hidden="hidden"/>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
        onClick={handlePostPicture}
      >
        Upload image
      </Button>
    </div>
  );
}
