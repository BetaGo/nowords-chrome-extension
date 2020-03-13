import React from 'react';

import { Word } from '../../api/word';

const TransContent: React.FC<{ word: Word }> = ({ word }) => {
  return (
    <div>
      <div>{word.text}</div>
      <div>
        {word.phonetic.en && (
          <div>
            <span>EN:</span>
            <span>【{word.phonetic.en.text}】</span>
          </div>
        )}
        {word.phonetic.us && (
          <div>
            <span>US:</span>
            <span>【{word.phonetic.us.text}】</span>
          </div>
        )}
      </div>
      <div>
        {word.means.map(v => (
          <div>
            <span>{v.label}</span>
            <span>{v.content.join("；")}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransContent;
