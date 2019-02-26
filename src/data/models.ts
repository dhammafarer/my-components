import faker from "faker";
import { Promotion } from "src/components/Promotion";

export const promo = (): Promotion => {
  return {
    frontmatter: {
      title: faker.commerce.productName(),
      subtitle: faker.company.catchPhrase(),
      buttonText: faker.company.catchPhrase(),
      dateStart: faker.date.future().toString(),
      dateEnd: faker.date.future().toString(),
      image: null,
      kinds: [faker.random.arrayElement(["white"])],
      wineries: [],
      wines: [],
    },
    fields: {
      slug: "/",
      lang: "en",
    },
    htmlAst: null,
    html: `"<p>${faker.lorem.paragraph()}</p>",`,
  };
};
