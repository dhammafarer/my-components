import * as React from "react";
import { Layout } from "../components/Layout";
import { withIntl } from "../i18n/withIntl";
import { css, styled, Box, Flex, Card } from "primithemes";
import { Text } from "../components/Typography";
import { Container } from "../components/Container";
import { PageHeader } from "src/components/Page";
import { Phone } from "styled-icons/material/Phone";
import { Email } from "styled-icons/material/Email";
import { Home } from "styled-icons/material/Home";

interface ContactNode {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    district: string;
    country: string;
  };
}

const icon = css`
  flex-shrink: 0;
  border-color: ${props => props.theme.colors.divider.main};
`;

const PhoneIcon = styled(Phone)`
  ${icon}
`;

const EmailIcon = styled(Email)`
  ${icon}
`;

const AddressIcon = styled(Home)`
  ${icon}
`;

export interface Props {
  data: {
    content: {
      title: string;
    };
    settings: {
      contacts: ContactNode[];
    };
  };
}

const ContactCard = styled(Card)`
  color: ${props => props.theme.colors.text.dark};
  & p {
    margin: ${props => props.theme.sizes[1]} 0;
  }
`;

const content = {
  title: "Contact Us",
};

const contacts: ContactNode[] = [
  {
    name: "Contact 1",
    email: "example@contact.com",
    phone: "+886-1234-2531",
    address: {
      street: "Fake Road",
      district: "Main Slum",
      city: "Gotham City",
      country: "Bahamas",
    },
  },
];

const ContactPage: React.SFC<Props> = () => {
  return (
    <Layout>
      <PageHeader title={content.title} />
      <Box>
        <Container>
          <Flex flexWrap="wrap" justifyContent="center" my={3}>
            {contacts.map(c => (
              <Box w={1} p={[0, 0, 3]}>
                <ContactCard radius={[0, 0, 2]} shadow={[0, 0, 1]}>
                  <Box bg="secondary.dark" p={3}>
                    <Text is="h2" color="white.light" textAlign="center">
                      {c.name}
                    </Text>
                  </Box>
                  <Flex
                    p={3}
                    flexDirection={["column", "column", "row"]}
                    justifyContent={["center", "center", "space-around"]}
                    alignItems={"center"}
                  >
                    {c.phone && (
                      <Card my={2} p={3} flexDirection="row">
                        <PhoneIcon size={26} />
                        <Card bl={1} ml={3} pl={3} borderColor="divider.main">
                          <Text>{c.phone}</Text>
                        </Card>
                      </Card>
                    )}
                    {c.email && (
                      <Card
                        my={2}
                        p={3}
                        alignItems="center"
                        flexDirection="row"
                        justifyContent="center"
                      >
                        <EmailIcon size={26} />
                        <Card bl={1} ml={3} pl={3} borderColor="divider.main">
                          <Text>{c.email}</Text>
                        </Card>
                      </Card>
                    )}
                    {c.address && (
                      <Card
                        my={2}
                        p={3}
                        alignItems="center"
                        flexDirection="row"
                        justifyContent="center"
                      >
                        <AddressIcon size={26} />
                        <Card bl={1} ml={3} pl={3} borderColor="divider.main">
                          <Text>{c.address.street}</Text>
                          <Text>{c.address.district}</Text>
                          <Text>{c.address.city}</Text>
                          <Text>{c.address.country}</Text>
                        </Card>
                      </Card>
                    )}
                  </Flex>
                </ContactCard>
              </Box>
            ))}
          </Flex>
        </Container>
      </Box>
    </Layout>
  );
};

export default withIntl(ContactPage);
