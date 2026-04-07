import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'phone_input_shared.dart';

class PhoneInputMobileLayout extends StatelessWidget {
  final bool isOtpMode;
  final VoidCallback onPhoneSubmitted;
  final VoidCallback onBackToPhone;
  final VoidCallback onOtpVerified;

  const PhoneInputMobileLayout({
    super.key,
    required this.isOtpMode,
    required this.onPhoneSubmitted,
    required this.onBackToPhone,
    required this.onOtpVerified,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    const greenTopColor = Color(0xFF10B981);

    final statusBarStyle = isOtpMode
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
        backgroundColor: isOtpMode ? Colors.white : greenTopColor,
        body: SafeArea(
          child: LayoutBuilder(
            builder: (context, constraints) {
              final sectionHeight = constraints.maxHeight / 2;

              return Stack(
                children: [
                  const Positioned.fill(child: ColoredBox(color: Colors.white)),
                  if (!isOtpMode)
                    Positioned(
                      top: sectionHeight,
                      left: 0,
                      right: 0,
                      height: sectionHeight,
                      child: PhoneInputWhitePanel(
                        borderRadius: const BorderRadius.only(
                          topLeft: Radius.circular(24),
                          topRight: Radius.circular(24),
                        ),
                        child: PhoneInputFormContent(
                          theme: theme,
                          onPhoneSubmitted: onPhoneSubmitted,
                        ),
                      ),
                    ),
                  if (isOtpMode)
                    Positioned(
                      top: 0,
                      left: 0,
                      right: 0,
                      height: sectionHeight,
                      child: PhoneInputWhitePanel(
                        borderRadius: const BorderRadius.only(
                          bottomLeft: Radius.circular(24),
                          bottomRight: Radius.circular(24),
                        ),
                        child: PhoneInputMarketingContent(
                          theme: theme,
                          isDarkText: true,
                        ),
                      ),
                    ),
                  AnimatedPositioned(
                    duration: const Duration(milliseconds: 480),
                    curve: Curves.easeInOutCubic,
                    top: isOtpMode ? sectionHeight : 0,
                    left: 0,
                    right: 0,
                    height: sectionHeight,
                    child: PhoneInputGreenPanel(
                      borderRadius: isOtpMode
                          ? const BorderRadius.only(
                              topLeft: Radius.circular(14),
                              topRight: Radius.circular(14),
                            )
                          : const BorderRadius.only(
                              bottomLeft: Radius.circular(14),
                              bottomRight: Radius.circular(14),
                            ),
                      child: AnimatedSwitcher(
                        duration: const Duration(milliseconds: 260),
                        switchInCurve: Curves.easeOut,
                        switchOutCurve: Curves.easeIn,
                        child: isOtpMode
                            ? OtpFormContent(
                                key: const ValueKey('otp-content'),
                                onOtpVerified: onOtpVerified,
                                onBackPressed: onBackToPhone,
                              )
                            : PhoneInputMarketingContent(
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
