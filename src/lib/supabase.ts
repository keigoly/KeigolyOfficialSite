// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://merhmnwbhgzdayxnokza.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lcmhtbndiaGd6ZGF5eG5va3phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxODM0NjAsImV4cCI6MjA4Mzc1OTQ2MH0.H3JU4kXFc0huewxxpZCveZWbCq8j7Pw-QQD_u4NLVQM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Comment {
    id: string;
    post_slug: string;
    nickname: string;
    content: string;
    created_at: string;
}

export async function getComments(postSlug: string): Promise<Comment[]> {
    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_slug', postSlug)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching comments:', error);
        return [];
    }

    return data || [];
}

export async function addComment(postSlug: string, nickname: string, content: string): Promise<boolean> {
    const { error } = await supabase
        .from('comments')
        .insert([{ post_slug: postSlug, nickname, content }]);

    if (error) {
        console.error('Error adding comment:', error);
        return false;
    }

    return true;
}
