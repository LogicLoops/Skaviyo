/// Navigation Routes Configuration
class AppRoutes {
  // Splash & Auth Routes
  static const String splash = '/splash';
  static const String phoneInput = '/phone-input';
  static const String otp = '/otp';
  static const String register = '/register';
  static const String login = '/login';

  // Main App Routes
  static const String dashboard = '/dashboard';
  static const String profile = '/profile';
  static const String settings = '/settings';
  static const String orders = '/orders';
  static const String orderDetail = '/order-detail';
  static const String products = '/products';
  static const String productDetail = '/product-detail';
  static const String cart = '/cart';
  static const String wishlist = '/wishlist';
  static const String checkout = '/checkout';
  static const String payment = '/payment';
  static const String orderTracking = '/order-tracking';

  // Helper method to build dynamic routes
  static String getOrderDetailRoute(String orderId) =>
      '$orderDetail?id=$orderId';
  static String getProductDetailRoute(String productId) =>
      '$productDetail?id=$productId';
}

/// Route transition types
enum RouteTransitionType {
  slideInRight,
  slideInLeft,
  slideInUp,
  slideInDown,
  fadeIn,
  scaleIn,
  rotateIn,
}

/// Route configuration model
class RouteConfig {
  final String name;
  final String path;
  final String description;
  final bool requiresAuth;
  final RouteTransitionType transitionType;

  RouteConfig({
    required this.name,
    required this.path,
    required this.description,
    this.requiresAuth = false,
    this.transitionType = RouteTransitionType.slideInRight,
  });
}

/// All available routes in the app
final List<RouteConfig> appRoutesList = [
  // Auth Routes
  RouteConfig(
    name: 'Splash',
    path: AppRoutes.splash,
    description: 'Splash screen',
    requiresAuth: false,
    transitionType: RouteTransitionType.fadeIn,
  ),
  RouteConfig(
    name: 'Phone Input',
    path: AppRoutes.phoneInput,
    description: 'Enter phone number for authentication',
    requiresAuth: false,
    transitionType: RouteTransitionType.slideInRight,
  ),
  RouteConfig(
    name: 'OTP Verification',
    path: AppRoutes.otp,
    description: 'Verify OTP sent to phone number',
    requiresAuth: false,
    transitionType: RouteTransitionType.slideInRight,
  ),
  RouteConfig(
    name: 'Registration',
    path: AppRoutes.register,
    description: 'Complete user registration',
    requiresAuth: false,
    transitionType: RouteTransitionType.slideInRight,
  ),
  RouteConfig(
    name: 'Login',
    path: AppRoutes.login,
    description: 'User login page',
    requiresAuth: false,
    transitionType: RouteTransitionType.slideInRight,
  ),

  // Main App Routes
  RouteConfig(
    name: 'Dashboard',
    path: AppRoutes.dashboard,
    description: 'Main dashboard with overview',
    requiresAuth: true,
    transitionType: RouteTransitionType.fadeIn,
  ),
  RouteConfig(
    name: 'Orders',
    path: AppRoutes.orders,
    description: 'List of all user orders',
    requiresAuth: true,
    transitionType: RouteTransitionType.slideInRight,
  ),
  RouteConfig(
    name: 'Order Detail',
    path: AppRoutes.orderDetail,
    description: 'Detailed view of a single order',
    requiresAuth: true,
    transitionType: RouteTransitionType.slideInUp,
  ),
  RouteConfig(
    name: 'Products',
    path: AppRoutes.products,
    description: 'Browse all products',
    requiresAuth: false,
    transitionType: RouteTransitionType.slideInRight,
  ),
  RouteConfig(
    name: 'Product Detail',
    path: AppRoutes.productDetail,
    description: 'Detailed view of a single product',
    requiresAuth: false,
    transitionType: RouteTransitionType.slideInUp,
  ),
  RouteConfig(
    name: 'Cart',
    path: AppRoutes.cart,
    description: 'Shopping cart',
    requiresAuth: true,
    transitionType: RouteTransitionType.slideInRight,
  ),
  RouteConfig(
    name: 'Wishlist',
    path: AppRoutes.wishlist,
    description: 'Saved wishlist items',
    requiresAuth: true,
    transitionType: RouteTransitionType.slideInRight,
  ),
  RouteConfig(
    name: 'Checkout',
    path: AppRoutes.checkout,
    description: 'Checkout process',
    requiresAuth: true,
    transitionType: RouteTransitionType.slideInUp,
  ),
  RouteConfig(
    name: 'Payment',
    path: AppRoutes.payment,
    description: 'Payment processing',
    requiresAuth: true,
    transitionType: RouteTransitionType.slideInUp,
  ),
  RouteConfig(
    name: 'Order Tracking',
    path: AppRoutes.orderTracking,
    description: 'Track order status',
    requiresAuth: true,
    transitionType: RouteTransitionType.slideInUp,
  ),
  RouteConfig(
    name: 'Profile',
    path: AppRoutes.profile,
    description: 'User profile management',
    requiresAuth: true,
    transitionType: RouteTransitionType.slideInRight,
  ),
  RouteConfig(
    name: 'Settings',
    path: AppRoutes.settings,
    description: 'App settings and preferences',
    requiresAuth: true,
    transitionType: RouteTransitionType.slideInRight,
  ),
];
