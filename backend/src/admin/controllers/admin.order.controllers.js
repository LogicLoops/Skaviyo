const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ==================== GET ALL ORDERS ====================
exports.getAllOrders = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required",
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const search = req.query.search || "";
    const sortOrder = req.query.sortOrder || "newest"; // newest or oldest
    const orderStatus = req.query.orderStatus; // filter by order status
    const paymentStatus = req.query.paymentStatus; // filter by payment status

    // Build WHERE clause
    const whereClause = {
      AND: [
        search
          ? {
              OR: [
                {
                  order_number: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {},
        orderStatus
          ? {
              order_status: orderStatus,
            }
          : {},
        paymentStatus
          ? {
              payment_status: paymentStatus,
            }
          : {},
      ].filter((clause) => Object.keys(clause).length > 0),
    };

    // Handle order by
    const orderBy =
      sortOrder === "newest"
        ? { created_at: "desc" }
        : { created_at: "asc" };

    // Calculate pagination
    const skip = (page - 1) * limit;
    const limitNum = parseInt(limit);

    // Fetch orders
    const orders = await prisma.orders.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            vendor: { select: { store_name: true } },
          },
        },
        _count: {
          select: {
            items: true,
          },
        },
      },
      orderBy,
      skip,
      take: limitNum,
    });

    // Count total orders
    const total = await prisma.orders.count({
      where: whereClause,
    });

    // Format response
    const formattedOrders = orders.map((order) => ({
      id: String(order.id),
      orderNumber: order.order_number,
      customerName: order.user.name,
      customerEmail: order.user.email,
      customerId: String(order.user.id),
      totalAmount: parseFloat(order.total_amount.toString()),
      totalItems: order._count.items,
      orderStatus: order.order_status,
      paymentStatus: order.payment_status,
      createdOn: order.created_at.toISOString().split("T")[0],
      icon: "📦",
    }));

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: {
        orders: formattedOrders,
        pagination: {
          total,
          page,
          limit: limitNum,
          pages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== GET ORDER BY ID ====================
exports.getOrderById = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required",
      });
    }

    const orderId = parseInt(req.params.id);

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    const order = await prisma.orders.findUnique({
      where: {
        id: orderId,
      },
      include: {
        user: true,
        items: {
          include: {
            vendor: true,
            product_variant: {
              include: {
                product: true,
              },
            },
          },
        },
        payments: true,
        tracking: true,
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      data: {
        id: String(order.id),
        orderNumber: order.order_number,
        customerName: order.user.name,
        customerEmail: order.user.email,
        customerId: String(order.user.id),
        totalAmount: parseFloat(order.total_amount.toString()),
        orderStatus: order.order_status,
        paymentStatus: order.payment_status,
        items: order.items.map((item) => ({
          id: String(item.id),
          productName: item.product_variant?.product?.title || "N/A",
          quantity: item.quantity,
          price: parseFloat(item.price.toString()),
        })),
        createdAt: order.created_at
      }
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== UPDATE ORDER STATUS ====================
exports.updateOrderStatus = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required",
      });
    }

    const orderId = parseInt(req.params.id);
    const { order_status, payment_status } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    // Check valid statuses
    const validOrderStatuses = [
      "PENDING",
      "CONFIRMED",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
    ];
    const validPaymentStatuses = ["PENDING", "PAID", "FAILED", "REFUNDED"];

    if (
      order_status &&
      !validOrderStatuses.includes(order_status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    if (
      payment_status &&
      !validPaymentStatuses.includes(payment_status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status",
      });
    }

    // Check if order exists
    const order = await prisma.orders.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Update order
    const updatedOrder = await prisma.orders.update({
      where: { id: orderId },
      data: {
        order_status: order_status || order.order_status,
        payment_status: payment_status || order.payment_status,
      },
      include: {
        user: true,
        items: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== GET ORDERS BY STATUS ====================
exports.getOrdersByStatus = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required",
      });
    }

    const status = req.params.status;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const validStatuses = [
      "PENDING",
      "CONFIRMED",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const skip = (page - 1) * limit;

    const orders = await prisma.orders.findMany({
      where: {
        order_status: status,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            items: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
      skip,
      take: limit,
    });

    const total = await prisma.orders.count({
      where: { order_status: status },
    });

    res.status(200).json({
      success: true,
      message: `Orders with status ${status} retrieved successfully`,
      data: {
        orders,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching orders by status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== SEARCH ORDERS ====================
exports.searchOrders = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required",
      });
    }

    const query = req.query.q || "";
    const limit = parseInt(req.query.limit) || 10;

    if (!query.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const orders = await prisma.orders.findMany({
      where: {
        OR: [
          {
            order_number: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            user: {
              OR: [
                {
                  name: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
                {
                  email: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              ],
            },
          },
        ],
      },
      select: {
        id: true,
        order_number: true,
        user: {
          select: {
            name: true,
          },
        },
        total_amount: true,
        order_status: true,
      },
      take: limit,
    });

    res.status(200).json({
      success: true,
      message: "Orders found",
      data: orders,
    });
  } catch (error) {
    console.error("Error searching orders:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== GET ORDER STATISTICS ====================
exports.getOrderStats = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required",
      });
    }

    // Get total orders by status
    const statusBreakdown = await prisma.orders.groupBy({
      by: ["order_status"],
      _count: {
        id: true,
      },
    });

    // Get total orders by payment status
    const paymentBreakdown = await prisma.orders.groupBy({
      by: ["payment_status"],
      _count: {
        id: true,
      },
    });

    // Get total revenue
    const revenueData = await prisma.orders.aggregate({
      _sum: {
        total_amount: true,
      },
      where: {
        payment_status: "PAID",
      },
    });

    res.status(200).json({
      success: true,
      message: "Order statistics retrieved successfully",
      data: {
        orderStatusBreakdown: statusBreakdown,
        paymentStatusBreakdown: paymentBreakdown,
        totalRevenue: revenueData._sum.total_amount
          ? parseFloat(revenueData._sum.total_amount.toString())
          : 0,
      },
    });
  } catch (error) {
    console.error("Error fetching order stats:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
