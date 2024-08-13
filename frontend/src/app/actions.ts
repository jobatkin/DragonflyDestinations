'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function forceRefresh(path: string) {
    revalidatePath(path);
}

export async function forceRefreshScores() {
    revalidateTag('scores'); // revalidate the leaderboard/scores so they get refreshed
}