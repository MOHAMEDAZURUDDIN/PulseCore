import React, { useMemo } from "react";
import SideBanner1 from "../../assets/images/offer/off1.jpg";
import SideBanner2 from "../../assets/images/offer/off2.jpg";
import SideBanner3 from "../../assets/images/offer/off3.png";
import SideBanner4 from "../../assets/images/offer/off4.png";

import { SideBannerBox, SideBannerImage } from "../../styles/sideBanners";

const SideBanners = React.memo(() => {
  const bannerImages = useMemo(
    () => [SideBanner1, SideBanner2, SideBanner3, SideBanner4],
    []
  );
  return (
    <SideBannerBox>
      {bannerImages.map((image, index) => (
        <SideBannerImage key={index} src={image} alt={`banner-${index}`} />
      ))}
    </SideBannerBox>
  );
});

export default SideBanners;
