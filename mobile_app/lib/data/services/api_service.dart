import 'dart:convert';
import 'package:http/http.dart' as http;

/**
 * API Service
 * Infrastructure Layer - HTTP client for API communication
 */
class ApiService {
  static const String baseUrl = 'http://localhost:3000/api';
  static const String tokenKey = 'skaviyo_token';

  final http.Client client;

  ApiService({required this.client});

  Future<http.Response> get(
    String endpoint, {
    Map<String, String>? headers,
  }) async {
    final uri = Uri.parse('$baseUrl$endpoint');
    final requestHeaders = await _getHeaders(headers);
    return await client.get(uri, headers: requestHeaders);
  }

  Future<http.Response> post(
    String endpoint, {
    Map<String, dynamic>? body,
    Map<String, String>? headers,
  }) async {
    final uri = Uri.parse('$baseUrl$endpoint');
    final requestHeaders = await _getHeaders(headers);
    return await client.post(
      uri,
      headers: requestHeaders,
      body: body != null ? jsonEncode(body) : null,
    );
  }

  Future<Map<String, String>> _getHeaders(
    Map<String, String>? additionalHeaders,
  ) async {
    final headers = <String, String>{'Content-Type': 'application/json'};

    // Get token from storage (would use shared_preferences in real app)
    // For now, we'll handle this differently
    if (additionalHeaders != null) {
      headers.addAll(additionalHeaders);
    }

    return headers;
  }

  static String? getTokenFromStorage() {
    // Implementation would use shared_preferences
    return null;
  }

  static void saveToken(String token) {
    // Implementation would use shared_preferences
  }

  static void clearToken() {
    // Implementation would use shared_preferences
  }
}
