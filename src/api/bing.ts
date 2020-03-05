import axios from "axios";
import cheerio from "cheerio";

export const bingTranslate = async (text: string) => {
  const res = await axios.get(
    "https://cn.bing.com/dict/search?q=" + encodeURIComponent(text)
  );
  if (res.data) {
    const d = cheerio.parseHTML(res.data);
    console.log(d);
  }
};

bingTranslate("hello");
