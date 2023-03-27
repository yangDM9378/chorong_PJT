/* eslint-disable react/no-danger */
import React from 'react';

const iframeTM = () => {
  return {
    __html: '<iframe src="/TMPM.html" width="100%" height="100%"></iframe>',
  };
};
function TMHtml() {
  return (
    <div>
      <div dangerouslySetInnerHTML={iframeTM()} />
    </div>
  );
}

export default TMHtml;
