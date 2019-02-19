import * as React from "react";
import { Promotion } from "./Promotion.d";
import { Card, CardContent, CardImage, CardActions } from "src/components/Card";
import { Text } from "src/components/Typography";
import { Button } from "src/components/Button";

interface Props {
  promo: Promotion;
}
const PromotionCard: React.SFC<Props> = ({
  promo: { frontmatter, fields },
}) => {
  console.log(frontmatter.image);
  return (
    <Card w={1} shadow={1} radius={2}>
      <CardImage height="auto" image={frontmatter.image} />
      <CardContent>
        <Text is="h2" my={2} color="text.dark">
          {frontmatter.title}
        </Text>
        <Text color="text.dark">{frontmatter.subtitle}</Text>
      </CardContent>
      <CardActions>
        <Button to={fields.slug} variant="primary" outlined>
          More Info
        </Button>
      </CardActions>
    </Card>
  );
};

export { PromotionCard };
