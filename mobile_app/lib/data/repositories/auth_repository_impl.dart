import 'dart:convert';
import '../../domain/entities/user.dart';
import '../../domain/repositories/auth_repository_interface.dart';
import '../services/api_service.dart';

/**
 * Auth Repository Implementation
 * Infrastructure Layer - Data access implementation
 */
class AuthRepositoryImpl implements AuthRepositoryInterface {
  final ApiService apiService;

  AuthRepositoryImpl({required this.apiService});

  @override
  Future<AuthResponse> login(LoginRequest request) async {
    final response = await apiService.post(
      '/auth/login',
      body: request.toJson(),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      ApiService.saveToken(data['token']);
      return AuthResponse.fromJson(data);
    } else {
      throw Exception('Login failed: ${response.body}');
    }
  }

  @override
  Future<AuthResponse> register(RegisterRequest request) async {
    final response = await apiService.post(
      '/auth/register',
      body: request.toJson(),
    );

    if (response.statusCode == 201) {
      final data = jsonDecode(response.body);
      ApiService.saveToken(data['token']);
      return AuthResponse.fromJson(data);
    } else {
      throw Exception('Registration failed: ${response.body}');
    }
  }

  @override
  Future<User> getCurrentUser() async {
    final token = ApiService.getTokenFromStorage();
    if (token == null) {
      throw Exception('Not authenticated');
    }

    final response = await apiService.get(
      '/users/me',
      headers: {'Authorization': 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return User.fromJson(data['data']['user']);
    } else {
      throw Exception('Failed to get user: ${response.body}');
    }
  }

  @override
  Future<void> logout() async {
    ApiService.clearToken();
  }

  @override
  String? getToken() {
    return ApiService.getTokenFromStorage();
  }

  @override
  bool isAuthenticated() {
    return ApiService.getTokenFromStorage() != null;
  }
}
