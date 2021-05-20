import { environment } from '@environments/environment';

export const API = environment.API;

// ENDPOINTS
export const MOVIES = `${ API }/movies`;
export const ACTORS = `${ API }/actors`;
export const COMPANIES = `${ API }/companies`;
