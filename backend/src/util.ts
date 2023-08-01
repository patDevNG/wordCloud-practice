import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import axios from "axios";
import parser from "fast-xml-parser";
import natural from "natural";


export async function renderFile() {
  return await marked(
    await readFile(
      fileURLToPath(new URL("../../CHALLENGE.md", import.meta.url)),
      "utf8"
    ),
    { async: true }
  );
}

export async function getFeedData(): Promise<Record<string, number>> {
  const url = process.env.FEEDS_URL;
  const response = await axios.get(url!);

  const contentType = response.headers["content-type"];
  if (!contentType || !contentType.includes("xml")) {
    throw new Error("Invalid content type");
  }
  const feedData = response.data;
  const parserOptions = new parser.XMLParser();
  const parsedData = parserOptions.parse(feedData);
  if(!parsedData.rss || !parsedData.rss.channel || !parsedData.rss.channel.item){
    throw new Error("Response does not have the correct structure for RSS feed");
  }
  const feedItems = parsedData.rss.channel.item;
  let feedText = "";
  for (const item of feedItems) {
    feedText += `${item.title} ${item.description} `;
  }
 return getWordFrequency(feedText);

}

export function getWordFrequency(text: string): Record<string, number> {
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text);
  const frequency = new natural.TfIdf();
  if(tokens){
    frequency.addDocument(tokens);
  }
  let wordFreq: { [key: string]: number } = {};
  frequency.listTerms(0).forEach((item) => {
    wordFreq[item.term] = item.tfidf;
  });
  return wordFreq;
}
