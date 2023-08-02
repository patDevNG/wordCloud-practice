import { useEffect, useState } from "react";
import WordCloud from "react-wordcloud";
import "./App.css";

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [wordFreq, setWordFreq] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/process-feeds");
        const data = await response.json();
        setWordFreq(data);
      } catch (error : any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error != null) {
    console.error(error);
    return <div>Error! Check console...</div>;
  }

  const words = wordFreq.data ? Object.entries(wordFreq.data).map(([text, value]) => ({ text, value })) : [];

  return (
    <div className="App">
      {isLoading ? "Loading..." : (
        <div style={{ height: '700px', width: '100%' }}>
          <WordCloud words={words} />
        </div>
      )}
    </div>
  );
}
