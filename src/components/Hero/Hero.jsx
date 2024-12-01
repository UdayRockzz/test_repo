import React from "react";

import styles from "./Hero.module.css"
import { getImageUrl } from "../../utils";


export const Hero = () => {
    return (
    <section className={styles.container}>
        <div className={styles.content}>
            <h1 className={styles.title}>Hi, I'm Uday Kumar Surepally</h1>
            <p className={styles.description}>
                I'm a Robotics Software developer with 5 years of experience. Reach out if you'd like to learn more!
            </p>
            
        <div className={styles.contactskills}>
             <a href="mailto:uday038@email.com" className={styles.contactBtn}>
                Contact Me
            </a>
            
            
          <a href="https://www.youtube.com/" className={styles.skill}>    
          <img src={getImageUrl("contact/youtube.png")} alt="Email icon"></img>
          </a>
        
        <a href="https://www.linkedin.com/in/uday-kumar-surepally-01422078/" className={styles.skill}>
          <img src={getImageUrl("contact/linkedinIcon.png")} alt="LinkedIn icon"/>
        </a>
        <a href="https://github.com/UdayRockzz" className={styles.skill}>
          <img src={getImageUrl("contact/githubIcon.png")} alt="Github icon" />
        </a>
        <a href="https://instagram.com/" className={styles.skill}>
          <img src={getImageUrl("contact/ins.png")} alt="Instagram icon" />
        </a>
        </div>
        </div>

        <img
                src={getImageUrl("hero/heroImage.png")}
                alt="Hero image of me"
                className={styles.heroImg}
        />
        

        <div className={styles.topBlur} />
        <div className={styles.bottomBlur} />
    </section>
    );
};
