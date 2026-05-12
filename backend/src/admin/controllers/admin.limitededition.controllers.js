const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ==================== GET ALL LIMITED EDITION PRODUCTS ====================
exports.getAllLimitedEdition = async (req, res) => {
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
    const sortOrder = req.query.sortOrder || "newest";
    const status = req.query.status; // Active, Ended, Upcoming

    // Build WHERE clause - get products with limited variants or specific categories
    const whereClause = {
      AND: [
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
        {
          is_active: true,
        },
      ].filter((clause) => Object.keys(clause).length > 0),
    };

    const orderBy =
      sortOrder === "newest"
        ? { created_at: "desc" }
        : { created_at: "asc" };

    const skip = (page - 1) * limit;
    const limitNum = parseInt(limit);

    // Fetch limited edition products (products with low stock count)
    const products = await prisma.products.findMany({
      where: whereClause,
      include: {
        vendor: {
          select: {
            id: true,
            store_name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        variants: {
          select: {
            stock_quantity: true,
            price: true,
          },
        },
        _count: {
          select: {
            variants: true,
            images: true,
          },
        },
      },
      orderBy,
      skip,
      take: limitNum,
    });

    // Filter and format limited edition items (those with limited stock)
    const formattedLimitedEdition = products
      .filter((product) => {
        const totalStock = product.variants.reduce(
          (sum, v) => sum + v.stock_quantity,
          0
        );
        return totalStock <= 50; // Consider items with <= 50 total stock as limited
      })
      .map((product) => {
        const totalStock = product.variants.reduce(
          (sum, v) => sum + v.stock_quantity,
          0
        );
        const avgPrice =
          product.variants.length > 0
            ? (
                product.variants.reduce((sum, v) => sum + parseFloat(v.price.toString()), 0) /
                product.variants.length
              ).toFixed(2)
            : 0;

        return {
          id: String(product.id),
          title: product.title,
          description: product.description,
          vendor: product.vendor.store_name,
          vendorId: String(product.vendor.id),
          category: product.category.name,
          categoryId: String(product.category.id),
          totalVariants: product._count.variants,
          totalImages: product._count.images,
          totalStock,
          avgPrice: parseFloat(avgPrice),
          createdOn: product.created_at.toISOString().split("T")[0],
          status: totalStock > 0 ? "Active" : "Ended",
          urgency: totalStock <= 10 ? "Critical" : "Low",
          icon: "⚡",
        };
      });

    // Apply status filter if needed
    let filtered = formattedLimitedEdition;
    if (status && status !== "All Status") {
      filtered = formattedLimitedEdition.filter((item) => item.status === status);
    }

    const total = filtered.length;

    res.status(200).json({
      success: true,
      message: "Limited edition products retrieved successfully",
      data: {
        limitedEdition: filtered,
        pagination: {
          total,
          page,
          limit: limitNum,
          pages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching limited edition products:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== GET LIMITED EDITION PRODUCT BY ID ====================
exports.getLimitedEditionById = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required",
      });
    }

    const productId = parseInt(req.params.id);

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const product = await prisma.products.findUnique({
      where: {
        id: productId,
      },
      include: {
        vendor: true,
        category: true,
        images: true,
        variants: true,
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Calculate stock info
    const totalStock = product.variants.reduce(
      (sum, v) => sum + v.stock_quantity,
      0
    );

    res.status(200).json({
      success: true,
      message: "Limited edition product retrieved successfully",
      data: {
        id: String(product.id),
        title: product.title,
        description: product.description,
        vendor: product.vendor.store_name,
        vendorId: String(product.vendor.id),
        category: product.category.name,
        categoryId: String(product.category.id),
        totalVariants: product.variants.length,
        totalImages: product.images.length,
        totalStock,
        avgPrice: product.variants.length > 0
          ? (
              product.variants.reduce((sum, v) => sum + parseFloat(v.price.toString()), 0) /
              product.variants.length
            ).toFixed(2)
          : 0,
        isLimited: totalStock <= 50,
        urgency: totalStock <= 10 ? "Critical" : "Low",
        createdAt: product.created_at
      },
    });
  } catch (error) {
    console.error("Error fetching limited edition product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== CREATE LIMITED EDITION PRODUCT ====================
exports.createLimitedEdition = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required",
      });
    }

    const {
      title,
      description,
      brand,
      category_id,
      vendor_id,
      variants,
      limited_quantity,
    } = req.body;

    // Validation
    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Product title is required",
      });
    }

    if (!category_id || !vendor_id) {
      return res.status(400).json({
        success: false,
        message: "Category ID and Vendor ID are required",
      });
    }

    // Check if category exists
    const categoryExists = await prisma.categories.findUnique({
      where: { id: parseInt(category_id) },
    });

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check if vendor exists
    const vendorExists = await prisma.vendors.findUnique({
      where: { id: parseInt(vendor_id) },
    });

    if (!vendorExists) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    // Create limited edition product
    const newProduct = await prisma.products.create({
      data: {
        title: title.trim(),
        description: description || null,
        brand: brand || null,
        category_id: parseInt(category_id),
        vendor_id: parseInt(vendor_id),
        is_active: true,
      },
      include: {
        vendor: true,
        category: true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Limited edition product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating limited edition product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== UPDATE LIMITED EDITION PRODUCT ====================
exports.updateLimitedEdition = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required",
      });
    }

    const productId = parseInt(req.params.id);
    const { title, description, brand, category_id, vendor_id, is_active } =
      req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // Check if product exists
    const product = await prisma.products.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // If title is being changed, check for duplicates
    if (title && title.trim() !== product.title) {
      const existingProduct = await prisma.products.findFirst({
        where: {
          title: {
            equals: title.trim(),
            mode: "insensitive",
          },
          id: {
            not: productId,
          },
        },
      });

      if (existingProduct) {
        return res.status(409).json({
          success: false,
          message: "Product with this title already exists",
        });
      }
    }

    // Validate category if provided
    if (category_id) {
      const categoryExists = await prisma.categories.findUnique({
        where: { id: parseInt(category_id) },
      });

      if (!categoryExists) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
    }

    // Validate vendor if provided
    if (vendor_id) {
      const vendorExists = await prisma.vendors.findUnique({
        where: { id: parseInt(vendor_id) },
      });

      if (!vendorExists) {
        return res.status(404).json({
          success: false,
          message: "Vendor not found",
        });
      }
    }

    // Update product
    const updatedProduct = await prisma.products.update({
      where: { id: productId },
      data: {
        title: title ? title.trim() : product.title,
        description: description !== undefined ? description : product.description,
        brand: brand !== undefined ? brand : product.brand,
        category_id: category_id ? parseInt(category_id) : product.category_id,
        vendor_id: vendor_id ? parseInt(vendor_id) : product.vendor_id,
        is_active: is_active !== undefined ? is_active : product.is_active,
      },
      include: {
        vendor: true,
        category: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Limited edition product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating limited edition product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== DELETE LIMITED EDITION PRODUCT ====================
exports.deleteLimitedEdition = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required",
      });
    }

    const productId = parseInt(req.params.id);

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // Check if product exists
    const product = await prisma.products.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if product has order items
    const orderItems = await prisma.order_items.findFirst({
      where: {
        product_variant: {
          product_id: productId,
        },
      },
    });

    if (orderItems) {
      return res.status(409).json({
        success: false,
        message:
          "Cannot delete product: Item is part of existing orders",
      });
    }

    // Delete the product (cascades to variants and images)
    await prisma.products.delete({
      where: { id: productId },
    });

    res.status(200).json({
      success: true,
      message: "Limited edition product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting limited edition product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== GET ORDER STATISTICS FOR LIMITED EDITION ====================
exports.getLimitedEditionStats = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required",
      });
    }

    // Get products with limited stock
    const allProducts = await prisma.products.findMany({
      where: { is_active: true },
      include: {
        variants: {
          select: { stock_quantity: true },
        },
      },
    });

    const limitedProducts = allProducts.filter((p) => {
      const totalStock = p.variants.reduce((sum, v) => sum + v.stock_quantity, 0);
      return totalStock <= 50;
    });

    const criticalStock = limitedProducts.filter((p) => {
      const totalStock = p.variants.reduce((sum, v) => sum + v.stock_quantity, 0);
      return totalStock <= 10;
    });

    res.status(200).json({
      success: true,
      message: "Limited edition statistics retrieved successfully",
      data: {
        totalLimitedProducts: limitedProducts.length,
        criticalStockProducts: criticalStock.length,
        normalStockProducts: limitedProducts.length - criticalStock.length,
      },
    });
  } catch (error) {
    console.error("Error fetching limited edition stats:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
