import { client } from "../utils/contentfulApi";

export default class BlogCardManager {
  constructor() {}

  async _fetchEntries(skipNum, limitNum, orderby) {
    const entries = await client.getEntries({
      skip: skipNum,
      limit: limitNum,
      content_type: "blogPost",
      order: orderby,
    });

    if (!entries) {
      return;
    }

    const blogData = entries;
    return blogData;
  }

  _renderBlogCard(data) {
    if (!data) {
      return;
    }

    const render = data.items
      .map((post) => {
        const { title, featuredImage, publishedDate, tags, slug } = post.fields;

        return `<div class='blog-card'>
              ${this._generateMarkup(
                title,
                featuredImage,
                publishedDate,
                tags,
                slug
              )}
              </div>`;
      })
      .join("");

    return render;
  }

  _generateMarkup(title, featuredImage, publishedDate, tags, slug) {
    const markup = `

    <a href="../../pages/blog-view.html?slug=${slug}" class="blog-link bg-white p-5 flex flex-col rounded-xl gap-3">
        <div class="blog-top rounded-md">
            <img
            src="${featuredImage?.fields.file.url}"
            alt="${featuredImage?.fields.description}" 
            class="rounded-md" />
        </div>

        <div class="blog-bottom">
            <h4 class="blog-heading font-heading text-xl">
                ${title}
            </h4>

        <div class="blog-info flex items-center gap-5 my-3 text-stone-600 text-sm">

            <p class="block">${tags}</p>
                <hr class="sepration-line" />
            <p class="blog-date">${this._convertBlogpostDate(publishedDate)}</p>

      </div>
    </div>

    <button class="blog-read-more w-max uppercase font-heading text-sm text-stone-800">
      <i class="fa-solid fa-arrow-right-long mr-3"></i> Read More </button>

    </a>`;

    return markup;
  }

  _convertBlogpostDate(publishedDate) {
    const date = new Date(publishedDate);

    return date.toDateString().split(" ").slice(1).join(" ");
  }
}
