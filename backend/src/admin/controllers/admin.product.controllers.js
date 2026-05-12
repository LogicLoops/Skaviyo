const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ==================== GET ALL PRODUCTS ====================
exports.getAllProducts = async (req, res) => {
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
    const status = req.query.status; // All Status, Active, Disabled
    const category = req.query.category; // filter by category
    const vendor = req.query.vendor; // filter by vendor

    // Build WHERE clause
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
                {
                  brand: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {},
        status && status !== "All Status"
          ? {
              is_active: status === "Active" ? true : false,
            }
          : {},
        category
          ? {
              category_id: parseInt(category),
            }
          : {},
        vendor
          ? {
              vendor_id: parseInt(vendor),
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

    // Fetch products
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
        _count: {
          select: {
            images: true,
            variants: true,
          },
        },
      },
      orderBy,
      skip,
      take: limitNum,
    });

    // Count total products
    const total = await prisma.products.count({
      where: whereClause,
    });

    // Format response
    const formattedProducts = products.map((product) => ({
      id: String(product.id),
      title: product.title,
      description: product.description || "",
      brand: product.brand || "N/A",
      vendor: product.vendor.store_name,
      vendorId: String(product.vendor.id),
      category: product.category.name,
      categoryId: String(product.category.id),
      totalVariants: product._count.variants,
      totalImages: product._count.images,
      createdOn: product.created_at.toISOString().split("T")[0],
      status: product.is_active ? "Active" : "Disabled",
      image: "📦",
    }));

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: {
        products: formattedProducts,
        pagination: {
          total,
          page,
          limit: limitNum,
          pages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== GET PRODUCT BY ID ====================
exports.getProductById = async (req, res) => {
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

    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      data: {
        id: String(product.id),
        title: product.title,
        description: product.description || "",
        brand: product.brand || "N/A",
        vendor: product.vendor.store_name,
        vendorId: String(product.vendor.id),
        category: product.category.name,
        categoryId: String(product.category.id),
        images: product.images,
        variants: product.variants,
        isActive: product.is_active,
        createdAt: product.created_at
      }
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
exports.createProduct = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required",
      });
    }

    const { title, description, brand, category_id, vendor_id, is_active } =
      req.body;

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

    // Check for duplicate title
    const existingProduct = await prisma.products.findFirst({
      where: {
        title: {
          equals: title.trim(),
          mode: "insensitive",
        },
      },
    });

    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: "Product with this title already exists",
      });
    }

    // Create product
    const newProduct = await prisma.products.create({
      data: {
        title: title.trim(),
        description: description || null,
        brand: brand || null,
        category_id: parseInt(category_id),
        vendor_id: parseInt(vendor_id),
        is_active: is_active !== undefined ? is_active : true,
      },
      include: {
        vendor: true,
        category: true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: {
        id: String(newProduct.id),
        title: newProduct.title,
        description: newProduct.description || "",
        brand: newProduct.brand || "N/A",
        vendor: newProduct.vendor.store_name,
        vendorId: String(newProduct.vendor.id),
        category: newProduct.category.name,
        categoryId: String(newProduct.category.id),
        createdAt: newProduct.created_at
      }
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
exports.updateProduct = async (req, res) => {
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
exports.deleteProduct = async (req, res) => {
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
      include: {
        _count: {
          select: {
            variants: true,
            images: true,
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Optional: Check if product has order items (prevent deletion if orders exist)
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

// ==================== SEARCH PRODUCTS ====================
exports.searchProducts = async (req, res) => {
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

    const products = await prisma.products.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        brand: true,
      },
      take: limit,
    });

    res.status(200).json({
      success: true,
      message: "Products found",
      data: products,
    });
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
