import React from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import classes from "./AboutUsSection.module.css";

const AboutUsSection = (props) => {
  return (
    <div className={classes.AboutUsSection}>
      <SectionHeader>Who are we?</SectionHeader>
      <div className={classes.body}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam dicta quasi sit, dolores iste nemo natus vel beatae magnam deserunt rem velit voluptas
          rerum debitis, enim quibusdam iure aspernatur illum repellendus, doloribus alias error sapiente ratione? Tempora eaque fugiat dolor eligendi
          architecto voluptatibus iure sapiente labore aperiam deleniti? Doloremque, sequi aspernatur in animi ab voluptatibus reiciendis. Minima eos magni
          atque rem eum blanditiis ratione animi impedit voluptates? Odio dignissimos veniam consequuntur magni distinctio dolores? Facilis, ipsam accusantium
          recusandae amet vitae, facere tempora impedit expedita dolorem voluptas porro hic placeat laboriosam omnis doloribus cumque, perspiciatis cupiditate
          ratione. Nesciunt, odio. Dolorem, quis.
        </p>
      </div>
    </div>
  );
};

export default AboutUsSection;
