const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ==================== GET VENDOR ANALYTICS ====================
exports.getVendorAnalytics = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "VENDOR") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Vendor access required",
      });
    }

    const vendorId = req.user.id;
    const { startDate, endDate } = req.query;

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

    // Build date filter
    const dateFilter = {};
    if (startDate) dateFilter.gte = new Date(startDate);
    if (endDate) dateFilter.lte = new Date(endDate);

    // Fetch analytics data
    const orderItems = await prisma.order_items.findMany({
      where: {
        vendor_id: vendor.id,
        ...(Object.keys(dateFilter).length > 0 && { created_at: dateFilter }),
      },
      include: {
        order: true,
      },
    });

    // Calculate metrics
    const totalRevenue = orderItems.reduce((sum, item) => sum + Number(item.item_price), 0);
    const totalOrders = new Set(orderItems.map((item) => item.order_id)).size;
    const totalItems = orderItems.length;

    const statusBreakdown = {
      pending: orderItems.filter((item) => item.item_status === "PENDING").length,
      shipped: orderItems.filter((item) => item.item_status === "SHIPPED").length,
      delivered: orderItems.filter((item) => item.item_status === "DELIVERED").length,
      cancelled: orderItems.filter((item) => item.item_status === "CANCELLED").length,
    };

    // Revenue by date (last 30 days)
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const revenueByDate = {};
    orderItems
      .filter((item) => new Date(item.created_at) >= last30Days)
      .forEach((item) => {
        const date = new Date(item.created_at).toISOString().split("T")[0];
        revenueByDate[date] = (revenueByDate[date] || 0) + Number(item.item_price);
      });

    res.status(200).json({
      success: true,
      message: "Analytics retrieved successfully",
      data: {
        totalRevenue,
        totalOrders,
        totalItems,
        averageOrderValue: totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0,
        statusBreakdown,
        revenueByDate,
      },
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== GET VENDOR EARNINGS ====================
exports.getVendorEarnings = async (req, res) => {
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

    // Get all order items for this vendor
    const orderItems = await prisma.order_items.findMany({
      where: { vendor_id: vendor.id },
    });

    // Calculate earnings
    const totalRevenue = orderItems.reduce((sum, item) => sum + Number(item.item_price), 0);

    // Assume 20% commission or can be configurable
    const commissionRate = 0.2;
    const platformCommission = totalRevenue * commissionRate;
    const availableBalance = totalRevenue - platformCommission;

    // Mock pending clearance and payout date
    const pendingClearance = 0;
    const nextPayoutDate = new Date();
    nextPayoutDate.setDate(nextPayoutDate.getDate() + 7);

    res.status(200).json({
      success: true,
      message: "Earnings retrieved successfully",
      data: {
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        platformCommission: parseFloat(platformCommission.toFixed(2)),
        availableBalance: parseFloat(availableBalance.toFixed(2)),
        pendingClearance,
        nextPayoutDate: nextPayoutDate.toISOString().split("T")[0],
      },
    });
  } catch (error) {
    console.error("Error fetching earnings:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== GET TRANSACTION HISTORY ====================
exports.getTransactionHistory = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "VENDOR") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Vendor access required",
      });
    }

    const vendorId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

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

    const skip = (page - 1) * limit;

    // Get order items (transactions)
    const transactions = await prisma.order_items.findMany({
      where: { vendor_id: vendor.id },
      include: {
        order: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        product_variant: {
          include: {
            product: {
              select: {
                title: true,
              },
            },
          },
        },
      },
      skip,
      take: limit,
      orderBy: { created_at: "desc" },
    });

    // Count total
    const total = await prisma.order_items.count({
      where: { vendor_id: vendor.id },
    });

    // Format transactions
    const formattedTransactions = transactions.map((item) => ({
      id: String(item.id),
      date: new Date(item.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      txnId: `TXN-${item.id}`,
      description: `Order #${item.order.order_number} - ${item.product_variant.product.title}`,
      type: "Credit",
      amount: parseFloat(item.item_price.toString()),
      status: item.item_status,
      customerName: item.order.user.name,
    }));

    res.status(200).json({
      success: true,
      message: "Transaction history retrieved successfully",
      data: formattedTransactions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== GET REVENUE CHART DATA ====================
exports.getRevenueChartData = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "VENDOR") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Vendor access required",
      });
    }

    const vendorId = req.user.id;
    const { months = 12 } = req.query;

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

    // Get order items
    const orderItems = await prisma.order_items.findMany({
      where: { vendor_id: vendor.id },
    });

    // Generate revenue data for last N months
    const revenueData = [];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (let i = parseInt(months) - 1; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      const monthKey = `${year}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      const monthRevenue = orderItems
        .filter((item) => {
          const itemMonth = new Date(item.created_at).toISOString().substring(0, 7);
          return itemMonth === monthKey;
        })
        .reduce((sum, item) => sum + Number(item.item_price), 0);

      revenueData.push({
        month,
        revenue: parseFloat(monthRevenue.toFixed(2)),
        projected: parseFloat((monthRevenue * 1.1).toFixed(2)),
      });
    }

    res.status(200).json({
      success: true,
      message: "Revenue chart data retrieved successfully",
      data: revenueData,
    });
  } catch (error) {
    console.error("Error fetching revenue chart data:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
