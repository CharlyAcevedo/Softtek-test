import React from "react";
import LogoSofttek from '../../assets/images.jpg'

const HeaderSofttek = () => {
    return (
        <header>
            <img className="floaty imagLogo" src={LogoSofttek} alt="Logotipo Softtek" />
            <h1 className="floaty" >Hello Softtek</h1>
        </header>
    )

}

export default HeaderSofttek