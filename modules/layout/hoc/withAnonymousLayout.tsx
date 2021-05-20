import { AnonymousLayout } from '../components/AnonymousLayout';

const withAnonymousLayout = (WrappedComponent) => {
  const WithAnonymousLayout = () => (
    <AnonymousLayout>
      <WrappedComponent />
    </AnonymousLayout>
  );

  WithAnonymousLayout.displayName = `WithAnonymousLayout(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return WithAnonymousLayout;
};

export default withAnonymousLayout;
