import '../entities/user.dart';
import '../repositories/auth_repository_interface.dart';

/**
 * Auth Use Cases
 * Domain Layer - Business logic
 */
class LoginUseCase {
  final AuthRepositoryInterface repository;

  LoginUseCase({required this.repository});

  Future<AuthResponse> execute(LoginRequest request) async {
    return await repository.login(request);
  }
}

class RegisterUseCase {
  final AuthRepositoryInterface repository;

  RegisterUseCase({required this.repository});

  Future<AuthResponse> execute(RegisterRequest request) async {
    return await repository.register(request);
  }
}

class GetCurrentUserUseCase {
  final AuthRepositoryInterface repository;

  GetCurrentUserUseCase({required this.repository});

  Future<User> execute() async {
    return await repository.getCurrentUser();
  }
}

class LogoutUseCase {
  final AuthRepositoryInterface repository;

  LogoutUseCase({required this.repository});

  Future<void> execute() async {
    await repository.logout();
  }
}

class IsAuthenticatedUseCase {
  final AuthRepositoryInterface repository;

  IsAuthenticatedUseCase({required this.repository});

  bool execute() {
    return repository.isAuthenticated();
  }
}
