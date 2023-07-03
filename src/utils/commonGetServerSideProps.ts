import { IncomingMessage } from "http";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getServerSideProps as chakraGetServerSideProps } from "@/providers/Chakra";

export async function commonGetServerSideProps({
  locale,
  req,
}: {
  locale: string;
  req: IncomingMessage;
}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      ...(await chakraGetServerSideProps({ req })),
    },
  };
}
