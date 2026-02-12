import axiosClient from "../axiosClient";

interface Customer {
  id: number;
  name: string;
  email: string;
  status: string;
  totalOrders: number;
  totalSpent: string;
  createdAt: string;
}

interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  price: string;
}

interface Order {
  id: number;
  orderNumber: string;
  totalAmount: string;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
  items: OrderItem[];
}

interface CustomerDetails {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  totalOrders: number;
  totalSpent: string;
  createdAt: string;
  orders: Order[];
}

// Get all customers
export const getAllCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await axiosClient.get("/admin/customers/all");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

// Get customer details with orders
export const getCustomerDetails = async (customerId: number): Promise<CustomerDetails> => {
  try {
    const response = await axiosClient.get(`/admin/customers/${customerId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching customer details:", error);
    throw error;
  }
};

// Update customer status (deactivate/block)
export const updateCustomerStatus = async (
  customerId: number,
  newStatus: string
): Promise<Customer> => {
  try {
    const response = await axiosClient.put(`/admin/customers/${customerId}/status`, {
      status: newStatus,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error updating customer status:", error);
    throw error;
  }
};

// Delete customer
export const deleteCustomer = async (customerId: number): Promise<void> => {
  try {
    await axiosClient.delete(`/admin/customers/${customerId}`);
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};
