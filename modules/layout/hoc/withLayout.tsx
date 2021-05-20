import { Layout } from '../components/Layout';
import { LayoutSource } from '../constants';
import { useWidth } from '../../ui';
import { getLayoutConfig } from '../services';

const withLayout = (layoutSource: LayoutSource) => (WrappedComponent) => {
  const WithLayout = (props) => {
    const screenWidth = useWidth();
    const layoutConfig = getLayoutConfig(layoutSource, screenWidth);

    return (
      <Layout layoutConfig={layoutConfig}>
        <WrappedComponent {...props} />
      </Layout>
    );
  };

  WithLayout.displayName = `With${layoutSource}Layout(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return WithLayout;
};

export default withLayout;
