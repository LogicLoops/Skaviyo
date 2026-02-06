/**
 * User Entity
 * Domain Layer - Core business entity
 */
class User {
  final String id;
  final String email;
  final String firstName;
  final String lastName;
  final String role;
  final bool isActive;
  final DateTime createdAt;

  User({
    required this.id,
    required this.email,
    required this.firstName,
    required this.lastName,
    required this.role,
    required this.isActive,
    required this.createdAt,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      email: json['email'],
      firstName: json['firstName'],
      lastName: json['lastName'],
      role: json['role'],
      isActive: json['isActive'],
      createdAt: DateTime.parse(json['createdAt']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'firstName': firstName,
      'lastName': lastName,
      'role': role,
      'isActive': isActive,
      'createdAt': createdAt.toIso8601String(),
    };
  }
}

class LoginRequest {
  final String email;
  final String password;

  LoginRequest({required this.email, required this.password});

  Map<String, dynamic> toJson() {
    return {'email': email, 'password': password};
  }
}

class RegisterRequest {
  final String email;
  final String password;
  final String firstName;
  final String lastName;

  RegisterRequest({
    required this.email,
    required this.password,
    required this.firstName,
    required this.lastName,
  });

  Map<String, dynamic> toJson() {
    return {
      'email': email,
      'password': password,
      'firstName': firstName,
      'lastName': lastName,
    };
  }
}

class AuthResponse {
  final User user;
  final String token;

  AuthResponse({required this.user, required this.token});

  factory AuthResponse.fromJson(Map<String, dynamic> json) {
    return AuthResponse(
      user: User.fromJson(json['user']),
      token: json['token'],
    );
  }
}
