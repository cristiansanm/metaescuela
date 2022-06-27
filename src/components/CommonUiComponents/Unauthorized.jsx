import { Grid } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import depression from "../../assets/img/Icons/depression.png"
import sad from "../../assets/img/Icons/sad.png"
import BecomeASellerModal from '../Modals/BecomeASellerModal'

const Unauthorized = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    return (
        <div className="single__product__container">
            <Grid
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                container
            >
                <Grid item>
                    <div className="empty__title">
                        <span>No eres vendedor aún...</span>
                        <img src={sad} alt="sad" width="48" height="48" />
                    </div>
                </Grid>
                <Grid sx={{ margin: "50px 0" }} item>
                    <img className="empty__central__img" src={depression} alt="depression" width="350" />
                </Grid>
                <Grid item>
                    <div className="empty__buttons">
                        <div className="empty__buttons">
                            <div>
                                <span>Pero puedes convertirte en uno</span>
                                <button
                                    className="button__orders__return"
                                    onClick={() => setOpen(true)}
                                >
                                    Ser vendedor
                                </button>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <BecomeASellerModal open={open} handleClose={handleClose}/>
        </div>


    )
}

export default Unauthorized