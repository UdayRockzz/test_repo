import { useState } from "react";
import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";

export const ProjectCard = ({
  project: { title, imageSrc, gifSrc, description, skills, demo, source },
}) => {
  // State to manage the current image being displayed
  const [currentImage, setCurrentImage] = useState(getImageUrl(imageSrc));

  // Handlers for hover events
  const handleMouseEnter = () => {
    setCurrentImage(getImageUrl(gifSrc));
  };

  const handleMouseLeave = () => {
    setCurrentImage(getImageUrl(imageSrc));
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={currentImage}
        alt={`Image of ${title}`}
        className={styles.image}
      />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <ul className={styles.skills}>
        {skills.map((skill, id) => {
          return (
            <li key={id} className={styles.skill}>
              {skill}
            </li>
          );
        })}
      </ul>
      <div className={styles.links}>
        <a href={demo} className={styles.link}>
          Demo
        </a>
        <a href={source} className={styles.link}>
          Source
        </a>
      </div>
    </div>
  );
};
