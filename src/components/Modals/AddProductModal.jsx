import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import "../../assets/scss/CommonUI/AddProductModal.scss"
import add from "../../assets/img/Icons/add_product.png"
import { subCategoriesArray } from "../../assets/js/formaters"
import ProductController from "../../assets/controllers/ProductsController"

export default function AddProductButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [image, setImage] = useState('');
  const [uploadImg, setUploadImg] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleUploadImg = (e) => {
    let img = URL.createObjectURL(e.target.files[0]);
    setUploadImg(img)
  }
  const handleClose = () => {
    setOpen(false);
  };
  const sendData = async() => {
    try{
      let payload = {
        product_name: name,
        product_description: description,
        product_price: price,
        subcategory_id_fk: subCategory,
        product_availability: true,
        seller_id_fk: 1,
        product_stock: 1,
        product_image: image
      }
      await ProductController.createProduct(payload);
      alert("Producto agregado");
    }catch(e){
      console.log(e)
    }
  }
  return (
    <div className="add__button__container">
        <IconButton 
            variant="outlined" 
            onClick={handleClickOpen}
            sx={{ 
                color: '#F4FBFA',
                backgroundColor: '#283845',
                padding: "15px",
            }}
        >
            <AddIcon sx={{fontSize: "32px"}}/>
      </IconButton>
      <Dialog 
        sx={{maxHeight: "600px"}}
        open={open} 
        onClose={handleClose}
      >
        <DialogTitle 
          sx={{
            fontFamily: "Poppins, serif", 
            display: "flex", 
            justifyContent: "center",
            alignItems: "center",
            gap: 5
          }}
        >
          <span>Registra tu nuevo producto</span> 
          <img src={add} alt="add" width="24" height="24" />
        </DialogTitle>
        <hr className="modal__divider"/>
        <DialogContent>
          {uploadImg ?
            (<div
              style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%"
              }}
              >
              <img src={uploadImg} alt="imgupload" width="150" />
              <button onClick={()=> setUploadImg("")}>Eliminiar</button>
            </div>)
            : (
              <div className="insert__image__container">
                <label htmlFor="inputPhoto">
                  <div>
                    <AddIcon sx={{color: "#283845", fontSize: "4rem"}}/>
                  </div>
                  <input type="file"  accept="image/*" name="image" id="file"  onChange={handleUploadImg}/>
                </label>
              </div>
            )
          }
          
          
          <form action="">
            <FormControl fullWidth>
              <InputLabel id="subcatogory-id">Subcategoría</InputLabel>
                <Select
                  value={subCategory}
                  label="Subcategoría"
                  labelWidth={120}
                  onChange={(e) => setSubCategory(e.target.value)}
                >
                {
                  subCategoriesArray.map((subCategory, index) => 
                    <MenuItem key={index} value={subCategory.value}> 
                      {subCategory.label} 
                    </MenuItem>
                  )
                }
                </Select>
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  label="Nombre"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  autoFocus
                  margin="dense"
                  id="price"
                  label="Precio"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={e=>setDescription(e.target.value)}
                  autoFocus
                  value={description}
                  margin="dense"
                  id="name"
                  rows={4}
                  label="Descripción"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
            
          </form>
          
        </DialogContent>
        <DialogActions>
          <Button  
            variant="contained" 
            color="error" 
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={sendData}>Registrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}