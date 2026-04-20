# Vendor API Documentation

This document provides an overview of all vendor-related API endpoints available in the Skaviyo backend.

## Base URL
```
http://localhost:4000/api/v1/vendor
```

**Authentication**: All endpoints require a valid JWT token in the Authorization header
```
Authorization: Bearer <token>
```

---

## Vendor Profile Endpoints

### 1. Get Vendor Details
- **Endpoint**: `GET /me`
- **Description**: Get current vendor's profile and statistics
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "1",
      "userId": "1",
      "storeName": "My Store",
      "gstNumber": "123ABC",
      "bankAccount": "1234567890",
      "status": "ACTIVE",
      "user": {
        "name": "Vendor Name",
        "email": "vendor@email.com",
        "role": "VENDOR"
      },
      "stats": {
        "totalProducts": 50,
        "totalOrders": 100,
        "totalRevenue": 50000
      }
    }
  }
  ```

### 2. Update Vendor Details
- **Endpoint**: `PUT /update`
- **Description**: Update vendor's store information
- **Request Body**:
  ```json
  {
    "store_name": "New Store Name",
    "gst_number": "123ABC456",
    "bank_account": "9876543210"
  }
  ```

### 3. Get Dashboard Stats
- **Endpoint**: `GET /stats/dashboard`
- **Description**: Get comprehensive dashboard statistics
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "totalProducts": 50,
      "totalOrders": 100,
      "pendingOrders": 10,
      "shippedOrders": 20,
      "deliveredOrders": 65,
      "cancelledOrders": 5,
      "totalRevenue": 50000.00
    }
  }
  ```

---

## Order Management Endpoints

### 4. Get All Vendor Orders
- **Endpoint**: `GET /orders`
- **Description**: Get all orders for vendor's products with pagination and filtering
- **Query Parameters**:
  - `page` (optional, default: 1): Page number
  - `limit` (optional, default: 10): Items per page
  - `search` (optional): Search by order number or customer name
  - `sortOrder` (optional, default: "newest"): "newest" or "oldest"
  - `orderItemStatus` (optional): Filter by order item status (PENDING, SHIPPED, DELIVERED, CANCELLED)

- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "1",
        "orderId": "123",
        "orderNumber": "ORD-001",
        "customerName": "Customer Name",
        "customerEmail": "customer@email.com",
        "productName": "Product Name",
        "quantity": 2,
        "itemPrice": 100.00,
        "itemStatus": "PENDING",
        "createdAt": "2024-02-17T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "pages": 5
    }
  }
  ```

### 5. Get Order Statistics
- **Endpoint**: `GET /orders/stats`
- **Description**: Get summary statistics for all vendor orders
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "total": 100,
      "pending": 10,
      "shipped": 20,
      "delivered": 65,
      "cancelled": 5,
      "totalRevenue": 50000.00
    }
  }
  ```

### 6. Get Orders by Status
- **Endpoint**: `GET /orders/status/:status`
- **Description**: Get all orders with a specific status
- **Path Parameters**:
  - `status`: Order item status (PENDING, SHIPPED, DELIVERED, CANCELLED)

- **Query Parameters**:
  - `page` (optional, default: 1): Page number
  - `limit` (optional, default: 10): Items per page

### 7. Get Specific Order
- **Endpoint**: `GET /orders/:id`
- **Description**: Get details of a specific order item
- **Path Parameters**:
  - `id`: Order item ID

- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "orderId": 123,
      "vendorId": 1,
      "productId": 45,
      "quantity": 2,
      "itemPrice": 100.00,
      "orderItemStatus": "PENDING",
      "createdAt": "2024-02-17T10:00:00Z",
      "order": {
        "orderNumber": "ORD-001",
        "user": {
          "name": "Customer Name",
          "email": "customer@email.com"
        }
      }
    }
  }
  ```

### 8. Update Order Status
- **Endpoint**: `PUT /orders/:id/status`
- **Description**: Update the status of a specific order item
- **Path Parameters**:
  - `id`: Order item ID

- **Request Body**:
  ```json
  {
    "order_item_status": "SHIPPED"
  }
  ```

- **Valid Statuses**:
  - `PENDING`: Order item is pending
  - `SHIPPED`: Order item has been shipped
  - `DELIVERED`: Order item has been delivered
  - `CANCELLED`: Order item has been cancelled

- **Response**:
  ```json
  {
    "success": true,
    "message": "Order status updated successfully",
    "data": {
      "id": 1,
      "orderItemStatus": "SHIPPED",
      "updatedAt": "2024-02-17T11:00:00Z"
    }
  }
  ```

---

## Error Responses

All endpoints return error responses in the following format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common HTTP Status Codes
- `200`: Success
- `400`: Bad Request (invalid parameters)
- `401`: Unauthorized (missing/invalid token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `500`: Internal Server Error

---

## Example Usage

### Get Vendor Orders using cURL
```bash
curl -X GET "http://localhost:4000/api/v1/vendor/orders?page=1&limit=10" \
  -H "Authorization: Bearer <your_jwt_token>"
```

### Update Order Status using cURL
```bash
curl -X PUT "http://localhost:4000/api/v1/vendor/orders/1/status" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{"order_item_status": "SHIPPED"}'
```

---

## Features Implemented

✅ Get vendor profile and statistics
✅ Update vendor details
✅ View dashboard statistics
✅ Retrieve all vendor orders with pagination
✅ Search and filter orders
✅ View order statistics
✅ Filter orders by status
✅ Get detailed order information
✅ Update individual order status
✅ Authentication and authorization checks
✅ Error handling and validation
