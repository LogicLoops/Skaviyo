import axiosClient from "../axiosClient";

interface DashboardStats {
  totalUsers: number;
  totalVendors: number;
  totalOrders: number;
  totalRevenue: number;
}

interface UsersByRole {
  role: string;
  count: number;
}

interface UserSummary {
  summary: Record<string, number>;
  totalUsers: number;
}

interface OrderStats {
  totalOrders: number;
  ordersByStatus: Record<string, number>;
}

interface PaymentStats {
  totalRevenue: number;
  paymentsByStatus: Record<string, number>;
}

// Get total users count
export const getTotalUsers = async (): Promise<number> => {
  try {
    const response = await axiosClient.get("/admin/users/all-by-role");
    return response.data.data.totalUsers;
  } catch (error) {
    console.error("Error fetching total users:", error);
    throw error;
  }
};

// Get users count by role
export const getUsersByRole = async (): Promise<UserSummary> => {
  try {
    const response = await axiosClient.get("/admin/users/all-by-role");
    return {
      summary: response.data.data.summary,
      totalUsers: response.data.data.totalUsers,
    };
  } catch (error) {
    console.error("Error fetching users by role:", error);
    throw error;
  }
};

// Get total vendors count
export const getTotalVendors = async (): Promise<number> => {
  try {
    const response = await axiosClient.get("/admin/users/role/VENDOR");
    return response.data.data.count;
  } catch (error) {
    console.error("Error fetching total vendors:", error);
    throw error;
  }
};

// Get total customers count
export const getTotalCustomers = async (): Promise<number> => {
  try {
    const response = await axiosClient.get("/admin/stats/users");
    return response.data.data.totalCustomers;
  } catch (error) {
    console.error("Error fetching total customers:", error);
    throw error;
  }
};

// Get orders statistics
export const getOrdersStats = async (): Promise<OrderStats> => {
  try {
    const response = await axiosClient.get("/admin/total-orders");
    return {
      totalOrders: response.data.data.totalOrders,
      ordersByStatus: {},
    };
  } catch (error) {
    console.error("Error fetching orders stats:", error);
    throw error;
  }
};

// Get payment statistics and revenue
export const getPaymentStats = async (): Promise<PaymentStats> => {
  try {
    const response = await axiosClient.get("/admin/total-revenue");
    return {
      totalRevenue: response.data.data.totalRevenue,
      paymentsByStatus: {},
    };
  } catch (error) {
    console.error("Error fetching payment stats:", error);
    throw error;
  }
};

// Get all dashboard stats (combined)
export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const [users, vendors, orders, revenue] = await Promise.all([
      getTotalUsers(),
      getTotalVendors(),
      getOrdersStats(),
      getPaymentStats(),
    ]);

    return {
      totalUsers: users,
      totalVendors: vendors,
      totalOrders: orders.totalOrders,
      totalRevenue: revenue.totalRevenue,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};

// Get revenue data for chart (uses status-based data)
export const getRevenueChart = async () => {
  try {
    const [paid, pending, failed] = await Promise.all([
      axiosClient.get("/admin/orders/status/PAID").catch(() => ({ data: { data: { count: 0 } } })),
      axiosClient.get("/admin/orders/status/PENDING").catch(() => ({ data: { data: { count: 0 } } })),
      axiosClient.get("/admin/orders/status/FAILED").catch(() => ({ data: { data: { count: 0 } } })),
    ]);

    return {
      data: [
        { status: "PAID", count: paid.data.data.count || 0 },
        { status: "PENDING", count: pending.data.data.count || 0 },
        { status: "FAILED", count: failed.data.data.count || 0 },
      ]
    };
  } catch (error) {
    console.error("Error fetching revenue chart data:", error);
    return { data: [] };
  }
};

// Get admin details
export const getAdminDetails = async () => {
  try {
    const response = await axiosClient.get("/admin/me");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching admin details:", error);
    throw error;
  }
};

// Get top selling products
export const getTopSellingProducts = async () => {
  try {
    const response = await axiosClient.get("/admin/top-selling-products");
    return response.data;
  } catch (error) {
    console.error("Error fetching top selling products:", error);
    throw error;
  }
};

// Get order status breakdown
export const getOrderStatusBreakdown = async () => {
  try {
    const response = await axiosClient.get("/admin/orders/status-breakdown");
    return {
      delivered: response.data.data.DELIVERED || 0,
      shipped: response.data.data.SHIPPED || 0,
      cancelled: response.data.data.CANCELLED || 0,
      pending: response.data.data.PENDING || 0,
    };
  } catch (error) {
    console.error("Error fetching order status breakdown:", error);
    return {
      delivered: 0,
      shipped: 0,
      cancelled: 0,
      pending: 0,
    };
  }
};

// Get orders by category (DELIVERED, SHIPPED, CANCELLED, PENDING)
export const getOrdersByCategory = async (category: string) => {
  try {
    const response = await axiosClient.get(`/admin/orders/status-breakdown?category=${category}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching ${category} orders:`, error);
    return {
      status: category,
      count: 0,
      orders: []
    };
  }
};