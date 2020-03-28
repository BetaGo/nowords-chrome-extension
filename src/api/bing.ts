import cheerio from "cheerio";

import { simpleFetch } from "../common/fetch";
import { urlRegExp } from "../common/utils";
import { Word } from "./word";

export const bingTranslate = async (text: string): Promise<Word> => {
  const res = await simpleFetch<string>(
    "https://cn.bing.com/dict/search?q=" + encodeURIComponent(text),
    {
      resType: "text",
      credentials: "omit"
    }
  );
  return bingPageParse(res);
};

export const bingPageParse = (html: string): Word => {
  let $ = cheerio.load(html);
  const wordText = $("#headword").text();
  let word = new Word(wordText);

  const usPhoneticText = $(".hd_prUS")
    .text()
    .split(/\s/)[1]
    ?.replace("[", "")
    .replace("]", "")
    .trim();

  const enPhoneticText = $(".hd_pr")
    .text()
    .split(/\s/)[1]
    ?.replace("[", "")
    .replace("]", "")
    .trim();

  let usPhoneticMediaUrl: string | undefined;
  let enPhoneticMediaUrl: string | undefined;

  $(".hd_tf > .bigaud").each((index, element) => {
    let onClickAttr = $(element).attr("onclick") || "";
    let mediaUrl = urlRegExp.exec(onClickAttr)?.[0];
    if (index === 0) {
      usPhoneticMediaUrl = mediaUrl;
    }
    if (index === 1) {
      enPhoneticMediaUrl = mediaUrl;
    }
  });

  if (usPhoneticText || usPhoneticMediaUrl) {
    word.phonetic.us = {
      text: usPhoneticText,
      mediaUrl: usPhoneticMediaUrl
    };
  }
  if (enPhoneticText || enPhoneticMediaUrl) {
    word.phonetic.en = {
      text: enPhoneticText,
      mediaUrl: enPhoneticMediaUrl
    };
  }

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
