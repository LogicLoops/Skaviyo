import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';

class PhoneInputForm extends StatefulWidget {
  final VoidCallback onPhoneSubmitted;
  final bool isDarkTheme;

  const PhoneInputForm({
    Key? key,
    required this.onPhoneSubmitted,
    this.isDarkTheme = false,
  }) : super(key: key);

  @override
  State<PhoneInputForm> createState() => _PhoneInputFormState();
}

class _PhoneInputFormState extends State<PhoneInputForm> {
  late final TextEditingController _phoneController;
  late final GlobalKey<FormState> _formKey;

  @override
  void initState() {
    super.initState();
    _phoneController = TextEditingController();
    _formKey = GlobalKey<FormState>();
  }

  @override
  void dispose() {
    _phoneController.dispose();
    super.dispose();
  }

  String? _validatePhone(String? value) {
    if (value == null || value.isEmpty) {
      return 'Phone number is required';
    }
    if (value.length != 10) {
      return 'Phone number must be 10 digits';
    }
    if (!RegExp(r'^[0-9]+$').hasMatch(value)) {
      return 'Phone number must contain only digits';
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<AuthProvider>(
      builder: (context, authProvider, child) {
        return Form(
          key: _formKey,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Phone Input Field
              TextFormField(
                controller: _phoneController,
                keyboardType: TextInputType.phone,
                maxLength: 10,
                validator: _validatePhone,
                style: TextStyle(
                  color: widget.isDarkTheme ? Colors.white : Colors.black,
                  fontSize: 16,
                  fontWeight: FontWeight.w500,
                ),
                decoration: InputDecoration(
                  hintText: 'Enter 10-digit phone number',
                  hintStyle: TextStyle(
                    color: widget.isDarkTheme
                        ? Colors.white.withOpacity(0.6)
                        : Colors.grey[400],
                  ),
                  prefixIcon: Icon(
                    Icons.phone,
                    color: widget.isDarkTheme
                        ? Colors.white.withOpacity(0.7)
                        : const Color(0xFF10B981),
                  ),
                  counterText: '',
                  filled: true,
                  fillColor: widget.isDarkTheme
                      ? Colors.white.withOpacity(0.15)
                      : Colors.grey[100],
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 14,
                  ),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: BorderSide(
                      color: widget.isDarkTheme
                          ? Colors.white.withOpacity(0.3)
                          : Colors.grey[300]!,
                    ),
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: BorderSide(
                      color: widget.isDarkTheme
                          ? Colors.white.withOpacity(0.2)
                          : Colors.grey[300]!,
                    ),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: BorderSide(
                      color: widget.isDarkTheme
                          ? Colors.white
                          : const Color(0xFF10B981),
                      width: 2,
                    ),
                  ),
                  errorBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: BorderSide(color: Colors.red[400]!),
                  ),
                  focusedErrorBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: BorderSide(color: Colors.red[400]!, width: 2),
                  ),
                ),
                onChanged: (value) {
                  authProvider.setPhone(value);
                },
              ),
              const SizedBox(height: 16),

              // Error Message
              if (authProvider.error != null)
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: Colors.red[100],
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: Colors.red[300]!),
                  ),
                  child: Text(
                    authProvider.error!,
                    style: TextStyle(color: Colors.red[700], fontSize: 13),
                  ),
                ),
              if (authProvider.error != null) const SizedBox(height: 14),

              // Send OTP Button
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton(
                  onPressed: authProvider.isLoading
                      ? null
                      : () async {
                          if (_formKey.currentState!.validate()) {
                            // Simulate API call
                            final success = await authProvider.sendOtp();
                            if (success && mounted) {
                              widget.onPhoneSubmitted();
                            }
                          }
                        },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: widget.isDarkTheme
                        ? Colors.white
                        : const Color(0xFF10B981),
                    disabledBackgroundColor: widget.isDarkTheme
                        ? Colors.white.withOpacity(0.5)
                        : Colors.grey[300],
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    elevation: widget.isDarkTheme ? 6 : 2,
                    shadowColor: widget.isDarkTheme
                        ? Colors.black.withOpacity(0.3)
                        : const Color(0xFF10B981).withOpacity(0.3),
                  ),
                  child: authProvider.isLoading
                      ? SizedBox(
                          width: 20,
                          height: 20,
                          child: CircularProgressIndicator(
                            strokeWidth: 2.5,
                            valueColor: AlwaysStoppedAnimation<Color>(
                              widget.isDarkTheme ? Colors.green : Colors.white,
                            ),
                          ),
                        )
                      : Text(
                          'Get OTP',
                          style: Theme.of(context).textTheme.titleMedium
                              ?.copyWith(
                                color: widget.isDarkTheme
                                    ? const Color(0xFF10B981)
                                    : Colors.white,
                                fontWeight: FontWeight.w600,
                              ),
                        ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
