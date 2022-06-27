import { Grid } from '@mui/material'
import money from '../../assets/img/Icons/money.png'
import sad from "../../assets/img/Icons/sad.png"
import addButton from "../../assets/img/Icons/add_product.png"
const NoDataForSeller = () => {
    return (
        <Grid
        direction="column"
        justifyContent="center"
        alignItems="center"
        container
        spacing={5}
    >
        <Grid item>
            <div className="empty__title">
                <span>No tienes productos publicados... </span>
                <img src={sad} alt="sad" width="48" height="48" />
            </div>
        </Grid>
        <Grid item>
            <img className="empty__central__img" src={money} alt="emptyBox" width="350" />
        </Grid>
        <Grid item>
            <div className="empty__buttons">
                <span>No te preocupes, puedes publicar con el botón</span>
                <img src={addButton} alt="add" width="42"/>
            </div>
        </Grid>
    </Grid>
    )
}

export default NoDataForSeller