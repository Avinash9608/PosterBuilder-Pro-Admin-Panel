"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Head from "next/head";

interface Poster {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  design: {
    titleStyle: {
      color: string;
      fontFamily: string;
    };
    background: {
      color: string;
    };
  };
}

const AdminPostersPage = () => {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewingPoster, setViewingPoster] = useState<Poster | null>(null);

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const response = await axios.get(
          "https://publicityposterbackend.onrender.com/api/posterpro/admin"
        );
        setPosters(response.data.posters);
      } catch (error) {
        toast.error("Failed to load posters");
      } finally {
        setLoading(false);
      }
    };

    fetchPosters();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this poster?")) return;

    try {
      setDeletingId(id);
      await axios.delete(
        `https://publicityposterbackend.onrender.com/api/posterpro/${id}`
      );
      setPosters(posters.filter((poster) => poster._id !== id));
      toast.success("Poster deleted successfully");
    } catch (error) {
      toast.error("Failed to delete poster");
    } finally {
      setDeletingId(null);
    }
  };

  const openViewer = (poster: Poster) => {
    setViewingPoster(poster);
    document.body.style.overflow = "hidden";
  };

  const closeViewer = () => {
    setViewingPoster(null);
    document.body.style.overflow = "auto";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Poster Gallery Admin</title>
      </Head>

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Poster Gallery
          </h1>

          {posters.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <p className="text-gray-500 text-lg">No posters available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {posters.map((poster) => (
                <div
                  key={poster._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div
                    className="h-48 w-full relative cursor-pointer bg-gray-100"
                    onClick={() => openViewer(poster)}
                  >
                    <img
                      src={poster.imageUrl}
                      alt={poster.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-white font-medium transition-opacity duration-300">
                        View Full Size
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1 truncate">
                      {poster.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {poster.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {new Date(poster.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(poster._id);
                        }}
                        disabled={deletingId === poster._id}
                        className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                      >
                        {deletingId === poster._id ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin h-4 w-4 mr-1"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Deleting
                          </span>
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Viewer Modal */}
      {viewingPoster && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 transition-opacity"
              onClick={closeViewer}
            >
              <div className="absolute inset-0 bg-black opacity-90"></div>
            </div>

            {/* Modal content */}
            <div className="inline-block align-bottom rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="relative">
                <button
                  onClick={closeViewer}
                  className="absolute top-4 right-4 z-10 text-white hover:text-gray-200 focus:outline-none"
                >
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="bg-black p-2">
                  <img
                    src={viewingPoster.imageUrl}
                    alt={viewingPoster.title}
                    className="max-h-[80vh] w-auto mx-auto object-contain"
                  />
                </div>

                <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <div className="w-full text-white">
                    <h3 className="text-lg font-medium">
                      {viewingPoster.title}
                    </h3>
                    {viewingPoster.description && (
                      <p className="mt-1 text-gray-300">
                        {viewingPoster.description}
                      </p>
                    )}
                    <p className="mt-2 text-sm text-gray-400">
                      Created:{" "}
                      {new Date(viewingPoster.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPostersPage;
