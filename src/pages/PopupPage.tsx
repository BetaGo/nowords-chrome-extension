import React, { useState } from 'react';

import { SearchBox, Spinner } from 'office-ui-fabric-react';

import { bingTranslate } from '../api/translate';
import { Word } from '../api/word';
import TransContent from '../components/Translate/TransContent';

const PopupPage = () => {

  const [loading ,setLoading] = useState(false);
  const [word, setWord] = useState<Word | null>(null);

  const translate = async (text: string) => {
    setLoading(true);
    const word = await bingTranslate(text);
    setWord(word);
    setLoading(false);
  }

  return (
    <div>
      <SearchBox
        styles={{ root: { width: 260 } }}
        placeholder="Search Word"
        onSearch={translate}
      />
      {
        loading && <Spinner label="loading" />
      }
      {
        word && <TransContent word={word} />
      }
    </div>
  );
};

export default PopupPage;