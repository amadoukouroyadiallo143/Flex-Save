import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../api_client.dart';
import '../models.dart';

/// User stats state
class UserStatsState {
  final UserStats? stats;
  final bool isLoading;
  final String? error;

  UserStatsState({
    this.stats,
    this.isLoading = false,
    this.error,
  });
}

/// User stats notifier
class UserStatsNotifier extends StateNotifier<UserStatsState> {
  final ApiClient _apiClient;

  UserStatsNotifier(this._apiClient) : super(UserStatsState());

  Future<void> loadStats() async {
    try {
      state = UserStatsState(isLoading: true);
      
      final data = await _apiClient.getUserStats();
      final stats = UserStats.fromJson(data);
      
      state = UserStatsState(stats: stats);
    } catch (e) {
      state = UserStatsState(error: e.toString());
    }
  }
}

/// Provider
final userStatsProvider = StateNotifierProvider<UserStatsNotifier, UserStatsState>((ref) {
  final apiClient = ref.watch(apiClientProvider);
  return UserStatsNotifier(apiClient);
});

/// Notifications state
class NotificationsState {
  final List<AppNotification> notifications;
  final bool isLoading;
  final int unreadCount;

  NotificationsState({
    this.notifications = const [],
    this.isLoading = false,
    this.unreadCount = 0,
  });
}

/// Notifications notifier
class NotificationsNotifier extends StateNotifier<NotificationsState> {
  final ApiClient _apiClient;

  NotificationsNotifier(this._apiClient) : super(NotificationsState());

  Future<void> loadNotifications({bool unreadOnly = false}) async {
    try {
      state = NotificationsState(isLoading: true);
      
      final data = await _apiClient.getNotifications(unreadOnly: unreadOnly);
      final notifications = data.map((n) => AppNotification.fromJson(n)).toList();
      final unread = notifications.where((n) => !n.isRead).length;
      
      state = NotificationsState(
        notifications: notifications,
        unreadCount: unread,
      );
    } catch (e) {
      state = NotificationsState();
    }
  }

  Future<void> markAsRead(String id) async {
    try {
      await _apiClient.markNotificationAsRead(id);
      
      final updated = state.notifications.map((n) {
        if (n.id == id) {
          return AppNotification(
            id: n.id,
            title: n.title,
            body: n.body,
            type: n.type,
            actionUrl: n.actionUrl,
            isRead: true,
            createdAt: n.createdAt,
          );
        }
        return n;
      }).toList();
      
      state = NotificationsState(
        notifications: updated,
        unreadCount: updated.where((n) => !n.isRead).length,
      );
    } catch (e) {
      // Ignore
    }
  }

  Future<void> markAllAsRead() async {
    try {
      await _apiClient.markAllNotificationsAsRead();
      
      final updated = state.notifications.map((n) {
        return AppNotification(
          id: n.id,
          title: n.title,
          body: n.body,
          type: n.type,
          actionUrl: n.actionUrl,
          isRead: true,
          createdAt: n.createdAt,
        );
      }).toList();
      
      state = NotificationsState(
        notifications: updated,
        unreadCount: 0,
      );
    } catch (e) {
      // Ignore
    }
  }
}

/// Provider
final notificationsProvider = StateNotifierProvider<NotificationsNotifier, NotificationsState>((ref) {
  final apiClient = ref.watch(apiClientProvider);
  return NotificationsNotifier(apiClient);
});
