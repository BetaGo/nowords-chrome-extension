import axios from "axios";
import cheerio from "cheerio";
import { Word } from "./word";
import { urlRegExp } from "../common/utils";

export const bingTranslate = async (text: string): Promise<Word> => {
  const res = await axios.get(
    "https://cn.bing.com/dict/search?q=" + encodeURIComponent(text)
  );
  return bingPageParse(text, res.data);
};

export const bingPageParse = (text: string, html: string): Word => {
  let $ = cheerio.load(html);
  let word = new Word(text);

  word.phonetic.us = {
    text: $(".hd_prUS")
      .text()
      .split(/\s/)[1]
      ?.replace("[", "")
      .replace("]", "")
      .trim()
  };
  word.phonetic.en = {
    text: $(".hd_pr")
      .text()
      .split(/\s/)[1]
      ?.replace("[", "")
      .replace("]", "")
      .trim()
  };

  $(".hd_tf > .bigaud").each((index, element) => {
    let onClickAttr = $(element).attr("onclick") || "";
    let mediaUrl = urlRegExp.exec(onClickAttr)?.[0];
    if (index === 0 && word.phonetic.us) {
      word.phonetic.us.mediaUrl = mediaUrl;
    }
    if (index === 1 && word.phonetic.en) {
      word.phonetic.en.mediaUrl = mediaUrl;
    }
  });

  $(".qdef > ul > li").each((index, element) => {
    word.means.push({
      label: $(element)
        .find(".pos")
        .text()
        .replace(/\s/g, ""),
      content: $(element)
        .find(".def")
        .text()
        .split("；")
    });
  });

  $("#colid > div").each((index, element) => {
    word.collocation.push({
      label: $(element)
        .find(".b_dictHighlight")
        .text()
        .replace(/\s/g, ""),
      content: $(element)
        .find("a")
        .toArray()
        .map(e => $(e).text())
    });
  });

  $("#antoid > div").each((index, element) => {
    word.antonym.push({
      label: $(element)
        .find(".b_dictHighlight")
        .text()
        .replace(/\s/g, ""),
      content: $(element)
        .find("a")
        .toArray()
        .map(e => $(e).text())
    });
  });

  $("#synoid > div").each((index, element) => {
    word.synonym.push({
      label: $(element)
        .find(".b_dictHighlight")
        .text()
        .replace(/\s/g, ""),
      content: $(element)
        .find("a")
        .toArray()
        .map(e => $(e).text())
    });
  });

  return word;
};

bingTranslate("hello");
