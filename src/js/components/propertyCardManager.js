import { client } from "../utils/contentfulApi";

export default class PropertyCard {
  constructor() {}

  async _fetchEntries(skipNum, limitNum, orderby) {
    const entries = await client.getEntries({
      skip: skipNum,
      limit: limitNum,
      content_type: "property",
      order: orderby,
    });

    if (!entries) {
      return;
    }

    const propertyData = entries;
    return propertyData;
  }

  _renderProperties(data) {
    if (!data) {
      return;
    }

    const render = data.items
      .map((property) => {
        const { title, thumbnail, status, price, city, country, slug } =
          property.fields;

        return `<div class="properties-card">
              ${this._generateMarkup(
                title,
                thumbnail,
                status,
                price,
                city,
                country,
                slug
              )}</div>`;
      })
      .join("");

    return render;
  }

  _generateMarkup(title, thumbnail, status, price, city, country, slug) {
    const markup = `

    <a href="../../pages/property-view.html?slug=${slug}" class="property-item-link">

    <div class="property-card-top">
      
    <img
        src="${thumbnail?.fields.file.url}"
        alt="${thumbnail?.fields.description}"
        class="property-card-img"
      />

        <span class="status-tag">${status}</span>
    </div>

        <div class="property-card-bottom">
            <div class="property-card-data flex justify-between gap-3 py-2">
                <p class="property-name font-body text-stone-950 text-xl">${title}</p>
                <p class="property-price text-stone-950">${price}</p>
        </div>

        <div class="property-location text-stone-800 text-sm">${city}, ${country}</div>
    </div>

    </a>`;

    return markup;
  }
}
