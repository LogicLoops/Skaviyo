const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ==================== GET ALL VENDOR REVIEWS ====================
exports.getVendorReviews = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "VENDOR") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Vendor access required",
      });
    }

    const vendorId = req.user.id;

    // Get vendor
    const vendor = await prisma.vendors.findUnique({
      where: { user_id: vendorId },
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const rating = req.query.rating;
    const status = req.query.status;

    // Build WHERE clause - get reviews for products from this vendor
    const whereClause = {
      AND: [
        {
          product: {
            vendor_id: vendor.id,
          },
        },
        search
          ? {
              OR: [
                {
                  reviewer: {
                    name: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  product: {
                    name: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  comment: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {},
        rating ? { rating: parseInt(rating) } : {},
        status ? { status: status.toUpperCase() } : {},
      ].filter((clause) => Object.keys(clause).length > 0),
    };

    const skip = (page - 1) * limit;

    // Get reviews - Note: Reviews model not yet in schema
    // TODO: Implement reviews model in Prisma schema
    const mockReviews = [];
    const total = 0;

    // Format response (currently returning empty as reviews model not implemented)
    const formattedReviews = mockReviews.map((review) => ({
      id: String(review.id),
      customerName: review.customerName || "Customer",
      customerEmail: review.customerEmail || "customer@example.com",
      customerId: String(review.customerId || 0),
      productName: review.productName || "Product",
      productId: String(review.productId || 0),
      rating: review.rating || 5,
      comment: review.comment || "Great product!",
      status: review.status || "published",
      helpful: review.helpful || 0,
      unhelpful: review.unhelpful || 0,
      replied: review.replied || false,
      vendorReply: review.vendorReply || null,
      createdAt: review.createdAt || new Date().toISOString(),
      updatedAt: review.updatedAt || new Date().toISOString(),
    }));

    res.status(200).json({
      success: true,
      message: "Reviews retrieved successfully",
      data: formattedReviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching vendor reviews:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== GET REVIEW BY ID ====================
exports.getVendorReviewById = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "VENDOR") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Vendor access required",
      });
    }

    const vendorId = req.user.id;
    const reviewId = parseInt(req.params.id);

    // Get vendor
    const vendor = await prisma.vendors.findUnique({
      where: { user_id: vendorId },
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    const review = await prisma.reviews.findUnique({
      where: { id: reviewId },
      include: {
        product: true,
        reviewer: true,
      },
    });

    if (!review || review.product.vendor_id !== vendor.id) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review retrieved successfully",
      data: review,
    });
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== REPLY TO REVIEW ====================
exports.replyToReview = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "VENDOR") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Vendor access required",
      });
    }

    const vendorId = req.user.id;
    const reviewId = parseInt(req.params.id);
    const { reply } = req.body;

    if (!reply || !reply.trim()) {
      return res.status(400).json({
        success: false,
        message: "Reply text is required",
      });
    }

    // Get vendor
    const vendor = await prisma.vendors.findUnique({
      where: { user_id: vendorId },
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    const review = await prisma.reviews.findUnique({
      where: { id: reviewId },
      include: { product: true },
    });

    if (!review || review.product.vendor_id !== vendor.id) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Update review with vendor reply
    const updatedReview = await prisma.reviews.update({
      where: { id: reviewId },
      data: {
        vendor_reply: reply,
        vendor_reply_date: new Date(),
      },
      include: {
        reviewer: true,
        product: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Reply added successfully",
      data: updatedReview,
    });
  } catch (error) {
    console.error("Error replying to review:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== UPDATE REVIEW STATUS ====================
exports.updateReviewStatus = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "VENDOR") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Vendor access required",
      });
    }

    const vendorId = req.user.id;
    const reviewId = parseInt(req.params.id);
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const validStatuses = ["PUBLISHED", "PENDING", "ARCHIVED"];
    if (!validStatuses.includes(status.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    // Get vendor
    const vendor = await prisma.vendors.findUnique({
      where: { user_id: vendorId },
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    const review = await prisma.reviews.findUnique({
      where: { id: reviewId },
      include: { product: true },
    });

    if (!review || review.product.vendor_id !== vendor.id) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Update status
    const updatedReview = await prisma.reviews.update({
      where: { id: reviewId },
      data: {
        status: status.toUpperCase(),
      },
      include: {
        reviewer: true,
        product: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Review status updated successfully",
      data: updatedReview,
    });
  } catch (error) {
    console.error("Error updating review status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== GET REVIEW STATS ====================
exports.getVendorReviewStats = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "VENDOR") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Vendor access required",
      });
    }

    const vendorId = req.user.id;

    // Get vendor
    const vendor = await prisma.vendors.findUnique({
      where: { user_id: vendorId },
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    const reviews = await prisma.reviews.findMany({
      where: {
        product: {
          vendor_id: vendor.id,
        },
      },
    });

    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
        : 0;

    const publishedCount = reviews.filter((r) => r.status === "PUBLISHED").length;
    const pendingCount = reviews.filter((r) => r.status === "PENDING").length;
    const repliedCount = reviews.filter((r) => r.vendor_reply).length;
    const responseRate = totalReviews > 0 ? Math.round((repliedCount / totalReviews) * 100) : 0;

    const ratingDistribution = {
      5: reviews.filter((r) => r.rating === 5).length,
      4: reviews.filter((r) => r.rating === 4).length,
      3: reviews.filter((r) => r.rating === 3).length,
      2: reviews.filter((r) => r.rating === 2).length,
      1: reviews.filter((r) => r.rating === 1).length,
    };

    res.status(200).json({
      success: true,
      message: "Review stats retrieved successfully",
      data: {
        totalReviews,
        averageRating: parseFloat(averageRating),
        publishedReviews: publishedCount,
        pendingReviews: pendingCount,
        repliedReviews: repliedCount,
        responseRate,
        ratingDistribution,
      },
    });
  } catch (error) {
    console.error("Error fetching review stats:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
