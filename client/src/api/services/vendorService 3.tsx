import axiosClient from "../axiosClient";

interface Vendor {
  id: number;
  userId: number;
  storeName: string;
  vendorName: string;
  email: string;
  phone: string;
  gstNumber: string | null;
  bankAccount: string | null;
  status: string;
  createdAt: string;
}

interface VendorDetails {
  id: number;
  userId: number;
  storeName: string;
  vendorName: string;
  email: string;
  phone: string;
  gstNumber: string | null;
  bankAccount: string | null;
  status: string;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: string;
  createdAt: string;
}

// Get all vendors with pagination and filtering
export const getAllVendors = async (
  page: number = 1,
  limit: number = 10,
  status?: string,
  search?: string
): Promise<{ vendors: Vendor[]; pagination: any }> => {
  try {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    if (status) params.append("status", status);
    if (search) params.append("search", search);

    const response = await axiosClient.get(`/admin/vendors/all?${params.toString()}`);
    return {
      vendors: response.data.data,
      pagination: response.data.pagination
    };
  } catch (error) {
    console.error("Error fetching vendors:", error);
    throw error;
  }
};

// Get vendor details
export const getVendorDetails = async (vendorId: number): Promise<VendorDetails> => {
  try {
    const response = await axiosClient.get(`/admin/vendors/${vendorId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching vendor details:", error);
    throw error;
  }
};

// Update vendor status (Verify/Suspend/Unverify)
export const updateVendorStatus = async (
  vendorId: number,
  newStatus: string
): Promise<Vendor> => {
  try {
    const response = await axiosClient.put(`/admin/vendors/${vendorId}/status`, {
      status: newStatus,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error updating vendor status:", error);
    throw error;
  }
};

// Delete vendor
export const deleteVendor = async (vendorId: number): Promise<void> => {
  try {
    await axiosClient.delete(`/admin/vendors/${vendorId}`);
  } catch (error) {
    console.error("Error deleting vendor:", error);
    throw error;
  }
};
