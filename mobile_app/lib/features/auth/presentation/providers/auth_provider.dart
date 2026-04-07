import 'package:flutter/material.dart';

class AuthProvider extends ChangeNotifier {
  String? _phone;
  String? _otp;
  String? _email;
  String? _password;
  bool _isLoading = false;
  String? _error;

  String? get phone => _phone;
  String? get otp => _otp;
  String? get email => _email;
  String? get password => _password;
  bool get isLoading => _isLoading;
  String? get error => _error;

  void setPhone(String phone) {
    _phone = phone;
    _error = null;
    notifyListeners();
  }

  void setOtp(String otp) {
    _otp = otp;
    _error = null;
    notifyListeners();
  }

  void setEmail(String email) {
    _email = email;
    _error = null;
    notifyListeners();
  }

  void setPassword(String password) {
    _password = password;
    _error = null;
    notifyListeners();
  }

  Future<bool> sendOtp() async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();

      // TODO: Call API to send OTP
      // POST /api/v1/auth/send-otp
      // Body: { "phone": _phone }
      await Future.delayed(const Duration(seconds: 2));

      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _isLoading = false;
      _error = 'Failed to send OTP';
      notifyListeners();
      return false;
    }
  }

  Future<bool> verifyOtp() async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();

      // TODO: Call API to verify OTP
      // POST /api/v1/auth/verify-otp
      // Body: { "phone": _phone, "otp": _otp }
      await Future.delayed(const Duration(seconds: 2));

      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _isLoading = false;
      _error = 'Invalid OTP';
      notifyListeners();
      return false;
    }
  }

  Future<bool> register() async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();

      // TODO: Call API to register user
      // POST /api/v1/auth/register
      // Body: { "phone": _phone, "email": _email, "password": _password }
      await Future.delayed(const Duration(seconds: 2));

      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _isLoading = false;
      _error = 'Registration failed';
      notifyListeners();
      return false;
    }
  }

  void logout() {
    _phone = null;
    _otp = null;
    _email = null;
    _password = null;
    _isLoading = false;
    _error = null;
    notifyListeners();
  }

  void clearError() {
    _error = null;
    notifyListeners();
  }
}
