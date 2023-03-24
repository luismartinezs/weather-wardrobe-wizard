import type { NextPage } from "next";

import Layout from "@/components/Layout";
import { Alert } from "@chakra-ui/react";

const Offline: NextPage = () => {
  return (
    <Layout>
      <Alert status="warning">You are offline</Alert>
    </Layout>
  );
};

export default Offline;
