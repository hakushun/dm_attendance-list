import React from 'react';

type Props = {
  content: string;
};
export const StringWithUrl: React.VFC<Props> = React.memo(({ content }) => {
  const regexp = /(https?:\/\/[\x21-\x7e]+)/g;

  return (
    <>
      {content.split('\n').map((cntnt) =>
        cntnt.match(regexp) ? (
          <>
            <a href={cntnt} target="_blank" rel="noopener noreferrer">
              {cntnt}
            </a>
            <br />
          </>
        ) : (
          <>
            {cntnt}
            <br />
          </>
        ),
      )}
    </>
  );
});
