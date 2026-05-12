import axiosClient from '../axiosClient';

const vendorAPI = {
  // ==================== VENDOR PROFILE ====================
  getVendorProfile: async () => {
    try {
      const response = await axiosClient.get('/vendor/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getVendorDetails: async () => {
    try {
      const response = await axiosClient.get('/vendor/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateVendorProfile: async (data: any) => {
    try {
      const response = await axiosClient.put('/vendor/update', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateVendorDetails: async (data: any) => {
    try {
      const response = await axiosClient.put('/vendor/update', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getVendorDashboardStats: async () => {
    try {
      const response = await axiosClient.get('/vendor/stats/dashboard');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getDashboardStats: async () => {
    try {
      const response = await axiosClient.get('/vendor/stats/dashboard');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // ==================== ORDERS ====================
  getVendorOrders: async (page = 1, limit = 10, filters = {}) => {
    try {
      const response = await axiosClient.get('/vendor/orders', {
        params: { page, limit, ...filters },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getOrderStats: async () => {
    try {
      const response = await axiosClient.get('/vendor/orders/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getOrdersByStatus: async (status: string, page = 1, limit = 10) => {
    try {
      const response = await axiosClient.get(`/vendor/orders/status/${status}`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getOrderById: async (orderId: string | number) => {
    try {
      const response = await axiosClient.get(`/vendor/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateOrderStatus: async (orderId: string | number, status: string) => {
    try {
      const response = await axiosClient.put(`/vendor/orders/${orderId}/status`, {
        order_item_status: status,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // ==================== PRODUCTS ====================
  getVendorProducts: async (page = 1, limit = 10, filters = {}) => {
    try {
      const response = await axiosClient.get('/vendor/products', {
        params: { page, limit, ...filters },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProductStats: async () => {
    try {
      const response = await axiosClient.get('/vendor/products/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProductById: async (productId: string | number) => {
    try {
      const response = await axiosClient.get(`/vendor/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createProduct: async (productData: any) => {
    try {
      const response = await axiosClient.post('/vendor/products', productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateProduct: async (productId: string | number, productData: any) => {
    try {
      const response = await axiosClient.put(`/vendor/products/${productId}`, productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteProduct: async (productId: string | number) => {
    try {
      const response = await axiosClient.delete(`/vendor/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // ==================== REVIEWS ====================
  getVendorReviews: async (page = 1, limit = 10, filters = {}) => {
    try {
      const response = await axiosClient.get('/vendor/reviews', {
        params: { page, limit, ...filters },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getReviewStats: async () => {
    try {
      const response = await axiosClient.get('/vendor/reviews/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getReviewById: async (reviewId: string | number) => {
    try {
      const response = await axiosClient.get(`/vendor/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  replyToReview: async (reviewId: string | number, reply: string) => {
    try {
      const response = await axiosClient.put(`/vendor/reviews/${reviewId}/reply`, {
        reply,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateReviewStatus: async (reviewId: string | number, status: string) => {
    try {
      const response = await axiosClient.put(`/vendor/reviews/${reviewId}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // ==================== ANALYTICS & EARNINGS ====================
  getVendorAnalytics: async (filters = {}) => {
    try {
      const response = await axiosClient.get('/vendor/analytics', {
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAnalytics: async (filters = {}) => {
    try {
      const response = await axiosClient.get('/vendor/analytics', {
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getVendorEarnings: async () => {
    try {
      const response = await axiosClient.get('/vendor/earnings');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getEarnings: async () => {
    try {
      const response = await axiosClient.get('/vendor/earnings');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTransactionHistory: async (page = 1, limit = 10) => {
    try {
      const response = await axiosClient.get('/vendor/transactions', {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getRevenueChartData: async (months = 12) => {
    try {
      const response = await axiosClient.get('/vendor/revenue-chart', {
        params: { months },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default vendorAPI;
