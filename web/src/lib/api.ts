const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

interface RequestOptions {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
}

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private getToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token');
        }
        return null;
    }

    private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const token = this.getToken();

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: options.method || 'GET',
            headers,
            body: options.body ? JSON.stringify(options.body) : undefined,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ detail: 'Request failed' }));
            throw new Error(error.detail || 'An error occurred');
        }

        // Handle 204 No Content
        if (response.status === 204) {
            return {} as T;
        }

        return response.json();
    }

    // Auth
    async register(email: string, password: string, fullName: string) {
        return this.request('/auth/register', {
            method: 'POST',
            body: { email, password, full_name: fullName },
        });
    }

    // Users
    async getCurrentUser() {
        return this.request<any>('/users/me');
    }

    async getUserStats() {
        return this.request<any>('/users/me/stats');
    }

    async updateUser(data: { full_name?: string; notification_enabled?: boolean }) {
        return this.request('/users/me', {
            method: 'PATCH',
            body: data,
        });
    }

    // Vaults
    async getVaults() {
        return this.request<any[]>('/vaults/');
    }

    async getVault(id: string) {
        return this.request<any>(`/vaults/${id}`);
    }

    async createVault(data: {
        name: string;
        target_amount: number;
        unlock_date: string;
        flexibility_percentage: number;
    }) {
        return this.request('/vaults/', {
            method: 'POST',
            body: data,
        });
    }

    async deposit(vaultId: string, amount: number) {
        return this.request(`/vaults/${vaultId}/deposit`, {
            method: 'POST',
            body: { amount },
        });
    }

    async closeVault(id: string) {
        return this.request(`/vaults/${id}`, { method: 'DELETE' });
    }

    // Withdrawals
    async previewWithdrawal(data: {
        vault_id: string;
        amount: number;
        is_early_withdrawal: boolean;
    }) {
        return this.request<any>('/withdrawals/preview', {
            method: 'POST',
            body: data,
        });
    }

    async createWithdrawal(data: {
        vault_id: string;
        amount: number;
        is_early_withdrawal: boolean;
    }) {
        return this.request<any>('/withdrawals/', {
            method: 'POST',
            body: data,
        });
    }

    async getWithdrawals(vaultId?: string) {
        const query = vaultId ? `?vault_id=${vaultId}` : '';
        return this.request<any[]>(`/withdrawals/${query}`);
    }

    // Admin
    async getGlobalStats() {
        return this.request<any>('/admin/stats');
    }

    async getUsers(params?: { skip?: number; limit?: number; role?: string; is_active?: boolean }) {
        const query = new URLSearchParams();
        if (params?.skip !== undefined) query.set('skip', String(params.skip));
        if (params?.limit !== undefined) query.set('limit', String(params.limit));
        if (params?.role) query.set('role', params.role);
        if (params?.is_active !== undefined) query.set('is_active', String(params.is_active));

        const queryStr = query.toString();
        return this.request<any[]>(`/admin/users${queryStr ? `?${queryStr}` : ''}`);
    }

    async updateUserAdmin(userId: string, data: { is_active?: boolean; is_premium?: boolean; role?: string }) {
        return this.request(`/admin/users/${userId}`, {
            method: 'PATCH',
            body: data,
        });
    }

    async disableUser(userId: string) {
        return this.request(`/admin/users/${userId}/disable`, { method: 'POST' });
    }

    async enableUser(userId: string) {
        return this.request(`/admin/users/${userId}/enable`, { method: 'POST' });
    }
}

export const api = new ApiClient(API_URL);
