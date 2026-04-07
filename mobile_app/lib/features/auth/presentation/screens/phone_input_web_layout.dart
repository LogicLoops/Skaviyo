import 'package:flutter/material.dart';

import 'phone_input_shared.dart';

class PhoneInputWebLayout extends StatelessWidget {
  final bool isOtpMode;
  final VoidCallback onPhoneSubmitted;
  final VoidCallback onBackToPhone;
  final VoidCallback onOtpVerified;

  const PhoneInputWebLayout({
    super.key,
    required this.isOtpMode,
    required this.onPhoneSubmitted,
    required this.onBackToPhone,
    required this.onOtpVerified,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 1200, maxHeight: 760),
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(
                    color: const Color(0xFF10B981).withOpacity(0.35),
                    width: 1.5,
                  ),
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(24),
                  child: Material(
                    color: Colors.white,
                    elevation: 6,
                    child: LayoutBuilder(
                      builder: (context, constraints) {
                        final sectionWidth = constraints.maxWidth / 2;

                        return Stack(
                          children: [
                            const Positioned.fill(
                              child: ColoredBox(color: Colors.white),
                            ),
                            if (!isOtpMode)
                              Positioned(
                                top: 0,
                                bottom: 0,
                                left: sectionWidth,
                                width: sectionWidth,
                                child: PhoneInputWhitePanel(
                                  borderRadius: const BorderRadius.only(
                                    topLeft: Radius.circular(20),
                                    bottomLeft: Radius.circular(20),
                                  ),
                                  padding: const EdgeInsets.all(32),
                                  child: PhoneInputFormContent(
                                    theme: theme,
                                    onPhoneSubmitted: onPhoneSubmitted,
                                  ),
                                ),
                              ),
                            if (isOtpMode)
                              Positioned(
                                top: 0,
                                bottom: 0,
                                left: 0,
                                width: sectionWidth,
                                child: PhoneInputWhitePanel(
                                  borderRadius: const BorderRadius.only(
                                    topRight: Radius.circular(20),
                                    bottomRight: Radius.circular(20),
                                  ),
                                  padding: const EdgeInsets.all(32),
                                  child: PhoneInputMarketingContent(
                                    theme: theme,
                                    isDarkText: true,
                                  ),
                                ),
                              ),
                            AnimatedPositioned(
                              duration: const Duration(milliseconds: 480),
                              curve: Curves.easeInOutCubic,
                              top: 0,
                              bottom: 0,
                              left: isOtpMode ? sectionWidth : 0,
                              width: sectionWidth,
                              child: PhoneInputGreenPanel(
                                borderRadius: isOtpMode
                                    ? const BorderRadius.only(
                                        topLeft: Radius.circular(16),
                                        bottomLeft: Radius.circular(16),
                                      )
                                    : const BorderRadius.only(
                                        topRight: Radius.circular(16),
                                        bottomRight: Radius.circular(16),
                                      ),
                                padding: const EdgeInsets.all(32),
                                child: AnimatedSwitcher(
                                  duration: const Duration(milliseconds: 260),
                                  switchInCurve: Curves.easeOut,
                                  switchOutCurve: Curves.easeIn,
                                  child: isOtpMode
                                      ? OtpFormContent(
                                          key: const ValueKey(
                                            'web-otp-content',
                                          ),
                                          onOtpVerified: onOtpVerified,
                                          onBackPressed: onBackToPhone,
                                        )
                                      : PhoneInputMarketingContent(
                                          key: const ValueKey(
                                            'web-marketing-green',
                                          ),
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
              ),
            ),
          ),
        ),
      ),
    );
  }
}
