import { DefaultLayout } from '../components/DefaultLayout';

const withDefaultLayout = (WrappedComponent) => {
  const WithDefaultLayout = () => (
    <DefaultLayout>
      <WrappedComponent />
    </DefaultLayout>
  );

  WithDefaultLayout.displayName = `WithDefaultLayout(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return WithDefaultLayout;
};

export default withDefaultLayout;
