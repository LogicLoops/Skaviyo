import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Search,
  Reply,
  Trash2,
  Download,
  CheckCircle,
  Loader,
  AlertCircle,
} from "lucide-react";
import Header from "../components/Header";
import vendorAPI from "../../api/services/vendorAPI";

interface Review {
  id: number;
  customerName: string;
  customerAvatar: string;
  productName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  unhelpful: number;
  status: "published" | "pending" | "archived";
  replied?: boolean;
}

const glassEffect =
  "bg-white border border-emerald-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300";

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await vendorAPI.getVendorReviews(1, 100);
        
        if (response.success && response.data) {
          const reviewsData = response.data.map((review: any) => ({
            id: review.id,
            customerName: review.customerName || "Customer",
            customerAvatar: (review.customerName || "C").charAt(0).toUpperCase(),
            productName: review.productName || "Product",
            rating: review.rating || 5,
            comment: review.comment || "",
            date: new Date(review.date || review.createdAt).toLocaleDateString(),
            helpful: review.helpful || 0,
            unhelpful: review.unhelpful || 0,
            status: review.status || "published",
            replied: review.vendorReply ? true : false,
          }));
          setReviews(reviewsData);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews");
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = filterRating === "all" || review.rating === parseInt(filterRating);
    const matchesStatus = filterStatus === "all" || review.status === filterStatus;
    return matchesSearch && matchesRating && matchesStatus;
  });

  const avgRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);
  const totalReviews = reviews.length;
  // const publishedReviews = reviews.filter((r) => r.status === "published").length;
  const pendingReviews = reviews.filter((r) => r.status === "pending").length;
  const responseRate = Math.round((reviews.filter((r) => r.replied).length / totalReviews) * 100);

  const ratingDistribution = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={interactive ? 16 : 12}
            className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  const handleReply = (reviewId: number) => {
    if (replyText.trim()) {
      setReviews(
        reviews.map((r) =>
          r.id === reviewId ? { ...r, replied: true } : r
        )
      );
      setReplyingTo(null);
      setReplyText("");
    }
  };

  const handleDelete = (reviewId: number) => {
    setReviews(reviews.filter((r) => r.id !== reviewId));
  };

  const handleExport = () => {
    const csvContent = [
      ["Customer Name", "Product", "Rating", "Date", "Status", "Comment"],
      ...reviews.map((r) => [
        r.customerName,
        r.productName,
        r.rating,
        r.date,
        r.status,
        r.comment,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reviews_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const handleLike = (reviewId: number) => {
    setReviews(
      reviews.map((r) =>
        r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
      )
    );
  };

  const handleDislike = (reviewId: number) => {
    setReviews(
      reviews.map((r) =>
        r.id === reviewId ? { ...r, unhelpful: r.unhelpful + 1 } : r
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-y-auto overflow-x-hidden hide-scrollbar">
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="p-8">
        {/* HEADER */}
        <Header
          pageTitle="Reviews"
          pageSubtitle="Manage customer reviews and ratings"
          vendorName="Vendor Manager"
          vendorRole="Vendor"
        />

        {/* LOADING STATE */}
        {loading && (
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <Loader className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600 font-semibold">Loading reviews...</p>
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* CONTENT */}
        {!loading && (
        <>
        {/* EXPORT BUTTON */}
        <div className="mb-6">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            <Download size={16} />
            Export
          </button>
        </div>

        {/* TOP SECTION - LEFT SIDEBAR AND MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
          {/* LEFT SIDEBAR - RATING OVERVIEW */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={`${glassEffect} p-6 h-fit`}
          >
            <div className="text-center mb-6">
              <p className="text-gray-600 text-xs font-semibold mb-2">AVERAGE RATING</p>
              <p className="text-5xl font-bold text-gray-900">{avgRating}</p>
              <div className="flex justify-center mt-2 mb-2">
                {renderStars(Math.round(parseFloat(avgRating)))}
              </div>
              <p className="text-xs text-gray-500">Based on {totalReviews} reviews</p>
            </div>

            {/* RATING DISTRIBUTION */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-600 w-8">{star} Star</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full transitions-all"
                      style={{
                        width: `${totalReviews > 0 ? (ratingDistribution[star as keyof typeof ratingDistribution] / totalReviews) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 font-semibold w-8 text-right">
                    {ratingDistribution[star as keyof typeof ratingDistribution]}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SECTION - KPI CARDS */}
          <div className="lg:col-span-3 space-y-6">
            {/* KPI CARDS ROW */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Total Reviews */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className={`${glassEffect} p-4`}
              >
                <p className="text-gray-600 text-xs font-semibold mb-2">Total Reviews</p>
                <p className="text-3xl font-bold text-gray-900">{totalReviews}</p>
              </motion.div>

              {/* Average Rating Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`${glassEffect} p-4`}
              >
                <p className="text-gray-600 text-xs font-semibold mb-2">Total Reviews</p>
                <p className="text-3xl font-bold text-gray-900">{totalReviews}</p>
              </motion.div>

              {/* Pending */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className={`${glassEffect} p-4`}
              >
                <p className="text-gray-600 text-xs font-semibold mb-2">Pending Reply</p>
                <p className="text-3xl font-bold text-gray-900">{pendingReviews}</p>
              </motion.div>

              {/* Response Rate */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`${glassEffect} p-4`}
              >
                <p className="text-gray-600 text-xs font-semibold mb-2">Response Rate</p>
                <p className="text-3xl font-bold text-gray-900">{responseRate}%</p>
              </motion.div>
            </div>

            {/* FILTERS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className={`${glassEffect} p-4`}
            >
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                {/* Search */}
                <div className="relative flex-1 w-full">
                  <Search
                    size={16}
                    className="absolute left-3 top-2.5 text-gray-400 pointer-events-none"
                  />
                  <input
                    type="text"
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white border border-emerald-200 rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                {/* Rating Filter */}
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  className="px-3 py-2 bg-white border border-emerald-200 rounded-lg text-sm text-gray-700 hover:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>

                {/* Status Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 bg-white border border-emerald-200 rounded-lg text-sm text-gray-700 hover:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">Sort by: Newest</option>
                  <option value="published">Published</option>
                  <option value="pending">Pending</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </motion.div>
          </div>
        </div>

        {/* REVIEWS LIST */}
        <div className="space-y-4">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.05 }}
                className={`${glassEffect} p-6`}
              >
                <div className="flex gap-4">
                  {/* AVATAR */}
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                    {review.customerAvatar}
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 min-w-0">
                    {/* HEADER ROW */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{review.customerName}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(review.rating)}
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                      </div>
                      {review.replied && (
                        <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded font-semibold flex items-center gap-1 w-fit">
                          <CheckCircle size={12} />
                          Replied
                        </span>
                      )}
                    </div>

                    {/* PRODUCT NAME */}
                    <p className="text-xs font-semibold text-gray-600 mb-2">{review.productName}</p>

                    {/* COMMENT */}
                    <p className="text-sm text-gray-700 mb-4">{review.comment}</p>

                    {/* ACTIONS */}
                    <div className="flex flex-wrap gap-3 items-center">
                      <button
                        onClick={() => handleLike(review.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 border border-emerald-200 transition-all font-semibold"
                      >
                        <ThumbsUp size={14} />
                        {review.helpful > 0 && review.helpful}
                      </button>
                      <button
                        onClick={() => handleDislike(review.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 border border-gray-200 transition-all font-semibold"
                      >
                        <ThumbsDown size={14} />
                        {review.unhelpful > 0 && review.unhelpful}
                      </button>
                      <button
                        onClick={() => setReplyingTo(replyingTo === review.id ? null : review.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 border border-blue-200 transition-all font-semibold"
                      >
                        <Reply size={14} />
                        Reply
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-50 text-red-700 rounded-lg hover:bg-red-100 border border-red-200 transition-all font-semibold"
                      >
                        <Trash2 size={14} />
                        Report
                      </button>
                    </div>

                    {/* REPLY INPUT */}
                    <AnimatePresence>
                      {replyingTo === review.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-gray-200"
                        >
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write your reply..."
                            className="w-full px-4 py-3 border border-emerald-200 rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                            rows={3}
                          />
                          <div className="flex gap-3 mt-3">
                            <button
                              onClick={() => handleReply(review.id)}
                              className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors"
                            >
                              Send Reply
                            </button>
                            <button
                              onClick={() => setReplyingTo(null)}
                              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`${glassEffect} p-12 text-center`}
            >
              <MessageCircle size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 font-semibold">No reviews found matching your filters.</p>
            </motion.div>
          )}
        </div>
        </>
        )}
      </div>
    </div>
  );
};

export default Reviews;