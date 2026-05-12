const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ==================== GET ALL VENDOR ORDERS ====================
exports.getVendorOrders = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "VENDOR") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Vendor access required",
      });
    }

    const vendorId = req.user.id;

    // Get vendor details
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
    const sortOrder = req.query.sortOrder || "newest";
    const orderItemStatus = req.query.orderItemStatus;

    // Build WHERE clause for order items from this vendor
    const whereClause = {
      AND: [
        { vendor_id: vendor.id },
        search
          ? {
              OR: [
                {
                  order: {
                    order_number: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  order: {
                    user: {
                      name: {
                        contains: search,
                        mode: "insensitive",
                      },
                    },
                  },
                },
              ],
            }
          : {},
        orderItemStatus
          ? {
              item_status: orderItemStatus,
            }
          : {},
      ].filter((clause) => Object.keys(clause).length > 0),
    };

    const orderBy =
      sortOrder === "newest"
        ? { created_at: "desc" }
        : { created_at: "asc" };

    const skip = (page - 1) * limit;

    // Fetch vendor's order items
    const orderItems = await prisma.order_items.findMany({
      where: whereClause,
      include: {
        order: {
          include: {
            user: {
              select: {
                id: true,
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
                id: true,
                title: true,
              },
            },
          },
        },
      },
      orderBy,
      skip,
      take: limit,
    });

    // Count total
    const total = await prisma.order_items.count({
      where: whereClause,
    });

    // Format response
    const formattedOrders = orderItems.map((item) => ({
      id: String(item.id),
      orderId: String(item.order_id),
      orderNumber: item.order.order_number,
      customerName: item.order.user.name,
      customerEmail: item.order.user.email,
      customerId: String(item.order.user.id),
      productName: item.product_variant.product.title,
      productId: String(item.product_variant.product.id),
      quantity: item.quantity,
      itemPrice: parseFloat(item.item_price.toString()),
      itemStatus: item.item_status,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));

    res.status(200).json({
      success: true,
      message: "Vendor orders retrieved successfully",
      data: formattedOrders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching vendor orders:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== GET VENDOR ORDER BY ID ====================
exports.getVendorOrderById = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "VENDOR") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Vendor access required",
      });
    }

    const vendorId = req.user.id;
    const itemId = parseInt(req.params.id);

    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: "Order item ID is required",
      });
    }

    // Get vendor details
    const vendor = await prisma.vendors.findUnique({
      where: { user_id: vendorId },
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    // Get order item
    const orderItem = await prisma.order_items.findUnique({
      where: { id: itemId },
      include: {
        order: {
          include: {
            user: true,
          },
        },
        product: true,
      },
    });

    if (!orderItem || orderItem.vendor_id !== vendor.id) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      data: orderItem,
    });
  } catch (error) {
    console.error("Error fetching vendor order:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== UPDATE VENDOR ORDER ITEM STATUS ====================
exports.updateVendorOrderStatus = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "VENDOR") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Vendor access required",
      });
    }

    const vendorId = req.user.id;
    const itemId = parseInt(req.params.id);
    const { item_status } = req.body;

    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: "Order item ID is required",
      });
    }

    if (!item_status) {
      return res.status(400).json({
        success: false,
        message: "Order item status is required",
      });
    }

    const validStatuses = ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"];

    if (!validStatuses.includes(item_status.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: "Invalid order item status",
      });
    }

    // Get vendor details
    const vendor = await prisma.vendors.findUnique({
      where: { user_id: vendorId },
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    // Get order item
    const orderItem = await prisma.order_items.findUnique({
      where: { id: itemId },
    });

    if (!orderItem || orderItem.vendor_id !== vendor.id) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Update order item status
    const updatedOrderItem = await prisma.order_items.update({
      where: { id: itemId },
      data: {
        item_status: item_status.toUpperCase(),
      },
      include: {
        order: {
          include: {
            user: true,
          },
        },
        product: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrderItem,
    });
  } catch (error) {
    console.error("Error updating vendor order status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== GET VENDOR ORDER STATS ====================
exports.getVendorOrderStats = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "VENDOR") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Vendor access required",
      });
    }

    const vendorId = req.user.id;

    // Get vendor details
    const vendor = await prisma.vendors.findUnique({
      where: { user_id: vendorId },
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    // Get stats
    const stats = await prisma.order_items.groupBy({
      by: ["item_status"],
      where: {
        vendor_id: vendor.id,
      },
      _count: true,
      _sum: {
        item_price: true,
      },
    });

    // Format stats
    const formattedStats = {
      total: 0,
      pending: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
      totalRevenue: 0,
    };

    stats.forEach((stat) => {
      const count = stat._count;
      const revenue = parseFloat(
        stat._sum?.item_price?.toString() || "0"
      );

      formattedStats.total += count;
      formattedStats.totalRevenue += revenue;

      switch (stat.item_status) {
        case "PENDING":
          formattedStats.pending = count;
          break;
        case "SHIPPED":
          formattedStats.shipped = count;
          break;
        case "DELIVERED":
          formattedStats.delivered = count;
          break;
        case "CANCELLED":
          formattedStats.cancelled = count;
          break;
      }
    });

    res.status(200).json({
      success: true,
      message: "Order stats retrieved successfully",
      data: formattedStats,
    });
  } catch (error) {
    console.error("Error fetching vendor order stats:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== GET VENDOR ORDERS BY STATUS ====================
exports.getVendorOrdersByStatus = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "VENDOR") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Vendor access required",
      });
    }

    const vendorId = req.user.id;
    const { status } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const validStatuses = ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"];

    if (!validStatuses.includes(status.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    // Get vendor details
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

    const orders = await prisma.order_items.findMany({
      where: {
        vendor_id: vendor.id,
        item_status: status.toUpperCase(),
      },
      include: {
        order: {
          include: {
            user: true,
          },
        },
        product_variant: true,
      },
      skip,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
    });

    const total = await prisma.order_items.count({
      where: {
        vendor_id: vendor.id,
        item_status: status.toUpperCase(),
      },
    });

    res.status(200).json({
      success: true,
      message: `Orders with ${status} status retrieved successfully`,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching vendor orders by status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
