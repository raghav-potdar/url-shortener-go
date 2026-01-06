import { useState } from 'react';
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [userId, setUserId] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setCopied(false);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:9808/create-short-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          long_url: longUrl,
          user_id: userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to shorten URL');
      }

      const data = await response.json();
      setShortUrl(data.short_url);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleReset = () => {
    setLongUrl('');
    setUserId('');
    setShortUrl('');
    setError('');
    setCopied(false);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>⚡ URL Shortener</h1>
          <p>Transform long URLs into short, shareable links</p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <label htmlFor="longUrl">Long URL</label>
            <input
              id="longUrl"
              type="url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="Any URL"
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="userId">User ID</label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="RandomID"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {error && (
          <div className="alert error">
            <span>❌</span>
            <p>{error}</p>
          </div>
        )}

        {shortUrl && (
          <div className="result">
            <div className="alert success">
              <span>✅</span>
              <p>Your short URL is ready!</p>
            </div>
            <div className="url-display">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="short-url-input"
              />
              <button onClick={handleCopy} className="copy-btn">
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>
            <button onClick={handleReset} className="reset-btn">
              Create Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

