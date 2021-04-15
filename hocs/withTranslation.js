import useTranslation from "hooks/useTranslation";

const withTranslation = (namespace) => (PageComponent) => {
  const WithInjectedStores = (props) => {
    const { locale, t } = useTranslation(namespace); // eslint-disable-line id-length

    return (
      <PageComponent {...props} locale={locale} t={t} />
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== "production") {
    const displayName = PageComponent.displayName || PageComponent.name || "Component";
    WithInjectedStores.displayName = `withInjectedStores(${displayName})`;
  }

  return WithInjectedStores;
};

export default withTranslation;
