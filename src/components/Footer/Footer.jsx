import React, { useState, useEffect } from "react";

import styles from "./Footer.module.css";
import { getImageUrl } from "../../utils";

function Footer(){
    return (
        <section id = "footer" className= {styles.container}>
            <p> Copyright &copy; 2024 by Uday Kumar Surepally. <br />
            All rights reserved.
            </p>
            <div className={styles.iconTop}>
             <a href="/">
                <img src={getImageUrl("contact/4.png")}/>
            </a>
            </div>

        </section>
    );
   
}

export default Footer;

