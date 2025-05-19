

export function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(date);
}


export function formatRelativeTime(timestamp: number): string {
    const now = Date.now();
    const diff = now - timestamp;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 30) {
        return formatDate(timestamp);
    } else if (days > 1) {
        return `${days} days ago`;
    } else if (days === 1) {
        return 'Yesterday';
    } else if (hours > 1) {
        return `${hours} hours ago`;
    } else if (minutes > 1) {
        return `${minutes} minutes ago`;
    } else {
        return 'Just now';
    }
}


export function isToday(timestamp: number): boolean {
    const date = new Date(timestamp);
    const today = new Date();
    
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
}


export function addDays(timestamp: number, days: number): number {
    return timestamp + (days * 24 * 60 * 60 * 1000);
}


export function daysBetween(timestamp1: number, timestamp2: number): number {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    return Math.round(Math.abs((timestamp1 - timestamp2) / oneDay));
}


export function getDateKey(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
}

export function getLastNDays(n: number): string[] {
    const days = [];
    for (let i = 0; i < n; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date.toISOString().split('T')[0]);
    }
    return days.reverse();
}