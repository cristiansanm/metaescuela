import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select
} from '@mui/material';
import "../../assets/scss/CommonUI/AddProductModal.scss"
import add from "../../assets/img/Icons/add_product.png"
import { subCategoriesArray } from "../../assets/js/formaters"
import ProductController from "../../assets/controllers/ProductsController"
import SnackMessages from "../CommonUiComponents/SnackMessages"
import useAuth from '../../customHooks/useAuth';

export default function EditProductModal({ open, handleClose, id }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [stock, setStock] = useState('');
    const [isAvailable, setIsAvailable] = useState(true);
    const [img, setImg] = useState('');
    // Variables para el SnackMessages 
    const [openSnack, setOpenSnack] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const handleCloseSnack = () => {
        setOpenSnack(false);
    }
    const { auth } = useAuth();

    useEffect(() => {
        const getProduct = async () => {
            try {
                if (id) {
                    let { data } = await ProductController.getProductById(id)
                    setName(data?.product_name)
                    setDescription(data?.product_description)
                    setPrice(data?.product_price)
                    setSubCategory(data?.subcategory_id_fk)
                    setStock(data?.product_stock)
                    setIsAvailable(data?.product_availability)
                    setImg(data?.product_image)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getProduct();
    }, [id]);

    const sendData = async () => {
        try {
            let payload = {
                productId: id,
                product_name: name,
                product_description: description,
                product_price: price,
                subcategory_id_fk: subCategory,
                product_availability: isAvailable,
                seller_id_fk: auth?.user_id,
                product_stock: stock,
                product_image: img
            }
            await ProductController.editProduct(payload)
            handleClose()
            setOpenSnack(true);
            setMessage("Producto editado con éxito");
            setType("success")
            setName("");
            setDescription("");
            setPrice("");
            setSubCategory("");
            setStock("");
            setIsAvailable(true);
            setTimeout(() => {
                window.location.reload();
            }, 2000)
            
        } catch (e) {
            setOpenSnack(true);
            setMessage("error al editar");
            setType("error");
            console.log(e)
        }
    }

    return (
        <>
            <div>
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
                        <span>Edita tu producto</span>
                        <img src={add} alt="add" width="24" height="24" />
                    </DialogTitle>
                    <hr className="modal__divider" />
                    <DialogContent>
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
                                <Grid sx={{ my: 1 }} item xs={5}>
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
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={sendData}
                        >
                            Editar
                        </Button>
                    </DialogActions>
                </Dialog>
                <SnackMessages open={openSnack} handleClose={handleCloseSnack} type={type} message={message} />
            </div>

        </>

    );
}