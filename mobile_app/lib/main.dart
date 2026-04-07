import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'config/routes/app_router.dart';
import 'core/theme/app_theme.dart';
import 'features/auth/presentation/providers/auth_provider.dart';
import 'features/auth/presentation/screens/splash_screen.dart';

void main() {
  runApp(const SkaviyoApp());
}

class SkaviyoApp extends StatelessWidget {
  const SkaviyoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => AuthProvider(),
      child: MaterialApp(
        title: 'Skaviyo',
        theme: AppTheme.lightTheme,
        home: const SplashScreen(),
        onGenerateRoute: AppRouter.generateRoute,
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}
