import PropertyCard from "../../components/propertyCard";

class LatestProperties extends PropertyCard {
  constructor() {
    super();
    this._latestPropertyData();
  }

  async _latestPropertyData() {
    const latestProperties = await this._fetchEntries(0, 6, "-sys.createdAt");

    if (!latestProperties) {
      return;
    }

    this._renderLatestProperties(latestProperties);
  }

  _renderLatestProperties(data) {
    const latestPropertyContainer = document.querySelector(".properties-list");

    if (!latestPropertyContainer) {
      return;
    }

    latestPropertyContainer.innerHTML = this._renderProperties(data);
  }
}

export const latestProperties = new LatestProperties();
