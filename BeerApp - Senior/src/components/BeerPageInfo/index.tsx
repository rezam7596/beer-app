import React from "react";
import { Beer } from "../../types";
import styles from "./BeerPageInfo.module.css";
import Map from "../Map";
import countryIcon from "./country-icon.png";
import addressIcon from "./address-icon.png";
import phoneIcon from "./phone-icon.png";
import websiteIcon from "./website-icon.png";
import { getUrlDomain } from "../../utils";

interface Props {
  beer: Beer;
}
const BeerPageInfo = ({ beer }: Props) => {
  return (
    <section className={styles.container}>
      <div className={styles.map}>
        <Map location={{lat: beer.latitude, lng: beer.longitude}}/>
      </div>
      <div className={styles.texts}>
        <div className={`${styles.infoRow} ${styles.typeInfo} ${!beer.brewery_type ? styles.hidden : ''}`}>
          <h2>Type</h2>
          <p>{beer.brewery_type}</p>
        </div>
        <div className={`${styles.infoRow} ${!getProvince() && !beer.country ? styles.hidden : ''}`}>
          <img alt="state or province" src={countryIcon}/>
          <p>{getProvince()}, {beer.country}</p>
        </div>
        <div className={`${styles.infoRow} ${!beer.address_1 && !beer.postal_code ? styles.hidden : ''}`}>
          <img alt="address" src={addressIcon}/>
          <p>{beer.address_1} ({beer.postal_code})</p>
        </div>
        <div className={`${styles.infoRow} ${styles.phoneInfo} ${!beer.phone ? styles.hidden : ''}`}>
          <img alt="phone" src={phoneIcon}/>
          <p><a href={`tel:${beer.phone}`}>{beer.phone}</a></p>
        </div>
        <div className={`${styles.infoRow} ${!beer.website_url ? styles.hidden : ''}`}>
          <img alt="website" src={websiteIcon}/>
          <p><a target="_blank" rel="noreferrer" href={beer.website_url}>{getUrlDomain(beer.website_url)}</a></p>
        </div>
      </div>
    </section>
  );

  function getProvince() {
    return beer.state_province || beer.state || beer.city;
  }
};

export default BeerPageInfo;
