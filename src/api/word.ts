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
  content: string;
}

interface IWordSynonym {
  label: string;
  content: string[];
}

interface IWordAntonym {
  label: string;
  content: string[];
}

export class Word {
  /**
   * 单词
   */
  name: string;
  /**
   * 单词释义
   */
  means: IWordMean[];
  /**
   * 搭配
   */
  collocation: IWordCollocation[];
  /**
   * 同义词
   */
  synonym: IWordSynonym[];
  /**
   * 反义词
   */
  antonym: IWordAntonym[];
  /**
   * 详细释义
   */
  advancedMeans: IWordAdvancedMean[];
}
