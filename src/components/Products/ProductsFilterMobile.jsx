import { IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import "../../assets/scss/Products/ProductFilters.scss";
import SearchIcon from '@mui/icons-material/Search';
import BackspaceIcon from '@mui/icons-material/Backspace';
const ProductsFilterMobile = () => {
    const [category, setCategory] = useState("libros");
    const [education, setEducation] = useState("");
    const [grade, setGrade] = useState("");
    const [price, setPrice] = useState(""  );
    const handleCategory = (e) => {
        setCategory(e.target.value);
        setEducation("");
        setGrade("");
        setPrice("");
    }
    const handleEducation = (e) => {
        setEducation(e.target.value);
        setGrade("");
        setPrice("");
    }
    const handleGrade = (e) => {
        setGrade(e.target.value);
        setPrice("");
    }
    const handlePrice = (e) => {
        setPrice(e.target.value);
    }
    const handleSearchFilter = () => {
        console.log(`SELECT * FROM products WHERE product_category = ${category} AND product_price = ${price} AND product_subcategory = ${education + grade}`);
    }
    const handleCleanFilters = () => {
        setCategory("");
        setEducation("");
        setGrade("");
        setPrice("");
    }
    return (
        <div className='mobile__filter__container'>
            <select
                value={category}
                onChange={handleCategory} 
                name="category" 
                id="category"
            >
                <option disabled value="">Categoría</option>
                <option value="libros">Libros</option>
                <option value="tecnologia">Tecnología</option>
            </select>
            {category === "libros" ? (
               <select
                value={education}
                onChange={handleEducation}
                name="education"
                id="education"
                >
                    <option disabled value="">Educación</option>
                    <option value="eso_">ESO</option>
                    <option value="bachillerato_">Bachillerato</option>
                    <option value="fp_">FP</option>
                </select> 
            ) : (
                <select
                    value={education}
                    onChange={handleEducation}
                    name="education"
                    id="education"
                >
                    
                    <option disabled value="">Tipo</option>
                    <option value="mobiles">Mobiles</option>
                    <option value="tabletas">Tabletas</option>
                    <option value="portatiles">Portatiles</option>
                    <option value="accesorios">Accesorios</option>

                </select>
            )}
            {category === "libros" && (
                <>
                    {education === "eso_" || education === "bachillerato_" ? (
                        <select
                            value={grade}
                            onChange={handleGrade}             
                            name="grade" 
                            id="grade"
                        >
                            <option disabled value="">Grado</option>
                            <option value="primero">1º</option>
                            <option value="segundo">2º</option>
                            <option 
                                disabled={education !== "eso_" ? true : false}
                                value="tercero"
                            >
                                3º
                            </option>
                            <option
                                disabled={education !== "eso_" ? true : false} 
                                value="cuarto"
                            >
                                4º
                            </option>
                        </select>
                    ):(
                        <select
                            value={grade}
                            onChange={handleGrade}             
                            name="grade" 
                            id="grade"
                        >
                            <option disabled value="">Grado</option>
                            <option value="basica">Básica</option>
                            <option value="media">Media</option>
                            <option value="superior">Superior</option>
                        </select>
                    )}
                </>
            )}
            <select 
                value={price}
                onChange={handlePrice}
                name="price" 
                id="price"
            >
                <option disabled value="">Precio</option>
                <option value="1-25">1 € a 25 €</option>
                <option value="26-50">26 € a 50 €</option>
                <option value="51-100">51 € a 100 €</option>
                <option value="101">101 € a más</option>
            </select>
            <div className="mobile__filter__button">
                <Tooltip title="Buscar">
                    <IconButton 
                        size='small'
                        sx={{color: '#76D8C8'}}
                        variant='contained'
                        onClick={handleSearchFilter}
                    >
                    <SearchIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Limpiar">
                    <IconButton 
                        size='small'
                        color='error'
                        variant='contained'
                        onClick={handleCleanFilters}
                    >
                        <BackspaceIcon/>
                    </IconButton>
                </Tooltip>
                

            </div>
        </div>
    )
}

export default ProductsFilterMobile