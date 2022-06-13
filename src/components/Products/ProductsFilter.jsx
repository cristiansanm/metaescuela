import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import SearchIcon from '@mui/icons-material/Search';
import BackspaceIcon from '@mui/icons-material/Backspace';
import "../../assets/scss/Products/ProductFilters.scss";

import { 
  checkboxContainer, 
  accordionBase, 
  accordionTitle,
  accordionContent,
  checkboxLabel,
  filterSearchButton,
  filterDeleteButton
} from '../../assets/js/styleObject/Products/ProducFilters';
import { Button, FormControl, Radio, RadioGroup, Tooltip } from '@mui/material';
import { subCategoryNumber } from '../../assets/js/formaters';
const ProductsFilter = ({setFiltersFunc}) => {
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
  const sendFilters = async() => {
    try {
      let prices = price.split(",");
      let subcategory = subCategoryNumber[education+grade] || 1;
      const filters = {
        subcategory,
        min: prices[0],
        max:  prices[1]
      }
      setFiltersFunc(filters)
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div>
      <div className="filters__header" name="categoria">
        <select 
          className="filters__title"
          value={category}
          onChange={handleCategory}
        >
          <option value="libros">Libros</option>
          <option value="tecnologia">Tecnología</option>
        </select>
      </div>
      <Accordion sx={accordionBase}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color: "#F4FBFA"}}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={accordionTitle}>
            {category === "libros" ? "Educación" : "Gadget" }
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={accordionContent}>
            {category === "libros" ? (
              <FormControl sx={checkboxContainer}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={education}
                  name="radio-buttons-group"
                  onChange={handleEducation}
                  sx={checkboxLabel}
                >
                  <FormControlLabel 
                    value="eso" 
                    control={<Radio />} 
                    label="ESO" 
                  />
                  <FormControlLabel 
                    value="bachillerato" 
                    control={<Radio />} 
                    label="Bachillerato" 
                  />
                  <FormControlLabel 
                    value="fp" 
                    control={<Radio />} 
                    label="FP" 
                  />
                </RadioGroup>
              </FormControl>  
            ) : (
              <FormControl sx={checkboxContainer}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={education}
                  name="radio-buttons-group"
                  onChange={handleEducation}
                  sx={checkboxLabel}
                >
                  <FormControlLabel 
                    value="mobiles" 
                    control={<Radio />} 
                    label="Móviles" 
                  />
                  <FormControlLabel 
                    value="portatiles" 
                    control={<Radio />} 
                    label="Portatiles" 
                  />
                  <FormControlLabel 
                    value="tabletas" 
                    control={<Radio />} 
                    label="Tabletas" 
                  />
                  <FormControlLabel 
                    value="accesorios" 
                    control={<Radio />} 
                    label="Accesorios" 
                  />
                </RadioGroup>
              </FormControl>  
            )}
        </AccordionDetails>
      </Accordion>

      {category === "libros" && (
        <Accordion sx={accordionBase}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{color: "#F4FBFA"}} />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography sx={accordionTitle}>Grado</Typography>
          </AccordionSummary>
          <AccordionDetails sx={accordionContent}>
            {/* Setting grade */}
            {education === "fp" ? (
              <FormControl sx={checkboxContainer}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={grade}
                  name="radio-buttons-group"
                  onChange={handleGrade}
                  sx={checkboxLabel}
                >
                  <FormControlLabel 
                    value="_basica" 
                    control={<Radio />} 
                    label="Basica" 
                  />
                  <FormControlLabel 
                    value="_media" 
                    control={<Radio />} 
                    label="Media" 
                  />
                  <FormControlLabel 
                    value="_superior" 
                    control={<Radio />} 
                    label="Superior" 
                  />
                </RadioGroup>
              </FormControl> 
            ) : (
              <FormControl sx={checkboxContainer}>
                
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={grade}
                  name="radio-buttons-group"
                  onChange={handleGrade}
                  sx={checkboxLabel}
                >
                  <FormControlLabel 
                    value="_primero" 
                    control={<Radio />} 
                    label="1º" 
                  />
                  <FormControlLabel 
                    value="_segundo" 
                    control={<Radio />} 
                    label="2º" 
                  />
                  <FormControlLabel
                    sx={education !== "eso" && {display: "none"}}
                    disabled={education === "eso" ?  false : true} 
                    value="_tercero" 
                    control={<Radio />} 
                    label="3º" 
                  />
                  <FormControlLabel 
                    sx={education !== "eso" && {display: "none"}}
                    disabled={education === "eso" ?  false : true} 
                    value="cuarto" 
                    control={<Radio />} 
                    label="4º" 
                  />
                </RadioGroup>
              </FormControl>
            )}
          </AccordionDetails>
        </Accordion>
      )}        
      

      <Accordion sx={accordionBase}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color: "#F4FBFA"}} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={accordionTitle}>Precio</Typography>
        </AccordionSummary>
        <AccordionDetails sx={accordionContent}>
          <FormControl sx={checkboxContainer}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={price}
              name="radio-buttons-group"
              onChange={handlePrice}
              sx={checkboxLabel}
            >
              <FormControlLabel 
                value="1,25" 
                control={<Radio />} 
                label="1€ a 25€" 
              />
              <FormControlLabel 
                value="26,50" 
                control={<Radio />} 
                label="26€ a 50€" 
              />
              <FormControlLabel 
                value="51,100" 
                control={<Radio />} 
                label="51€ a 100€" 
              />
              <FormControlLabel 
                value="101,5000" 
                control={<Radio />} 
                label="101€ a más" 
              />
            </RadioGroup>
          </FormControl> 
        </AccordionDetails>
      </Accordion>
      <div className="filter__buttons">
        <Tooltip title="Buscarfiltros">
          <Button
            sx={filterSearchButton}
            onClick={sendFilters}
          >
            Buscar filtros<SearchIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Eliminar filtros">
          <Button
            sx={filterDeleteButton}
            onClick={() => {
              setEducation("");
              setGrade("");
              setPrice("");
              setFiltersFunc({})
              console.log("Filters cleared!")
            }}
          >
            Borrar filtro <BackspaceIcon />
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}

export default ProductsFilter