const isSSR = typeof window === 'undefined';
const sr = isSSR ? null : require('scrollreveal').default();

export default sr;
