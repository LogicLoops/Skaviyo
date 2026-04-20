const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ==================== GET VENDOR DETAILS ====================
exports.getVendorDetails = async (req, res) => {
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
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            status: true,
            created_at: true,
          },
        },
      },
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    // Get vendor stats
    const totalProducts = await prisma.products.count({
      where: { vendor_id: vendor.id },
    });

    const totalOrders = await prisma.order_items.count({
      where: { vendor_id: vendor.id },
    });

    const totalRevenue = await prisma.order_items.aggregate({
      where: { vendor_id: vendor.id },
      _sum: {
        item_price: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Vendor details retrieved successfully",
      data: {
        id: String(vendor.id),
        userId: String(vendor.user_id),
        storeName: vendor.store_name,
        gstNumber: vendor.gst_number,
        bankAccount: vendor.bank_account,
        status: vendor.status,
        createdAt: vendor.created_at,
        user: {
          id: String(vendor.user.id),
          name: vendor.user.name,
          email: vendor.user.email,
          phone: vendor.user.phone,
          role: vendor.user.role,
          status: vendor.user.status,
          createdAt: vendor.user.created_at,
        },
        stats: {
          totalProducts,
          totalOrders,
          totalRevenue: parseFloat(
            totalRevenue._sum?.item_price?.toString() || "0"
          ),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching vendor details:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== UPDATE VENDOR DETAILS ====================
exports.updateVendorDetails = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "VENDOR") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Vendor access required",
      });
    }

    const vendorId = req.user.id;
    const { store_name, gst_number, bank_account } = req.body;

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

    // Update vendor
    const updatedVendor = await prisma.vendors.update({
      where: { id: vendor.id },
      data: {
        store_name: store_name || vendor.store_name,
        gst_number: gst_number || vendor.gst_number,
        bank_account: bank_account || vendor.bank_account,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Vendor details updated successfully",
      data: updatedVendor,
    });
  } catch (error) {
    console.error("Error updating vendor details:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== GET VENDOR DASHBOARD STATS ====================
exports.getVendorDashboardStats = async (req, res) => {
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

    // Get all stats
    const [
      totalProducts,
      totalOrders,
      pendingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue,
    ] = await Promise.all([
      prisma.products.count({ where: { vendor_id: vendor.id } }),
      prisma.order_items.count({ where: { vendor_id: vendor.id } }),
      prisma.order_items.count({
        where: { vendor_id: vendor.id, item_status: "PENDING" },
      }),
      prisma.order_items.count({
        where: { vendor_id: vendor.id, item_status: "SHIPPED" },
      }),
      prisma.order_items.count({
        where: { vendor_id: vendor.id, item_status: "DELIVERED" },
      }),
      prisma.order_items.count({
        where: { vendor_id: vendor.id, item_status: "CANCELLED" },
      }),
      prisma.order_items.aggregate({
        where: { vendor_id: vendor.id },
        _sum: { item_price: true },
      }),
    ]);

    res.status(200).json({
      success: true,
      message: "Dashboard stats retrieved successfully",
      data: {
        totalProducts,
        totalOrders,
        pendingOrders,
        shippedOrders,
        deliveredOrders,
        cancelledOrders,
        totalRevenue: parseFloat(totalRevenue._sum?.item_price?.toString() || "0"),
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
