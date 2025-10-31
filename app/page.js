'use client';

import { useState } from 'react';

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const VideoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm14 0H4v8h12V6zM6 8a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1V9a1 1 0 00-1-1H6zm6 0a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1V9a1 1 0 00-1-1h-2z" />
    </svg>
);

const MusicIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V4a1 1 0 00-.804-.98zM7 17a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
);

const ImageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10zM6 8a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1V9a1 1 0 00-1-1H6zm6 0a1 1 0 00-1 1v2a1 1 0 001-1h2a1 1 0 001-1V9a1 1 0 00-1-1h-2z" clipRule="evenodd" />
    </svg>
);


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
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              TikTok Downloader
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Download TikTok videos and images without watermarks, for free.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-12">
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste TikTok URL here..."
              className="w-full p-5 pr-28 rounded-full bg-gray-800 border-2 border-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-lg"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Download'
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center animate-fade-in">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sm:p-8 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
              <img src={result.author.avatar} alt={result.author.nickname} className="w-24 h-24 rounded-full border-4 border-gray-700" />
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold">{result.author.nickname}</h2>
                <p className="text-gray-400">@{result.author.username}</p>
                <p className="mt-2 text-gray-300 max-w-prose">
                    {result.video?.desc || result.image?.desc}
                </p>
              </div>
            </div>

            {result.video && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center"><VideoIcon /> Video</h3>
                <video controls src={result.video.download_url} className="w-full rounded-lg mb-4" poster={result.video.cover}></video>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href={result.video.download_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 text-center rounded-lg bg-green-600/80 hover:bg-green-600 transition-all duration-300 transform hover:scale-105">
                        <DownloadIcon /> Download (No WM)
                    </a>
                    <a href={result.video.download_url_wm} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 text-center rounded-lg bg-yellow-600/80 hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105">
                        <DownloadIcon /> Download (WM)
                    </a>
                </div>
              </div>
            )}

            {result.image && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center"><ImageIcon /> Images</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                  {result.image.image_url.map((imgUrl, index) => (
                    <a key={index} href={imgUrl} target="_blank" rel="noopener noreferrer" className="group">
                      <img src={imgUrl} alt={`Image ${index + 1}`} className="w-full h-auto rounded-lg transition-transform duration-300 group-hover:scale-105" />
                    </a>
                  ))}
                </div>
                <a href={`/api/download-images?urls=${encodeURIComponent(JSON.stringify(result.image.image_url))}`} className="flex items-center justify-center p-4 text-center rounded-lg bg-green-600/80 hover:bg-green-600 transition-all duration-300 transform hover:scale-105">
                    <DownloadIcon /> Download All Images (ZIP)
                </a>
              </div>
            )}
            
            {result.music && (
                <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center"><MusicIcon /> Music</h3>
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-700/50">
                        <img src={result.music.cover} alt={result.music.title} className="w-16 h-16 rounded-lg" />
                        <div className="flex-grow">
                            <p className="font-bold">{result.music.title}</p>
                            <p className="text-sm text-gray-400">{result.music.author}</p>
                        </div>
                        <a href={result.music.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 text-center rounded-lg bg-purple-600/80 hover:bg-purple-600 transition-all duration-300 transform hover:scale-105">
                            <DownloadIcon />
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
