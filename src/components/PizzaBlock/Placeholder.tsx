// import React from 'react';
// import ContentLoader from 'react-content-loader';

// const Placeholder = (props) => {
//   <ContentLoader
//     speed={2}
//     width={280}
//     height={466}
//     viewBox="0 0 280 466"
//     backgroundColor="#f3f3f3"
//     foregroundColor="#ecebeb"
//     {...props}>

//   </ContentLoader>;
// };

// export default Placeholder;

import React from 'react';
import ContentLoader from 'react-content-loader';

const Placeholder = (props: {}) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={480}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="134" cy="136" r="125" />
    <rect x="0" y="279" rx="10" ry="10" width="280" height="23" />
    <rect x="0" y="320" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="427" rx="10" ry="10" width="95" height="30" />
    <rect x="125" y="420" rx="10" ry="10" width="152" height="45" />
  </ContentLoader>
);

export default Placeholder;
