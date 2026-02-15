import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../config/routes/app_routes.dart';
import '../providers/auth_provider.dart';

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _selectedIndex = 0;

  static final List<_PageConfig> _pages = [
    const _PageConfig(
      label: 'Dashboard',
      icon: Icons.dashboard_outlined,
      selectedIcon: Icons.dashboard,
      title: 'Dashboard',
      subtitle: 'Overview of your Skaviyo activity',
    ),
    const _PageConfig(
      label: 'Orders',
      icon: Icons.shopping_bag_outlined,
      selectedIcon: Icons.shopping_bag,
      title: 'Orders',
      subtitle: 'Track and manage customer orders',
    ),
    const _PageConfig(
      label: 'Profile',
      icon: Icons.person_outline,
      selectedIcon: Icons.person,
      title: 'Profile',
      subtitle: 'Manage your account details',
    ),
  ];

  Future<void> _handleLogout() async {
    final authProvider = context.read<AuthProvider>();
    await authProvider.logout();

    if (!mounted) return;
    Navigator.of(context).pushNamedAndRemoveUntil(
      AppRoutes.login,
      (route) => false,
    );
  }

  @override
  Widget build(BuildContext context) {
    final page = _pages[_selectedIndex];
    final isWide = MediaQuery.of(context).size.width >= 900;

    final body = _NavigationBody(
      page: page,
      onLogout: _handleLogout,
      onSelected: (index) => setState(() => _selectedIndex = index),
      selectedIndex: _selectedIndex,
      pages: _pages,
      isWide: isWide,
    );

    if (isWide) {
      return Scaffold(body: body);
    }

    return Scaffold(
      appBar: AppBar(title: Text(page.title)),
      body: body,
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (index) => setState(() => _selectedIndex = index),
        destinations: _pages
            .map(
              (item) => NavigationDestination(
                icon: Icon(item.icon),
                selectedIcon: Icon(item.selectedIcon),
                label: item.label,
              ),
            )
            .toList(),
      ),
    );
  }
}

class _NavigationBody extends StatelessWidget {
  final _PageConfig page;
  final VoidCallback onLogout;
  final ValueChanged<int> onSelected;
  final int selectedIndex;
  final List<_PageConfig> pages;
  final bool isWide;

  const _NavigationBody({
    required this.page,
    required this.onLogout,
    required this.onSelected,
    required this.selectedIndex,
    required this.pages,
    required this.isWide,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        if (isWide)
          NavigationRail(
            selectedIndex: selectedIndex,
            onDestinationSelected: onSelected,
            labelType: NavigationRailLabelType.all,
            destinations: pages
                .map(
                  (item) => NavigationRailDestination(
                    icon: Icon(item.icon),
                    selectedIcon: Icon(item.selectedIcon),
                    label: Text(item.label),
                  ),
                )
                .toList(),
          ),
        Expanded(
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 700),
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Card(
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          page.title,
                          style: Theme.of(context).textTheme.headlineSmall,
                        ),
                        const SizedBox(height: 8),
                        Text(page.subtitle),
                        const SizedBox(height: 24),
                        FilledButton.icon(
                          onPressed: onLogout,
                          icon: const Icon(Icons.logout),
                          label: const Text('Logout'),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _PageConfig {
  final String label;
  final IconData icon;
  final IconData selectedIcon;
  final String title;
  final String subtitle;

  const _PageConfig({
    required this.label,
    required this.icon,
    required this.selectedIcon,
    required this.title,
    required this.subtitle,
  });
}
