import { Text, TextProps } from "@chakra-ui/react";

const lorem =
  "Elit exercitation nulla reprehenderit adipisicing incididunt. Culpa pariatur consequat proident aute labore amet est laboris proident. Do occaecat pariatur dolore fugiat non quis. In mollit et deserunt enim culpa sunt reprehenderit do. Anim sunt cillum ut cillum proident ullamco pariatur ea incididunt veniam laborum ad magna incididunt. Consectetur amet do aliquip dolore.\n\nAute enim amet voluptate cupidatat proident. Anim proident ut labore dolor officia excepteur cillum sunt mollit veniam. Mollit sint ex veniam magna aliqua et dolor in eiusmod est quis. Commodo non qui ea esse do consectetur voluptate non reprehenderit voluptate sunt pariatur.";

const OpaqueText = ({
  text = lorem,
  ...props
}: {
  text?: string;
} & TextProps): JSX.Element => {
  return (
    <Text {...props} userSelect="none" filter="blur(5px)">
      {text}
    </Text>
  );
};

export default OpaqueText;
