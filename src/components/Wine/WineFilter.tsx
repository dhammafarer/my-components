import * as React from "react";
import { styled, Flex, Card, Box, Text } from "primithemes";
import { FormattedMessage } from "react-intl";
import { wineKinds } from "./wineMessages";
import { contains } from "ramda";
import { ExpandMore } from "styled-icons/material/ExpandMore";
import { Search } from "styled-icons/material/Search";
import { CheckBox } from "styled-icons/material/CheckBox";
import { CheckBoxOutlineBlank } from "styled-icons/material/CheckBoxOutlineBlank";
import { FilterList } from "styled-icons/material/FilterList";

interface Props {
  toggleFilter(): void;
  handleChange(e: any): void;
  handleCheckbox(f: string, e: any): void;
  showFilter: boolean;
  search: string;
  kinds: string[];
  selectedKinds: string[];
  selectedWineries: string[];
  wineries: string[];
}

const TitleBar = styled(Flex)`
  cursor: pointer;
  color: ${props => props.theme.colors.text.dark};
  justify-content: space-between;
  ${props => props.theme.devices[2]} {
    cursor: auto;
  }
`;

const FilterIcon = styled(FilterList)`
  flex-shrink: 0;
  margin-right: ${props => props.theme.sizes[2]};
`;

const SearchIcon = styled(Search)`
  flex-shrink: 0;
  position: absolute;
  top: 10px;
  left: 18px;
`;

const Checked = styled(CheckBox)`
  color: ${props => props.theme.colors.text.dark};
  flex-shrink: 0;
`;

const UnChecked = styled(CheckBoxOutlineBlank)`
  color: ${props => props.theme.colors.text.main};
  flex-shrink: 0;
`;

const Showable: React.SFC<{ show: boolean; className?: string }> = ({
  children,
  className,
}) => <div className={className}>{children}</div>;

const Expand = styled(Showable)`
  flex-shrink: 0;
  transform: ${props => (props.show ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 400ms ease-out;
  ${props => props.theme.devices[2]} {
    display: none;
  }
`;

const Label = styled.label`
  cursor: pointer;
`;

const Filters = styled(Showable)<{ show: boolean }>`
  max-height: ${props => (props.show ? "500px" : "0px")};
  transition: all 400ms ease-out;
  ${props => props.theme.devices[2]} {
    max-height: 500px;
  }
`;

const SearchInput = styled.input`
  appearance: none;
  flex-grow: 1;
  border: none;
  background: transparent;
  font-family: ${props => props.theme.fonts.sans};
  padding: ${props => props.theme.sizes[2]};
  padding-left: ${props => props.theme.sizes[4]};
  border-bottom: ${props => props.theme.borders[1]};
  border-color: ${props => props.theme.colors.divider.main};
  transition: all 400ms ease-out;
  &:focus {
    border-color: ${props => props.theme.colors.secondary.main};
    outline: transparent;
  }
`;

const Checkbox = styled.input`
  height: 0;
  width: 0;
`;

const WineFilter: React.SFC<Props> = props => (
  <Card
    shadow={[1, 1, 0]}
    bg={["background.light", "background.light", "transparent"]}
    w={1}
    radius={2}
  >
    <TitleBar my={2} px={3} onClick={props.toggleFilter}>
      <Flex>
        <FilterIcon color="inherit" size={20} />
        <Text is="h4" style={{ flexGrow: 1 }}>
          Filter Tools
        </Text>
      </Flex>
      <Expand show={props.showFilter}>
        <ExpandMore color="inherit" size={20} />
      </Expand>
    </TitleBar>
    <Filters show={props.showFilter}>
      <Flex
        w={1}
        px={3}
        mt={2}
        alignItems="center"
        style={{ position: "relative" }}
      >
        <SearchIcon style={{ flexShrink: 0 }} size={18} />
        <SearchInput
          type="text"
          value={props.search}
          placeholder="Search wines..."
          onChange={props.handleChange}
          name="search"
        />
      </Flex>
      <Flex flexDirection={["column", "row", "column"]}>
        <Box p={3} w={[1, 1 / 2, 1]}>
          <Text my={2} fontWeight={5}>
            Wines
          </Text>
          {props.kinds.map(x => (
            <Box key={x}>
              <Label>
                <Flex my={2}>
                  <Checkbox
                    type="checkbox"
                    name={x}
                    checked={props.selectedKinds.indexOf(x) > -1}
                    onChange={e => props.handleCheckbox("kinds", e)}
                  />
                  {contains(x, props.selectedKinds) ? (
                    <Checked size={18} />
                  ) : (
                    <UnChecked size={18} />
                  )}
                  <Text
                    color={
                      contains(x, props.selectedKinds)
                        ? "text.dark"
                        : "text.light"
                    }
                    ml={2}
                  >
                    <FormattedMessage {...wineKinds[x]} />
                  </Text>
                </Flex>
              </Label>
            </Box>
          ))}
        </Box>
        <Box p={3} w={[1, 1 / 2, 1]}>
          <Text my={2} fontWeight={5}>
            Wineries
          </Text>
          {props.wineries.map(w => (
            <Label key={w}>
              <Flex my={2}>
                <Checkbox
                  type="checkbox"
                  name={w}
                  checked={props.selectedWineries.indexOf(w) > -1}
                  onChange={e => props.handleCheckbox("wineries", e)}
                />
                {contains(w, props.selectedWineries) ? (
                  <Checked size={18} />
                ) : (
                  <UnChecked size={18} />
                )}
                <Text
                  color={
                    contains(w, props.selectedWineries)
                      ? "text.dark"
                      : "text.light"
                  }
                  ml={2}
                >
                  {w}
                </Text>
              </Flex>
            </Label>
          ))}
        </Box>
      </Flex>
    </Filters>
  </Card>
);

export { WineFilter };
