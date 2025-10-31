'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('/api/tiktok', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to fetch data from the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-900 text-white">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8">TikTok Downloader</h1>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter TikTok URL"
            className="flex-grow p-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="p-4 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 transition-colors"
          >
            {loading ? 'Loading...' : 'Download'}
          </button>
        </form>

        {error && <div className="bg-red-500 text-white p-4 rounded-lg text-center">{error}</div>}

        {result && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0">
                <img src={result.author.avatar} alt={result.author.nickname} className="w-24 h-24 rounded-full" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{result.author.nickname}</h2>
                <p className="text-gray-400">@{result.author.username}</p>
                {result.video && <p className="mt-2">{result.video.desc}</p>}
                {result.image && <p className="mt-2">{result.image.desc}</p>}
              </div>
            </div>

            {result.video && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Video</h3>
                <video controls src={result.video.download_url} className="w-full rounded-lg mb-4" poster={result.video.cover}></video>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href={result.video.download_url} target="_blank" rel="noopener noreferrer" className="block p-4 text-center rounded-lg bg-green-600 hover:bg-green-700 transition-colors">
                        Download Video (No WM)
                    </a>
                    <a href={result.video.download_url_wm} target="_blank" rel="noopener noreferrer" className="block p-4 text-center rounded-lg bg-yellow-600 hover:bg-yellow-700 transition-colors">
                        Download Video (WM)
                    </a>
                </div>
              </div>
            )}

            {result.image && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Images</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {result.image.image_url.map((imgUrl, index) => (
                    <a key={index} href={imgUrl} target="_blank" rel="noopener noreferrer">
                      <img src={imgUrl} alt={`Image ${index + 1}`} className="w-full h-auto rounded-lg" />
                    </a>
                  ))}
                </div>
                 <div className="grid grid-cols-1 gap-4 mt-4">
                    <a href={`/api/download-images?urls=${encodeURIComponent(JSON.stringify(result.image.image_url))}`} className="block p-4 text-center rounded-lg bg-green-600 hover:bg-green-700 transition-colors">
                        Download All Images (ZIP)
                    </a>
                </div>
              </div>
            )}
            
            {result.music && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Music</h3>
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-700">
                        <img src={result.music.cover} alt={result.music.title} className="w-16 h-16 rounded-lg" />
                        <div className="flex-grow">
                            <p className="font-bold">{result.music.title}</p>
                            <p className="text-sm text-gray-400">{result.music.author}</p>
                        </div>
                        <a href={result.music.url} target="_blank" rel="noopener noreferrer" className="p-3 text-center rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors">
                            Download Music
                        </a>
                    </div>
                </div>
            )}

          </div>
        )}
      </div>
    </main>
  );
}
