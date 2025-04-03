import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";


const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE;


const SEARCH_QUERY = "yoga exercises"; // Change the search term if needed

const Yoga = () => {
    const [videos, setVideos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [nextPageToken, setNextPageToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch videos from YouTube API
    const fetchVideos = async (loadMore = false) => {
        setLoading(true);
        setError("");

        let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${SEARCH_QUERY}&type=video&key=${YOUTUBE_API_KEY}&maxResults=10`;

        if (loadMore && nextPageToken) {
            url += `&pageToken=${nextPageToken}`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.error) {
                setError(`API Error: ${data.error.message}`);
                setLoading(false);
                return;
            }

            if (data.items && data.items.length > 0) {
                setVideos((prevVideos) => [...prevVideos, ...data.items]); // Append new videos
                setNextPageToken(data.nextPageToken || ""); // Store next page token
            } else {
                setError("No videos found. Try changing the search term.");
            }
        } catch (err) {
            console.error("Error fetching videos:", err);
            setError("Failed to fetch videos. Check your API key.");
        }
        setLoading(false);
    };

    // Load videos on component mount
    useEffect(() => {
        fetchVideos();
    }, []);

    // Search Filter Logic
    const filteredVideos = videos.filter((video) =>
        video.snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6 md:px-20">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Yoga Sessions 🧘‍♂️
            </h2>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Search Bar */}
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search Yoga..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Display Videos */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredVideos.length > 0 ? (
                    filteredVideos.map((video, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-lg p-4 transition transform hover:scale-105"
                        >
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                {video.snippet.title}
                            </h3>
                            <ReactPlayer
                                url={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                                controls
                                width="100%"
                                height="200px"
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">No videos found.</p>
                )}
            </div>

            {/* Load More Button */}
            {nextPageToken && !loading && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => fetchVideos(true)}
                        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
                    >
                        Load More Videos
                    </button>
                </div>
            )}

            {loading && <p className="text-center text-gray-500 mt-4">Loading...</p>}
        </div>
    );
};

export default Yoga;
