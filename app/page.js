'use client';

import { useState } from 'react';

// Helper function to format large numbers
const formatNumber = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num;
};

// Icon Components
const DownloadIcon = ({ className = 'h-4 w-4 sm:h-5 sm:w-5 mr-2' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const VideoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm14 0H4v8h12V6zM6 8a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1V9a1 1 0 00-1-1H6zm6 0a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1V9a1 1 0 00-1-1h-2z" />
    </svg>
);

const MusicIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V4a1 1 0 00-.804-.98zM7 17a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
);

const ImageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10zM6 8a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1V9a1 1 0 00-1-1H6zm6 0a1 1 0 00-1 1v2a1 1 0 001-1h2a1 1 0 001-1V9a1 1 0 00-1-1h-2z" clipRule="evenodd" />
    </svg>
);

const PlayIcon = () => (
    <svg className="w-6 h-6 mr-3 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

const LikeIcon = () => (
    <svg className="w-6 h-6 mr-3 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);

const CommentIcon = () => (
    <svg className="w-6 h-6 mr-3 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
    </svg>
);

const ShareIcon = () => (
    <svg className="w-6 h-6 mr-3 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
    </svg>
);

// StatCard component for displaying individual statistics
const StatCard = ({ icon, label, value }) => (
    <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
        {icon}
        <div>
            <p className="font-bold text-sm sm:text-base">{formatNumber(value)}</p>
            <p className="text-xs text-gray-400">{label}</p>
        </div>
    </div>
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
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-2">
      <div className="w-full max-w-3xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              TikTok Downloader
            </span>
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-400">
            Download TikTok videos and images without watermarks, for free.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8 sm:mb-12">
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste TikTok URL here..."
              className="w-full p-3 pr-20 sm:p-4 sm:pr-28 rounded-full bg-gray-800 border-2 border-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-sm sm:text-base"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute top-1/2 right-1.5 sm:right-2 -translate-y-1/2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white text-sm font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100"
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
          <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg text-center animate-fade-in">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-3 sm:p-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <img src={result.author.avatar} alt={result.author.nickname} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-gray-700" />
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold">{result.author.nickname}</h2>
                <p className="text-gray-400 text-sm sm:text-base">@{result.author.username}</p>
                <p className="mt-2 text-gray-300 max-w-prose break-words text-sm sm:text-base">
                    {result.video?.desc || result.image?.desc}
                </p>
              </div>
            </div>

            <div className="my-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <StatCard icon={<PlayIcon />} label="Plays" value={result.statistics.play_count} />
                    <StatCard icon={<LikeIcon />} label="Likes" value={result.statistics.digg_count} />
                    <StatCard icon={<CommentIcon />} label="Comments" value={result.statistics.comment_count} />
                    <StatCard icon={<ShareIcon />} label="Shares" value={result.statistics.share_count} />
                    <StatCard icon={<DownloadIcon className="w-6 h-6 mr-3 text-purple-400" />} label="Downloads" value={result.statistics.download_count} />
                </div>
            </div>

            {result.video && (
              <div className="mb-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center"><VideoIcon /> Video</h3>
                <video controls src={result.video.download_url} className="w-full rounded-lg mb-3" poster={result.video.cover}></video>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a href={`/api/download-proxy?url=${encodeURIComponent(result.video.download_url)}&fileName=${result.video.id}&type=video`} className="flex items-center justify-center p-3 sm:p-4 text-center rounded-lg bg-green-600/80 hover:bg-green-600 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                        <DownloadIcon /> Download (No WM)
                    </a>
                    <a href={`/api/download-proxy?url=${encodeURIComponent(result.video.download_url_wm)}&fileName=${result.video.id}_wm&type=video`} className="flex items-center justify-center p-3 sm:p-4 text-center rounded-lg bg-yellow-600/80 hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                        <DownloadIcon /> Download (WM)
                    </a>
                </div>
              </div>
            )}

            {result.image && (
              <div className="mb-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center"><ImageIcon /> Images</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
                  {result.image.image_url.map((imgUrl, index) => (
                    <a key={index} href={imgUrl} target="_blank" rel="noopener noreferrer" className="group">
                      <img src={imgUrl} alt={`Image ${index + 1}`} className="w-full h-auto rounded-lg transition-transform duration-300 group-hover:scale-105" />
                    </a>
                  ))}
                </div>
                <a href={`/api/download-images?urls=${encodeURIComponent(JSON.stringify(result.image.image_url))}`} className="flex items-center justify-center p-3 sm:p-4 text-center rounded-lg bg-green-600/80 hover:bg-green-600 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                    <DownloadIcon /> Download All Images (ZIP)
                </a>
              </div>
            )}
            
            {result.music && (
                <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center"><MusicIcon /> Music</h3>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/50">
                        <img src={result.music.cover} alt={result.music.title} className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg" />
                        <div className="flex-grow">
                            <p className="font-bold text-sm sm:text-base">{result.music.title}</p>
                            <p className="text-xs sm:text-sm text-gray-400">{result.music.author}</p>
                        </div>
                        <a href={`/api/download-proxy?url=${encodeURIComponent(result.music.url)}&fileName=${result.music.id}&type=music`} className="flex items-center justify-center p-2 sm:p-3 text-center rounded-lg bg-purple-600/80 hover:bg-purple-600 transition-all duration-300 transform hover:scale-105">
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
