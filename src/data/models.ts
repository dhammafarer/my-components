import faker from "faker";
import { Promotion } from "src/components/Promotion";
import { Wine } from "src/components/Wine";

export const replicate = <T>(fn: () => T, n: number): { node: T }[] =>
  Array(5)
    .fill("")
    .map(() => ({ node: fn() }));

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
    html: [
      `<p>${faker.lorem.paragraphs()}</p>`,
      `<p>${faker.lorem.paragraphs()}</p>`,
    ].join(""),
  };
};

export const wine = (): Wine => {
  return {
    fields: {
      slug: "/",
    },
    originalId: faker.random.uuid(),
    name: faker.commerce.productName(),
    kind: faker.random.arrayElement(["white", "red", "sparkling"]),
    year: faker.date
      .past(30)
      .getFullYear()
      .toString(),
    origin: faker.address.city(),
    eye: faker.lorem.paragraph(),
    nose: faker.lorem.paragraph(),
    mouth: faker.lorem.paragraph(),
    pairing: faker.lorem.paragraph(),
    wineId: faker.lorem.word(),
    promotions: [promo()],
    winery: {
      name: faker.company.companyName(),
      originalId: faker.random.uuid(),
      fields: {
        slug: faker.lorem.slug(),
      },
    },
    image: null,
  };
};
