import '../entities/user.dart';

/**
 * Auth Repository Interface
 * Domain Layer - Contract for data access
 * Defines the contract that infrastructure must implement
 */
abstract class AuthRepositoryInterface {
  Future<AuthResponse> login(LoginRequest request);
  Future<AuthResponse> register(RegisterRequest request);
  Future<User> getCurrentUser();
  Future<void> logout();
  String? getToken();
  bool isAuthenticated();
}
