import { SERVER_URL } from '../config';

export async function apiFetch(endpoint) {
    let response = await fetch(`${SERVER_URL}/api/${endpoint}`);

    if (response.status >= 400 && response.status < 600) {
        throw `An error when fetching from /api/${endpoint} - ${response.text}`
    } else 
        return response.json()
    
}