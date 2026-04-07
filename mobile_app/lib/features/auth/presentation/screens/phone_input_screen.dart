import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import 'phone_input_mobile_layout.dart';
import 'phone_input_web_layout.dart';

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
    if (kIsWeb) {
      return PhoneInputWebLayout(
        isOtpMode: _isOtpMode,
        onPhoneSubmitted: _onGetOtp,
        onBackToPhone: _onBackToPhone,
        onOtpVerified: _onOtpVerified,
      );
    }

    return PhoneInputMobileLayout(
      isOtpMode: _isOtpMode,
      onPhoneSubmitted: _onGetOtp,
      onBackToPhone: _onBackToPhone,
      onOtpVerified: _onOtpVerified,
    );
  }
}
