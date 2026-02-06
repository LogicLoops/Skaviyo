import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;
import 'data/services/api_service.dart';
import 'data/repositories/auth_repository_impl.dart';
import 'domain/usecases/auth_usecases.dart';
import 'presentation/providers/auth_provider.dart';
import 'presentation/screens/login_screen.dart';

void main() {
  runApp(const SkaviyoApp());
}

class SkaviyoApp extends StatelessWidget {
  const SkaviyoApp({super.key});

  @override
  Widget build(BuildContext context) {
    // Setup dependency injection
    final apiService = ApiService(client: http.Client());
    final authRepository = AuthRepositoryImpl(apiService: apiService);

    final loginUseCase = LoginUseCase(repository: authRepository);
    final registerUseCase = RegisterUseCase(repository: authRepository);
    final getCurrentUserUseCase = GetCurrentUserUseCase(
      repository: authRepository,
    );
    final logoutUseCase = LogoutUseCase(repository: authRepository);
    final isAuthenticatedUseCase = IsAuthenticatedUseCase(
      repository: authRepository,
    );

    final authProvider = AuthProvider(
      loginUseCase: loginUseCase,
      registerUseCase: registerUseCase,
      getCurrentUserUseCase: getCurrentUserUseCase,
      logoutUseCase: logoutUseCase,
      isAuthenticatedUseCase: isAuthenticatedUseCase,
    );

    return MultiProvider(
      providers: [ChangeNotifierProvider(create: (_) => authProvider)],
      child: MaterialApp(
        title: 'Skaviyo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
          useMaterial3: true,
          // Responsive design settings
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
        home: const LoginScreen(),
        // Responsive settings for web
        builder: (context, child) {
          return SafeArea(child: child ?? const SizedBox.shrink());
        },
      ),
    );
  }
}
