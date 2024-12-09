import { client } from "../utils/contentfulApi";

export default class AgentCardManager {
  constructor() {}

  async _fetchEnries() {
    const entries = await client.getEntries({
      content_type: "agentProfile",
    });

    if (!entries) return;

    const agentData = entries;

    return agentData;
  }

  _renderAgentCards(data) {
    if (!data) {
      return;
    }

    const render = data.items
      .map((post) => {
        const { name, bio, phone, email, profilePic } = post.fields;

        return `<div class='agent-card'>
                ${this._generateMarkup(name, bio, phone, email, profilePic)}
                </div>`;
      })
      .join("");

    return render;
  }

  _generateMarkup(name, bio, phone, email, profilePic) {
    const markup = `
  <a href="" class="agent-profile-link flex flex-col">

    <div class="agent-header">
      <img
        src="${profilePic?.fields.file.url}"
        alt="${name}"
        class="agent-image"
      />
    </div>

        <div class="agent-details p-5 flex flex-col gap-5 justify-between">

            <div class="agent-info-wrap">
                <p class="agent-name font-medium text-xl text-stone-950 lg:text-2xl">
                                ${name}</p>

                <p class="text-sm text-stone-600 my-2 lg:text-base">${bio}</p>

            </div>

            <div class="agent-contact">

            <p class="flex items-center gap-3 my-3 text-sm text-stone-600 lg:text-base">
                    <i class="fa-solid fa-envelope"></i>${email}</p>

            <p class="flex items-center gap-3 mt-3 text-sm text-stone-600 lg:text-base">
                    <i class="fa-solid fa-phone"></i>${phone}</p>
            </div>
        </div>
     </a>`;
    return markup;
  }
}
