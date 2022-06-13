import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import "../../assets/scss/CommonUI/AddProductModal.scss"
import add from "../../assets/img/Icons/add_product.png"
import { subCategoriesArray } from "../../assets/js/formaters"
import ProductController from "../../assets/controllers/ProductsController"
import SnackMessages from "../CommonUiComponents/SnackMessages"
import {
  ref,
  uploadBytes,
  getDownloadURL

} from "firebase/storage";
import { storage } from "../../firebase/firebasedb";
import { Outlet } from 'react-router-dom';
import useAuth from '../../customHooks/useAuth';

export default function AddProductButton() {
  //Conexion con base de datos (FIREBASE) y funcion subida de archivo

  //
  const [imageUpload, setImageUpload] = useState(null);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [stock, setStock] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [uploadImg, setUploadImg] = useState('');
  // Variables para el SnackMessages 
  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const handleCloseSnack = () => {
    setOpenSnack(false);
  }
  const { auth } = useAuth();

  //

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleUploadImg = (e) => {
    setImageUpload(e.target.files[0]);
    let img = URL.createObjectURL(e.target.files[0]);
    setUploadImg(img)

  }
  const handleClose = () => {
    setOpen(false);
  };


  const sendData = async () => {
    let userId = localStorage.getItem('id')
    try {
      let payload = {
        product_name: name,
        product_description: description,
        product_price: price,
        subcategory_id_fk: subCategory,
        product_availability: isAvailable,
        seller_id_fk: auth?.user_id,
        product_stock: stock,
        product_image: ""
      }

      if (imageUpload == null) {
        handleClose()
        setOpenSnack(true)
        setMessage("La imagen no se ha encontrado")
        setType("error")
        return
      };
      const imageRef = ref(storage, `Productos/${imageUpload.name}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          payload.product_image = url

          ProductController.createProduct(payload)
            .then(res => {
              handleClose()
              setOpenSnack(true);
              setMessage("Producto creado correctamente.")
              setType("success")
              setName("");
              setDescription("");
              setPrice("");
              setSubCategory("");
              setUploadImg("");
              setImageUpload(null);
              setStock("");
              setIsAvailable(true);
              
            }).catch(err => {
              handleClose()
              setOpenSnack(true)
              setMessage("Error al subir el producto")
              setType("error")
              console.log(err)
            })

        });
      })
    } catch (e) {
      setOpenSnack(true);
      setMessage(e);
      setType("error");
    }
  }

  return (
    auth?.user_roles?.includes("SELLER")
      ? (
        <>
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
              <AddIcon sx={{ fontSize: "32px" }} />
            </IconButton>
            <Dialog
              sx={{ maxHeight: "600px" }}
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
              <hr className="modal__divider" />
              <DialogContent>
                {uploadImg ?
                  (<div
                    className="uploaded__img"
                  >
                    <div>
                      <img src={uploadImg} alt="imgupload" width="150" />
                    </div>
                    <div>
                      <button onClick={() => setUploadImg("")}>Eliminiar</button>
                    </div>
                    
                    
                  </div>)
                  : (
                    <div className="insert__image__container">
                      <label htmlFor="inputPhoto">
                        <div>
                          <AddIcon sx={{ color: "#283845", fontSize: "4rem" }} />
                        </div>
                      </label>
                      <input type="file" accept="image/*" name="inputPhoto" id="inputPhoto" onChange={handleUploadImg} />
                    </div>
                  )
                }


                <form action="">
                  <FormControl fullWidth>
                    <InputLabel id="subcatogory-id">Subcategoría</InputLabel>
                    <Select
                      value={subCategory}
                      label="Subcategoría"
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
                    <Grid sx={{my: 1}} item xs={5}>
                      <TextField
                        autoFocus
                        margin="stock"
                        id="stock"
                        value={stock}
                        onChange={e => setStock(e.target.value)}
                        label="Stock"
                        type="text"
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={7}>
                      <FormControl>
                        <FormLabel id="availbility-id">Disponibilidad</FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="availability-id"
                          name="availability"
                          value={isAvailable}
                          onChange={(e) => setIsAvailable(e.target.value)}
                        >
                          <FormControlLabel value={true} control={<Radio />} label="Disponible" />
                          <FormControlLabel value={false} control={<Radio />} label="No disponible" />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        onChange={e => setDescription(e.target.value)}
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
            <SnackMessages open={openSnack} handleClose={handleCloseSnack} type={type} message={message} />
          </div>
          <section>
            <Outlet />
          </section>
        </>
      ) : (
        <section>
          <Outlet />
        </section>
      )
  );
}