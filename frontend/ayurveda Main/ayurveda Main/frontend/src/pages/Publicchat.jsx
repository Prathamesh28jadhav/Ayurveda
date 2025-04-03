import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PublicChat = () => {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");

    // ✅ Get JWT token and username from localStorage
    const token = localStorage.getItem("token");
    const loggedInUser = localStorage.getItem("username");

    // ✅ Fetch posts with JWT token
    const fetchPosts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/posts", {
                headers: { Authorization: `Bearer ${token}` }, // Fixed Template Literal
            });
            setPosts(res.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
            setError("Failed to fetch posts. Please try again.");
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // ✅ Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    // ✅ Create a new post with JWT authentication
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!loggedInUser || !content) return;

        const formData = new FormData();
        formData.append("username", loggedInUser);
        formData.append("content", content);
        if (image) {
            formData.append("image", image);
        }

        try {
            await axios.post("http://localhost:5000/api/posts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`, // Fixed Authorization header
                },
            });

            setContent("");
            setImage(null);
            fetchPosts();
        } catch (error) {
            console.error("Error creating post:", error);
            setError("Failed to create post. Please try again.");
        }
    };

    // ✅ Like a post with JWT token
    const handleLike = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/posts/${id}/like`, {}, {
                headers: { Authorization: `Bearer ${token}` }, // Fixed Syntax
            });
            fetchPosts();
        } catch (error) {
            console.error("Error liking post:", error);
            setError("Failed to like the post.");
        }
    };

    // ✅ Delete a post with JWT token
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/posts/${id}`, {
                headers: { Authorization: `Bearer ${token}` }, // Fixed Syntax
            });
            fetchPosts();
        } catch (error) {
            console.error("Error deleting post:", error);
            setError("Failed to delete the post.");
        }
    };

    // ✅ Add a comment with JWT token
    const handleComment = async (id) => {
        const comment = prompt("Add your comment:");
        if (comment) {
            try {
                await axios.post(
                    `http://localhost:5000/api/posts/${id}/comment`, // Fixed Template Literal
                    { username: loggedInUser, text: comment },
                    { headers: { Authorization: `Bearer ${token}` } } // Fixed Syntax
                );
                fetchPosts();
            } catch (error) {
                console.error("Error adding comment:", error);
                setError("Failed to add comment.");
            }
        }
    };

    // ✅ Format date for readability
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="bg-gray-500 min-h-screen py-12">
            <div className="max-w-6xl mx-auto grid grid-cols-12 gap-4">

                <div className="col-span-12">
                    <Link to="/home">
                        <button className="bg-gray-200 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition transform duration-500 ease-in-out hover:scale-105">
                            🔙 Back
                        </button>
                    </Link>
                </div>

                {/* ✅ Left Section: Posts */}
                <div className="col-span-7 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold mb-4">🌟 Public Chat</h2>

                    {error && (
                        <p className="text-red-500 bg-red-100 p-2 rounded-lg mb-4">
                            {error}
                        </p>
                    )}

                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post._id} className="bg-gray-50 p-4 rounded-lg mb-4 shadow-md">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-blue-500">
                                        {post.username}
                                    </h3>
                                    <span className="text-gray-500">{formatDate(post.createdAt)}</span>
                                </div>

                                <p className="mt-2">{post.content}</p>

                                {post.image && (
                                    <img
                                        src={`http://localhost:5000${post.image}`}
                                        alt="Post"
                                        className="w-full h-60 object-cover rounded-lg mt-4"
                                    />
                                )}

                                <div className="flex items-center justify-between mt-4">
                                    <button
                                        onClick={() => handleLike(post._id)}
                                        className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition"
                                    >
                                        👍 {post.likes} Likes
                                    </button>

                                    <button
                                        onClick={() => handleComment(post._id)}
                                        className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition"
                                    >
                                        💬 Comment
                                    </button>

                                    {post.username === loggedInUser && (
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
                                        >
                                            🗑 Delete
                                        </button>
                                    )}
                                </div>

                                <div className="mt-4 border-t pt-4">
                                    {post.comments.length > 0 ? (
                                        post.comments.map((c, index) => (
                                            <div key={index} className="bg-gray-200 p-2 rounded-lg mt-2">
                                                <strong>{c.username}:</strong> {c.text}
                                            </div>
                                        ))
                                    ) : (
                                        <p>No comments yet</p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No posts available.</p>
                    )}
                </div>

                {/* ✅ Right Section: Create Post */}
                <div className="col-span-5 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold mb-4">📝 Create a Post</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea
                            placeholder="What's on your mind?"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className="w-full p-3 border rounded-lg"
                        />

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-3 border rounded-lg"
                        />

                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                        >
                            🚀 Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );

};

export default PublicChat;
