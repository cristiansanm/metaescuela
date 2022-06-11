
export const productFilters = {
    flexFlow: 'column',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#BBE7DF',
    height: '92vh',
    overflowY: 'auto',
    scrollBehavior: 'smooth',
    '@media only screen and (max-width: 1281px)': {
        height: '91vh',
    },
    '@media only screen and (min-width: 1200px)': {
        display: 'flex',
    },
    display: 'none',
}

export const  checkboxContainer = {
    marginRight: "8vw",
    '@media only screen and (min-width: 1281px)': {
        marginRight: "10vw",
    }
}

export const checkboxLabel = {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '500',
    fontSize: '1.2rem',
    '& .MuiTypography-root':{
        fontFamily: 'Poppins, sans-serif',
        fontWeight: '500',
        fontSize: '1rem',
    }
} 
export const accordionBase = {
    backgroundColor: '#16C9C0',
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
}

export const accordionTitle = {
    color: "#F4FBFA",
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1.2rem',
    fontWeight: '500',
}

export const accordionContent = {
    backgroundColor: '#EAF4F4',
    color: "#283845",
    
}

export const filterSearchButton = {
    backgroundColor: '#76D8C8',
    color: "#F4FBFA",
    padding: "15px",
    fontSize: "18px",
    textTransform: 'capitalize',
    '&:active': {
        transform: "translateY(2px)",
    },
    '& svg': {
        marginLeft: '5px'
    },
}

export const filterDeleteButton = {
    backgroundColor: '#E98074',
    color: "#F4FBFA",
    padding: "15px",
    textTransform: 'capitalize',
    fontSize: "18px",
    '&:active': {
        transform: "translateY(2px)",
    },
    '& svg': {
        marginLeft: '5px'
    },

}

export const navbarStyle = {
    '@media only screen and (max-width: 992px)': {
        display: 'none'
    }
}
export const productsFilterMobile = {
    '@media only screen and (min-width: 1200px)': {
        display: 'none',
    },
    marginTop: '20px',
    display: 'block',
    
}