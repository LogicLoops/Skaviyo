const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ==================== GET ALL VENDOR PRODUCTS ====================
exports.getVendorProducts = async (req, res) => {
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
    const status = req.query.status;

    // Build WHERE clause
    const whereClause = {
      AND: [
        { vendor_id: vendor.id },
        search
          ? {
              OR: [
                {
                  title: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  description: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {},
        is_active
          ? {
              is_active: is_active === "true",
            }
          : {},
      ].filter((clause) => Object.keys(clause).length > 0),
    };

    const skip = (page - 1) * limit;

    // Get products with variants
    const products = await prisma.products.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { created_at: "desc" },
      include: {
        variants: true,
        category: true,
      },
    });

    // Count total
    const total = await prisma.products.count({
      where: whereClause,
    });

    // Format response
    const formattedProducts = products.map((product) => {
      const variant = product.variants[0]; // Get first variant as primary
      return {
        id: String(product.id),
        name: product.title,
        description: product.description,
        brand: product.brand,
        sku: variant?.sku || "N/A",
        price: variant ? parseFloat(variant.price.toString()) : 0,
        stock: variant?.stock_quantity || 0,
        status: product.is_active ? "ACTIVE" : "INACTIVE",
        category: product.category?.name || "Uncategorized",
        images: product.images || [],
        createdAt: product.created_at,
        updatedAt: product.updated_at,
      };
    });

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: formattedProducts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching vendor products:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== GET PRODUCT BY ID ====================
exports.getVendorProductById = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "VENDOR") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Vendor access required",
      });
    }

    const vendorId = req.user.id;
    const productId = parseInt(req.params.id);

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

    const product = await prisma.products.findUnique({
      where: { id: productId },
    });

    if (!product || product.vendor_id !== vendor.id) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== CREATE PRODUCT ====================
exports.createVendorProduct = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "VENDOR") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Vendor access required",
      });
    }

    const vendorId = req.user.id;
    const { name, sku, description, price, cost, stock, category, images, status } = req.body;

    // Validate required fields
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, price, and category are required",
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

    // Create product
    const product = await prisma.products.create({
      data: {
        vendor_id: vendor.id,
        name,
        sku: sku || `SKU-${Date.now()}`,
        description,
        price: parseFloat(price),
        cost: cost ? parseFloat(cost) : 0,
        stock: stock || 0,
        category,
        images: images || [],
        status: status || "ACTIVE",
      },
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== UPDATE PRODUCT ====================
exports.updateVendorProduct = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "VENDOR") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Vendor access required",
      });
    }

    const vendorId = req.user.id;
    const productId = parseInt(req.params.id);
    const { name, sku, description, price, cost, stock, category, images, status } = req.body;

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

    // Get product
    const product = await prisma.products.findUnique({
      where: { id: productId },
    });

    if (!product || product.vendor_id !== vendor.id) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update product
    const updatedProduct = await prisma.products.update({
      where: { id: productId },
      data: {
        name: name || product.name,
        sku: sku || product.sku,
        description: description || product.description,
        price: price ? parseFloat(price) : product.price,
        cost: cost !== undefined ? parseFloat(cost) : product.cost,
        stock: stock !== undefined ? stock : product.stock,
        category: category || product.category,
        images: images || product.images,
        status: status || product.status,
      },
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== DELETE PRODUCT ====================
exports.deleteVendorProduct = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "VENDOR") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Vendor access required",
      });
    }

    const vendorId = req.user.id;
    const productId = parseInt(req.params.id);

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

    // Get product
    const product = await prisma.products.findUnique({
      where: { id: productId },
    });

    if (!product || product.vendor_id !== vendor.id) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Delete product
    await prisma.products.delete({
      where: { id: productId },
    });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== GET PRODUCT STATS ====================
exports.getVendorProductStats = async (req, res) => {
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

    const stats = await prisma.products.groupBy({
      by: ["status"],
      where: { vendor_id: vendor.id },
      _count: true,
    });

    const formattedStats = {
      total: 0,
      active: 0,
      draft: 0,
      inactive: 0,
    };

    stats.forEach((stat) => {
      formattedStats.total += stat._count;
      switch (stat.status) {
        case "ACTIVE":
          formattedStats.active = stat._count;
          break;
        case "DRAFT":
          formattedStats.draft = stat._count;
          break;
        case "INACTIVE":
          formattedStats.inactive = stat._count;
          break;
      }
    });

    res.status(200).json({
      success: true,
      message: "Product stats retrieved successfully",
      data: formattedStats,
    });
  } catch (error) {
    console.error("Error fetching product stats:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
