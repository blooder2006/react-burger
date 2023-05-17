import React from "react";
import styles from "./ingredient-image.module.css";
import { IIngredientImageProps } from "../../utils/interfaces-and-types";

const IngredientImage: React.FC<IIngredientImageProps> = ({
  iconSrc,
  alt,
  overflow = 0,
  extraClass,
}) => {
  return (
    <div className={`${styles.container} ${extraClass}`}>
      <div>
        <picture className={`${styles.picture}`}>
          <img src={iconSrc} alt={alt} width="112" height="56" />
        </picture>
        {overflow > 0 && (
          <div
            className={`${styles.container} ${styles.picture} ${styles.overflow}`}
          >
            <div className={`${styles.picture} "text text_type_main-small`}>
              +{overflow}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientImage;
