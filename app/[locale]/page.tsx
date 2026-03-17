import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <>
      <section>
        <span>{t("title")}</span>
      </section>
    </>
  );
}
