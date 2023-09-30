import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
    try {
        const response = await fetch('/shubhamm69/2023'); 
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return { data };
    } catch (error) {
        console.error(error);
        return { error: 'Failed to fetch data' };
    }
};
