import 'package:flutter/foundation.dart';
import '../../domain/entities/user.dart';
import '../../domain/usecases/auth_usecases.dart';

/**
 * Auth Provider
 * Presentation Layer - State management using Provider
 */
class AuthProvider with ChangeNotifier {
  final LoginUseCase loginUseCase;
  final RegisterUseCase registerUseCase;
  final GetCurrentUserUseCase getCurrentUserUseCase;
  final LogoutUseCase logoutUseCase;
  final IsAuthenticatedUseCase isAuthenticatedUseCase;

  User? _user;
  bool _isLoading = false;
  String? _error;

  AuthProvider({
    required this.loginUseCase,
    required this.registerUseCase,
    required this.getCurrentUserUseCase,
    required this.logoutUseCase,
    required this.isAuthenticatedUseCase,
  });

  User? get user => _user;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isAuthenticated => _user != null;

  Future<void> login(String email, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await loginUseCase.execute(
        LoginRequest(email: email, password: password),
      );
      _user = response.user;
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> register(
    String email,
    String password,
    String firstName,
    String lastName,
  ) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await registerUseCase.execute(
        RegisterRequest(
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
        ),
      );
      _user = response.user;
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> logout() async {
    await logoutUseCase.execute();
    _user = null;
    notifyListeners();
  }

  Future<void> checkAuthStatus() async {
    if (isAuthenticatedUseCase.execute()) {
      try {
        _user = await getCurrentUserUseCase.execute();
      } catch (e) {
        _user = null;
      }
    }
    notifyListeners();
  }

  void clearError() {
    _error = null;
    notifyListeners();
  }
}
