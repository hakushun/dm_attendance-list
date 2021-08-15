import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useDispatch } from 'react-redux';
import { wrapper } from '../redux/store';
import { closeAll } from '../redux/modules/ui/show';
import { useRouter } from '../hooks/useRouter';
import { Layout } from '../components/Layout';

import '../styles/reset.scss';
import '../styles/global.scss';
import { closeAllModal } from '../redux/modules/ui/modal';

function App({ Component, pageProps }: AppProps): React.ReactElement {
  const { router } = useRouter();
  const dispatch = useDispatch();

  const handleRouteChange = () => {
    const main = document.getElementById('main');
    main?.focus();
    dispatch(closeAll());
    dispatch(closeAllModal());
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <div id="overlay" />
    </>
  );
}

export default wrapper.withRedux(App);
