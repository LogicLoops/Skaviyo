import 'package:flutter/material.dart';

import '../widgets/otp_form.dart';
import '../widgets/phone_input_form.dart';

class PhoneInputGreenPanel extends StatelessWidget {
  final Widget child;
  final BorderRadius borderRadius;
  final EdgeInsetsGeometry padding;

  const PhoneInputGreenPanel({
    super.key,
    required this.child,
    required this.borderRadius,
    this.padding = const EdgeInsets.all(24),
  });

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: borderRadius,
      child: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF26D0CE), Color(0xFF10B981), Color(0xFF059669)],
          ),
        ),
        child: SingleChildScrollView(padding: padding, child: child),
      ),
    );
  }
}

class PhoneInputWhitePanel extends StatelessWidget {
  final Widget child;
  final BorderRadius borderRadius;
  final EdgeInsetsGeometry padding;

  const PhoneInputWhitePanel({
    super.key,
    required this.child,
    required this.borderRadius,
    this.padding = const EdgeInsets.all(24),
  });

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: borderRadius,
      child: Container(
        color: Colors.white,
        child: SingleChildScrollView(padding: padding, child: child),
      ),
    );
  }
}

class PhoneInputMarketingContent extends StatelessWidget {
  final ThemeData theme;
  final bool isDarkText;

  const PhoneInputMarketingContent({
    required this.theme,
    required this.isDarkText,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final titleColor = isDarkText ? const Color(0xFF1F2937) : Colors.white;
    final subtitleColor = isDarkText
        ? Colors.grey[700]!
        : Colors.white.withOpacity(0.9);

    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const SizedBox(height: 16),
        Container(
          width: 80,
          height: 80,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.2),
                blurRadius: 15,
                offset: const Offset(0, 5),
              ),
            ],
          ),
          child: Center(
            child: Text(
              'S',
              style: theme.textTheme.displayMedium?.copyWith(
                color: const Color(0xFF10B981),
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
        const SizedBox(height: 24),
        Text(
          'Welcome to Skaviyo',
          textAlign: TextAlign.center,
          style: theme.textTheme.headlineSmall?.copyWith(
            color: titleColor,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 12),
        Text(
          'Shop the best products at unbeatable prices',
          textAlign: TextAlign.center,
          style: theme.textTheme.bodyMedium?.copyWith(color: subtitleColor),
        ),
        const SizedBox(height: 16),
      ],
    );
  }
}

class PhoneInputFormContent extends StatelessWidget {
  final ThemeData theme;
  final VoidCallback onPhoneSubmitted;

  const PhoneInputFormContent({
    super.key,
    required this.theme,
    required this.onPhoneSubmitted,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Get Started',
          style: theme.textTheme.headlineSmall?.copyWith(
            fontWeight: FontWeight.bold,
            color: const Color(0xFF1F2937),
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Enter your phone number',
          style: theme.textTheme.bodyMedium?.copyWith(color: Colors.grey[600]),
        ),
        const SizedBox(height: 28),
        PhoneInputForm(onPhoneSubmitted: onPhoneSubmitted, isDarkTheme: false),
        const SizedBox(height: 20),
        Text(
          'By continuing, you agree to our Terms & Conditions',
          textAlign: TextAlign.center,
          style: theme.textTheme.bodySmall?.copyWith(
            color: Colors.grey[600],
            fontSize: 12,
          ),
        ),
      ],
    );
  }
}

class OtpFormContent extends StatelessWidget {
  final VoidCallback onOtpVerified;
  final VoidCallback onBackPressed;

  const OtpFormContent({
    super.key,
    required this.onOtpVerified,
    required this.onBackPressed,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Verify OTP',
          style: theme.textTheme.headlineSmall?.copyWith(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Enter 6-digit code',
          style: theme.textTheme.bodyMedium?.copyWith(
            color: Colors.white.withOpacity(0.9),
          ),
        ),
        const SizedBox(height: 24),
        OtpForm(onOtpVerified: onOtpVerified, onBackPressed: onBackPressed),
      ],
    );
  }
}
