'use client';

import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

interface GuestbookPostProps {
    _id: string;
    userId: string;
    name: string;
    avatarUrl: string;
    provider: string;
    message: string;
    createdAt: number;
}

export default function GuestbookPage() {
    const posts = useQuery(api.guestbook_posts.get);

    return (
        <div>
            <h1>Guestbook</h1>
            {posts?.map((post) => (
                <div key={post._id}>
                    <p>{post.userId}</p>
                    <p>{post.message}</p>
                    <p>By {post.name} ({post.provider})</p>
                </div>
            ))}
        </div>

    )
}