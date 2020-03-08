interface IWordMean {
  label: string;
  content: string[];
}

interface IWordAdvancedMean {
  label: string;
  content: Array<{
    mean: string;
    sample?: string;
    translatedSample?: string;
  }>;
}

interface IWordCollocation {
  label: string;
  content: string[];
}

interface IWordSynonym {
  label: string;
  content: string[];
}

interface IWordAntonym {
  label: string;
  content: string[];
}

interface IPhonetic {
  text: string;
  mediaUrl?: string;
}

export class Word {
  constructor(text: string) {
    this.text = text;
  }
  /**
   * 单词
   */
  text: string;
  /**
   * 音标
   */
  phonetic: {
    en?: IPhonetic;
    us?: IPhonetic;
  } = {};
  /**
   * 单词释义
   */
  means: IWordMean[] = [];
  /**
   * 搭配
   */
  collocation: IWordCollocation[] = [];
  /**
   * 同义词
   */
  synonym: IWordSynonym[] = [];
  /**
   * 反义词
   */
  antonym: IWordAntonym[] = [];
  /**
   * 详细释义
   */
  advancedMeans: IWordAdvancedMean[] = [];
}
