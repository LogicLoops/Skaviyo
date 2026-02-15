import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../widgets/otp_form.dart';
import '../widgets/phone_input_form.dart';

class PhoneInputScreen extends StatefulWidget {
  const PhoneInputScreen({Key? key}) : super(key: key);

  @override
  State<PhoneInputScreen> createState() => _PhoneInputScreenState();
}

class _PhoneInputScreenState extends State<PhoneInputScreen> {
  bool _isOtpMode = false;

  void _onGetOtp() {
    setState(() {
      _isOtpMode = true;
    });
  }

  void _onBackToPhone() {
    setState(() {
      _isOtpMode = false;
    });
  }

  void _onOtpVerified() {
    Navigator.of(context).pushNamed('/register');
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    const greenTopColor = Color(0xFF10B981);
    final statusBarStyle = _isOtpMode
        ? SystemUiOverlayStyle.dark.copyWith(
            statusBarColor: Colors.white,
            statusBarIconBrightness: Brightness.dark,
            statusBarBrightness: Brightness.light,
          )
        : SystemUiOverlayStyle.light.copyWith(
            statusBarColor: greenTopColor,
            statusBarIconBrightness: Brightness.light,
            statusBarBrightness: Brightness.dark,
          );

    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: statusBarStyle,
      child: Scaffold(
        backgroundColor: _isOtpMode ? Colors.white : greenTopColor,
        body: SafeArea(
          child: LayoutBuilder(
            builder: (context, constraints) {
              final sectionHeight = constraints.maxHeight / 2;

              return Stack(
                children: [
                  const Positioned.fill(child: ColoredBox(color: Colors.white)),

                  if (!_isOtpMode)
                    Positioned(
                      top: sectionHeight,
                      left: 0,
                      right: 0,
                      height: sectionHeight,
                      child: _WhiteSlot(
                        borderRadius: const BorderRadius.only(
                          topLeft: Radius.circular(24),
                          topRight: Radius.circular(24),
                        ),
                        child: _PhoneContent(
                          theme: theme,
                          onPhoneSubmitted: _onGetOtp,
                        ),
                      ),
                    ),

                  if (_isOtpMode)
                    Positioned(
                      top: 0,
                      left: 0,
                      right: 0,
                      height: sectionHeight,
                      child: _WhiteSlot(
                        borderRadius: const BorderRadius.only(
                          bottomLeft: Radius.circular(24),
                          bottomRight: Radius.circular(24),
                        ),
                        child: _MarketingContent(
                          theme: theme,
                          isDarkText: true,
                        ),
                      ),
                    ),

                  AnimatedPositioned(
                    duration: const Duration(milliseconds: 480),
                    curve: Curves.easeInOutCubic,
                    top: _isOtpMode ? sectionHeight : 0,
                    left: 0,
                    right: 0,
                    height: sectionHeight,
                    child: _GreenPanel(
                      isBottomSection: _isOtpMode,
                      child: AnimatedSwitcher(
                        duration: const Duration(milliseconds: 260),
                        switchInCurve: Curves.easeOut,
                        switchOutCurve: Curves.easeIn,
                        child: _isOtpMode
                            ? _OtpContent(
                                key: const ValueKey('otp-content'),
                                onOtpVerified: _onOtpVerified,
                                onBackPressed: _onBackToPhone,
                              )
                            : _MarketingContent(
                                key: const ValueKey('marketing-green'),
                                theme: theme,
                                isDarkText: false,
                              ),
                      ),
                    ),
                  ),
                ],
              );
            },
          ),
        ),
      ),
    );
  }
}

class _GreenPanel extends StatelessWidget {
  final Widget child;
  final bool isBottomSection;

  const _GreenPanel({required this.child, required this.isBottomSection});

  @override
  Widget build(BuildContext context) {
    final borderRadius = isBottomSection
        ? const BorderRadius.only(
            topLeft: Radius.circular(14),
            topRight: Radius.circular(14),
          )
        : const BorderRadius.only(
            bottomLeft: Radius.circular(14),
            bottomRight: Radius.circular(14),
          );

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
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: child,
        ),
      ),
    );
  }
}

class _WhiteSlot extends StatelessWidget {
  final Widget child;
  final BorderRadius borderRadius;

  const _WhiteSlot({required this.child, required this.borderRadius});

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: borderRadius,
      child: Container(
        color: Colors.white,
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: child,
        ),
      ),
    );
  }
}

class _MarketingContent extends StatelessWidget {
  final ThemeData theme;
  final bool isDarkText;

  const _MarketingContent({
    super.key,
    required this.theme,
    required this.isDarkText,
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

class _PhoneContent extends StatelessWidget {
  final ThemeData theme;
  final VoidCallback onPhoneSubmitted;

  const _PhoneContent({required this.theme, required this.onPhoneSubmitted});

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

class _OtpContent extends StatelessWidget {
  final VoidCallback onOtpVerified;
  final VoidCallback onBackPressed;

  const _OtpContent({
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
