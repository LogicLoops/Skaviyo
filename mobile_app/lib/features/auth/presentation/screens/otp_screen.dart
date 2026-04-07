import 'package:flutter/material.dart';
import '../../../../config/routes/routes_config.dart';
import '../widgets/otp_form.dart';

class OtpScreen extends StatefulWidget {
  const OtpScreen({Key? key}) : super(key: key);

  @override
  State<OtpScreen> createState() => _OtpScreenState();
}

class _OtpScreenState extends State<OtpScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Verify Phone'),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const SizedBox(height: 40),
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                color: const Color(0xFF10B981).withOpacity(0.1),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0xFF10B981), width: 2),
              ),
              child: Center(
                child: Icon(
                  Icons.message,
                  size: 40,
                  color: const Color(0xFF10B981),
                ),
              ),
            ),
            const SizedBox(height: 24),
            Text(
              'Verify Your Phone Number',
              style: Theme.of(
                context,
              ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Text(
              'Enter the 6-digit code we sent to your phone',
              style: Theme.of(
                context,
              ).textTheme.bodyMedium?.copyWith(color: Colors.grey[600]),
            ),
            const SizedBox(height: 40),
            OtpForm(
              onOtpVerified: () {
                Navigator.pushNamed(context, AppRoutes.register);
              },
              onBackPressed: () {
                Navigator.pop(context);
              },
            ),
            const SizedBox(height: 24),
            TextButton(onPressed: () {}, child: const Text('Resend Code')),
          ],
        ),
      ),
    );
  }
}
