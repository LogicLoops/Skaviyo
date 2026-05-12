const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AdminCategoryController {
  // Get all categories with filters and search
  static async getAllCategories(req, res) {
    try {
      // Check if user is authenticated and is admin
      if (!req.user || !req.user.id) {
        console.log('[CATEGORY_CONTROLLER] Unauthorized: No user in request');
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: Admin not authenticated'
        });
      }

      if (req.user.role !== 'ADMIN') {
        console.log('[CATEGORY_CONTROLLER] User is not an admin. Role:', req.user.role);
        return res.status(403).json({
          success: false,
          message: 'Forbidden: Only admins can access this resource'
        });
      }

      const { search, status, sortOrder, page = 1, limit = 6 } = req.query;

      // Build where clause for filters
      let whereClause = {};

      if (search) {
        whereClause.name = {
          contains: search,
          mode: 'insensitive'
        };
      }

      // Get total count
      const totalCount = await prisma.categories.count({
        where: whereClause
      });

      // Determine sort order
      let orderBy = { created_at: 'desc' }; // default newest first
      if (sortOrder === 'oldest') {
        orderBy = { created_at: 'asc' };
      }

      // Calculate pagination
      const pageNum = parseInt(page) || 1;
      const limitNum = parseInt(limit) || 6;
      const skip = (pageNum - 1) * limitNum;

      // Fetch categories
      const categories = await prisma.categories.findMany({
        where: whereClause,
        include: {
          _count: {
            select: { products: true }
          }
        },
        orderBy,
        skip,
        take: limitNum
      });

      // Format response
      const formattedCategories = categories.map(cat => ({
        id: String(cat.id),
        name: cat.name,
        description: '',
        totalProducts: cat._count.products,
        createdOn: cat.created_at.toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        status: 'Active',
        image: '📁'
      }));

      console.log('[CATEGORY_CONTROLLER] Retrieved', categories.length, 'categories');

      return res.status(200).json({
        success: true,
        message: 'Categories retrieved successfully',
        data: {
          categories: formattedCategories,
          pagination: {
            total: totalCount,
            page: pageNum,
            limit: limitNum,
            pages: Math.ceil(totalCount / limitNum)
          }
        }
      });
    } catch (error) {
      console.error('[CATEGORY_CONTROLLER] Error fetching categories:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get single category by ID
  static async getCategoryById(req, res) {
    try {
      if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(403).json({
          success: false,
          message: 'Forbidden: Only admins can access this resource'
        });
      }

      const { id } = req.params;

      const category = await prisma.categories.findUnique({
        where: { id: BigInt(id) },
        include: {
          products: true,
          _count: {
            select: { products: true }
          }
        }
      });

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }

      console.log('[CATEGORY_CONTROLLER] Retrieved category:', category.name);

      return res.status(200).json({
        success: true,
        message: 'Category retrieved successfully',
        data: {
          id: String(category.id),
          name: category.name,
          description: '',
          image_url: '',
          totalProducts: category._count.products,
          createdAt: category.created_at
        }
      });
    } catch (error) {
      console.error('[CATEGORY_CONTROLLER] Error fetching category:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Create new category
  static async createCategory(req, res) {
    try {
      if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(403).json({
          success: false,
          message: 'Forbidden: Only admins can access this resource'
        });
      }

      const { name, description, image_url } = req.body;

      if (!name || name.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Category name is required'
        });
      }

      // Check if category already exists
      const existingCategory = await prisma.categories.findFirst({
        where: {
          name: {
            equals: name,
            mode: 'insensitive'
          }
        }
      });

      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: 'Category with this name already exists'
        });
      }

      const newCategory = await prisma.categories.create({
        data: {
          name: name.trim(),
          description: description || null,
          image_url: image_url || null
        }
      });

      console.log('[CATEGORY_CONTROLLER] Category created:', newCategory.name);

      return res.status(201).json({
        success: true,
        message: 'Category created successfully',
        data: {
          id: String(newCategory.id),
          name: newCategory.name,
          description: '',
          image_url: '',
          createdAt: newCategory.created_at
        }
      });
    } catch (error) {
      console.error('[CATEGORY_CONTROLLER] Error creating category:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Update category
  static async updateCategory(req, res) {
    try {
      if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(403).json({
          success: false,
          message: 'Forbidden: Only admins can access this resource'
        });
      }

      const { id } = req.params;
      const { name, description, image_url, status } = req.body;

      // Check if category exists
      const existingCategory = await prisma.categories.findUnique({
        where: { id: BigInt(id) }
      });

      if (!existingCategory) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }

      // Check if name is being changed and if it's unique
      if (name && name !== existingCategory.name) {
        const duplicateName = await prisma.categories.findFirst({
          where: {
            name: {
              equals: name,
              mode: 'insensitive'
            }
          }
        });

        if (duplicateName) {
          return res.status(400).json({
            success: false,
            message: 'Category with this name already exists'
          });
        }
      }

      const updatedCategory = await prisma.categories.update({
        where: { id: BigInt(id) },
        data: {
          name: name || existingCategory.name,
          description: description !== undefined ? description : existingCategory.description,
          image_url: image_url !== undefined ? image_url : existingCategory.image_url,
          status: status || existingCategory.status
        }
      });

      console.log('[CATEGORY_CONTROLLER] Category updated:', updatedCategory.name);

      return res.status(200).json({
        success: true,
        message: 'Category updated successfully',
        data: {
          id: updatedCategory.id,
          name: updatedCategory.name,
          description: updatedCategory.description,
          image_url: updatedCategory.image_url,
          createdAt: updatedCategory.created_at
        }
      });
    } catch (error) {
      console.error('[CATEGORY_CONTROLLER] Error updating category:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Delete category
  static async deleteCategory(req, res) {
    try {
      if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(403).json({
          success: false,
          message: 'Forbidden: Only admins can access this resource'
        });
      }

      const { id } = req.params;

      // Check if category exists
      const category = await prisma.categories.findUnique({
        where: { id: BigInt(id) },
        include: {
          _count: {
            select: { products: true }
          }
        }
      });

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }

      // Check if category has products
      if (category._count.products > 0) {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete category with existing products. Please remove products first.'
        });
      }

      await prisma.categories.delete({
        where: { id: BigInt(id) }
      });

      console.log('[CATEGORY_CONTROLLER] Category deleted:', category.name);

      return res.status(200).json({
        success: true,
        message: 'Category deleted successfully'
      });
    } catch (error) {
      console.error('[CATEGORY_CONTROLLER] Error deleting category:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Search categories by name
  static async searchCategories(req, res) {
    try {
      if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(403).json({
          success: false,
          message: 'Forbidden: Only admins can access this resource'
        });
      }

      const { query, limit = 10 } = req.query;

      if (!query || query.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }

      const results = await prisma.categories.findMany({
        where: {
          name: {
            contains: query,
            mode: 'insensitive'
          }
        },
        include: {
          _count: {
            select: { products: true }
          }
        },
        take: parseInt(limit)
      });

      console.log('[CATEGORY_CONTROLLER] Search found', results.length, 'categories');

      return res.status(200).json({
        success: true,
        message: 'Search results retrieved successfully',
        data: results.map(cat => ({
          id: cat.id,
          name: cat.name,
          totalProducts: cat._count.products
        }))
      });
    } catch (error) {
      console.error('[CATEGORY_CONTROLLER] Error searching categories:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = AdminCategoryController;
